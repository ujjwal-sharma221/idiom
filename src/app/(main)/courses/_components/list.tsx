"use client";

import { courses } from "../../../../../db/schema";
import { Card } from "./card";

interface ListProps {
  courses: (typeof courses.$inferSelect)[];
  activeCourseId: number;
}

export function List({ courses, activeCourseId }: ListProps) {
  return (
    <div className="pt-6 flex-wrap lg:flex-nowrap items-center justify-center lg:ml-20 gap-4 flex">
      {courses.map((course) => (
        <Card
          key={course.id}
          id={course.id}
          title={course.title}
          imageSrc={course.imageSrc}
          onClick={() => {}}
          disabled={false}
          active={course.id === activeCourseId}
        ></Card>
      ))}
    </div>
  );
}
