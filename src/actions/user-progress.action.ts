"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq, and } from "drizzle-orm";

import { getCourseById, getUserProgress } from "../../db/queries";
import db from "../../db/drizzle";
import { challengeProgress, challenges, userProgress } from "../../db/schema";

export async function upsertUser(courseId: number) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) throw new Error("Unauthorized");

  const course = await getCourseById(courseId);
  if (!course) throw new Error("Course not found");

  const existingUserProgress = await getUserProgress();
  if (existingUserProgress) {
    await db.update(userProgress).set({
      activeCourseId: courseId,
      username: user.given_name || "user",
      userImageSrc: user.picture || "/images/default-user.svg",
    });

    revalidatePath("/courses");
    revalidatePath("/dashboard");
    return redirect("/dashboard");
  }

  await db.insert(userProgress).values({
    userId: user.id,
    activeCourseId: courseId,
    username: user.given_name || "user",
    userImageSrc: user.picture || "/images/default-user.svg",
  });

  revalidatePath("/courses");
  revalidatePath("/dashboard");
  redirect("/dashboard");
}

export async function reduceHearts(challengeId: number) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) throw new Error("Unauthorized");

  const currentUserProgress = await getUserProgress();

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
  if (isPractice) return { error: "practice" };

  if (!currentUserProgress) throw new Error("User Progess not found");

  if (currentUserProgress.hearts === 0) return { error: "hearts" };

  await db
    .update(userProgress)
    .set({
      hearts: Math.max(currentUserProgress.hearts - 1, 0),
    })
    .where(eq(userProgress.userId, user.id));

  revalidatePath("/shop");
  revalidatePath("/dashboard");
  revalidatePath("/leaderboard");
  revalidatePath("/quests");
  revalidatePath(`/lesson/${lessonId}`);
}
