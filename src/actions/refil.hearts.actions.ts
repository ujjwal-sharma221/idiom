"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

import { getUserProgress } from "../../db/queries";
import { POINTS_TO_REFIL } from "@/lib/constant";
import db from "../../db/drizzle";
import { userProgress } from "../../db/schema";

export async function refilHearts() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) throw new Error("Unauthorized");

  const currentUserProgress = await getUserProgress();
  if (!currentUserProgress) throw new Error("User Progress not found");

  if (currentUserProgress.hearts === 5)
    throw new Error("Hearts area already full");

  if (currentUserProgress.points < POINTS_TO_REFIL)
    throw new Error("Not enough points");

  await db
    .update(userProgress)
    .set({
      hearts: 5,
      points: currentUserProgress.points - POINTS_TO_REFIL,
    })
    .where(eq(userProgress.userId, currentUserProgress.userId));

  revalidatePath("/shop");
  revalidatePath("/dashboard");
  revalidatePath("/quests");
  revalidatePath("/leaderboard");
}
