import { cache } from "react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { eq } from "drizzle-orm";

import db from "./drizzle";
import { courses, userProgress } from "./schema";

export const getCourses = cache(async () => {
  const data = await db.query.courses.findMany();
  return data;
});

export const getUserProgress = cache(async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) return null;

  const data = await db.query.userProgress.findFirst({
    where: eq(userProgress.userId, user.id),
    with: { activeCourse: true },
  });

  return data;
});

export const getCourseById = cache(async (courseId: number) => {
  const data = db.query.courses.findFirst({
    where: eq(courses.id, courseId),
  });

  return data;
});
