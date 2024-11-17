import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

import { getLesson, getUserProgress } from "../../../db/queries";
import { Quiz } from "./_components/quiz";

const LessonPage = async () => {
  const { isAuthenticated } = getKindeServerSession();
  const user = await isAuthenticated();
  if (!user) redirect("/");

  const lessonData = getLesson();
  const userProgressData = getUserProgress();

  const [lesson, userProgress] = await Promise.all([
    lessonData,
    userProgressData,
  ]);

  if (!lesson || !userProgress) redirect("/dashboard");

  const initialPercentage =
    (lesson.challenges.filter((challenge) => challenge.completed).length /
      lesson.challenges.length) *
    100;

  return (
    <Quiz
      intialLessonId={lesson.id}
      initialLessonChallenges={lesson.challenges}
      initialHearts={userProgress.hearts}
      initialPercentage={initialPercentage}
      userSubscription={false}
    />
  );
};
export default LessonPage;
