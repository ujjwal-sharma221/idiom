"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { getCourseById, getUserProgress } from "../../db/queries";
import db from "../../db/drizzle";
import { userProgress } from "../../db/schema";

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
