import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

import { getCourses } from "../../../../db/queries";
import { List } from "./_components/list";

const CoursesPage = async () => {
  const { isAuthenticated } = getKindeServerSession();
  const user = await isAuthenticated();
  if (!user) redirect("/");

  const data = await getCourses();

  return (
    <div className="h-full px-3 mx-auto lg:ml-14">
      <h1 className="text-2xl font-bold text-center lg:text-start text-neutral-700">
        Language Courses
      </h1>
      <List courses={data} activeCourseId={1} />
    </div>
  );
};

export default CoursesPage;
