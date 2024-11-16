import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

import { getCourses, getUserProgress } from "../../../../db/queries";
import { List } from "./_components/list";

const CoursesPage = async () => {
  const { isAuthenticated } = getKindeServerSession();
  const user = await isAuthenticated();
  if (!user) redirect("/");

  const data = await getCourses();
  const userProgress = await getUserProgress();

  return (
    <div className="h-full px-3 mx-auto lg:ml-14">
      <h1 className="text-2xl font-bold text-center lg:text-start text-neutral-700">
        Language Courses
      </h1>
      <List courses={data} activeCourseId={userProgress?.activeCourseId} />
    </div>
  );
};

export default CoursesPage;
