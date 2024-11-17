import { cache } from "react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { eq } from "drizzle-orm";

import db from "./drizzle";
import {
  challengeProgress,
  courses,
  lessons,
  units,
  userProgress,
} from "./schema";

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

export const getUnits = cache(async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) return null;

  const userProgress = await getUserProgress();
  if (!userProgress || !userProgress.activeCourseId) return [];

  const data = await db.query.units.findMany({
    where: eq(units.courseId, userProgress.activeCourseId),
    with: {
      lessons: {
        with: {
          challenges: {
            with: {
              challengeProgress: {
                where: eq(challengeProgress.userId, user.id),
              },
            },
          },
        },
      },
    },
  });

  const normalisedData = data.map((unit) => {
    const completedLessons = unit.lessons.map((l) => {
      if (l.challenges.length === 0) {
        return { ...l, completed: false };
      }

      const allCompletedChallenges = l.challenges.every((ch) => {
        return (
          ch.challengeProgress &&
          ch.challengeProgress.length > 0 &&
          ch.challengeProgress.every((p) => p.completed)
        );
      });

      return { ...l, completed: allCompletedChallenges };
    });
    return { ...unit, lessons: completedLessons };
  });

  return normalisedData;
});

export const getCourseProgress = cache(async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const userProgress = await getUserProgress();

  if (!user || !userProgress?.activeCourseId) return null;

  const unitsInactiveCourse = await db.query.units.findMany({
    orderBy: (units, { asc }) => [asc(units.order)],
    where: eq(units.courseId, userProgress.activeCourseId),
    with: {
      lessons: {
        orderBy: (lessons, { asc }) => [asc(lessons.order)],
        with: {
          unit: true,
          challenges: {
            with: {
              challengeProgress: {
                where: eq(challengeProgress.userId, user.id),
              },
            },
          },
        },
      },
    },
  });

  const firstIncompleteLesson = unitsInactiveCourse
    .flatMap((unit) => unit.lessons)
    .find((lesson) => {
      return lesson.challenges.some((challenge) => {
        return (
          !challenge.challengeProgress ||
          challenge.challengeProgress.length === 0 ||
          challenge.challengeProgress.some(
            (progress) => progress.completed === false,
          )
        );
      });
    });

  return {
    activeLesson: firstIncompleteLesson,
    activeLessonId: firstIncompleteLesson?.id,
  };
});

export const getLesson = cache(async (id?: number) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) return null;

  const courseProgress = await getCourseProgress();
  const lessonId = id || courseProgress?.activeLessonId;

  if (!lessonId) return null;

  const data = await db.query.lessons.findFirst({
    where: eq(lessons.id, lessonId),
    with: {
      challenges: {
        orderBy: (challenges, { asc }) => [asc(challenges.order)],
        with: {
          challengeOptions: true,
          challengeProgress: {
            where: eq(challengeProgress.userId, user.id),
          },
        },
      },
    },
  });

  if (!data || !data.challenges) return null;

  const normalisedChallenges = data.challenges.map((challenge) => {
    const completed =
      challenge.challengeProgress &&
      challenge.challengeProgress.length > 0 &&
      challenge.challengeProgress.every((progress) => progress.completed);
    return { ...challenge, completed };
  });

  return { ...data, challenges: normalisedChallenges };
});

export const getLessonPercentage = cache(async () => {
  const courseProgress = await getCourseProgress();
  if (!courseProgress?.activeLessonId) return 0;

  const lesson = await getLesson(courseProgress.activeLessonId);
  if (!lesson) return 0;

  const completedChallenges = lesson.challenges.filter(
    (challenge) => challenge.completed,
  );
  const percentage =
    Math.round(completedChallenges.length / lesson.challenges.length) * 100;

  return percentage;
});
