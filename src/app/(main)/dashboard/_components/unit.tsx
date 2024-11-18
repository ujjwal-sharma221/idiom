import { lessons, units } from "../../../../../db/schema";
import { LessonButton } from "./lesson-button";
import { UnitBanner } from "./unit-banner";

interface UnitProps {
  id: number;
  order: number;
  description: string;
  title: string;
  lessons: (typeof lessons.$inferSelect & { completed: boolean })[];
  activeLesson:
    | (typeof lessons.$inferSelect & {
        unit: typeof units.$inferSelect;
      })
    | undefined;
  activeLessonPercentage: number;
}

export function Unit({
  // id,
  // order,
  title,
  description,
  lessons,
  activeLesson,
  activeLessonPercentage,
}: UnitProps) {
  return (
    <>
      <UnitBanner title={title} description={description} />
      <div className="flex items-center flex-col relative">
        {lessons.map((lesson, idx) => {
          const isCurrent = lesson.id === activeLesson?.id;
          const isLocked = !lesson.completed && !isCurrent;

          return (
            <LessonButton
              key={lesson.id}
              id={lesson.id}
              idx={idx}
              totalCount={lessons.length - 1}
              current={isCurrent}
              locked={isLocked}
              percentage={activeLessonPercentage}
            />
          );
        })}
      </div>
    </>
  );
}
