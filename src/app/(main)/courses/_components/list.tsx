"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { courses, userProgress } from "../../../../../db/schema";
import { Card } from "./card";
import { upsertUser } from "@/actions/user-progress.action";

interface ListProps {
  courses: (typeof courses.$inferSelect)[];
  activeCourseId?: typeof userProgress.$inferSelect.activeCourseId;
}

export function List({ courses, activeCourseId }: ListProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const onClick = (id: number) => {
    if (pending) return;

    if (id === activeCourseId) return router.push("/dashboard");

    startTransition(() => {
      upsertUser(id);
    });
  };

  return (
    <div className="pt-6 flex-wrap lg:flex-nowrap items-center justify-center lg:ml-20 gap-4 flex">
      {courses.map((course) => (
        <Card
          key={course.id}
          id={course.id}
          title={course.title}
          imageSrc={course.imageSrc}
          onClick={onClick}
          disabled={pending}
          active={course.id === activeCourseId}
        ></Card>
      ))}
    </div>
  );
}
