"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { getUserProgress } from "../../db/queries";
import db from "../../db/drizzle";
import { challengeProgress, challenges, userProgress } from "../../db/schema";

export async function upsertChallengeProgress(challengeId: number) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) throw new Error("Unauthorized");

  const currentUserProgress = await getUserProgress();
  if (!currentUserProgress) throw new Error("User Progress not found");

  const challenge = await db.query.challenges.findFirst({
    where: eq(challenges.id, challengeId),
  });
  if (!challenge) throw new Error("Challenge not found");

  const lessonId = challenge.lessonId;

  const existingChallengeProgress = await db.query.challengeProgress.findFirst({
    where: and(
      eq(challengeProgress.userId, user.id),
      eq(challengeProgress.challengeId, challengeId),
    ),
  });

  const isPractice = !!existingChallengeProgress;
  if (currentUserProgress.hearts === 0 && !isPractice)
    return { error: "hearts" };

  if (isPractice) {
    await db
      .update(challengeProgress)
      .set({
        completed: true,
      })
      .where(eq(challengeProgress.id, existingChallengeProgress.id));

    await db
      .update(userProgress)
      .set({
        hearts: Math.min(currentUserProgress.hearts + 1, 5),
        points: currentUserProgress.points + 10,
      })
      .where(eq(userProgress.userId, user.id));

    revalidatePath("/dashboard");
    revalidatePath("/lesson");
    revalidatePath("/quests");
    revalidatePath("/leaderboards");
    revalidatePath(`/lesson/${lessonId}`);
    return;
  }

  await db.insert(challengeProgress).values({
    challengeId,
    userId: user.id,
    completed: true,
  });

  await db
    .update(userProgress)
    .set({
      points: currentUserProgress.points + 10,
    })
    .where(eq(userProgress.userId, user.id));

  revalidatePath("/dashboard");
  revalidatePath("/lesson");
  revalidatePath("/quests");
  revalidatePath("/leaderboards");
  revalidatePath(`/lesson/${lessonId}`);
}
