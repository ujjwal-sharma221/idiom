"use client";

import { Check, Crown, Star } from "lucide-react";
import Link from "next/link";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import "react-circular-progressbar/dist/styles.css";

interface LessonButtonProps {
  id: number;
  idx: number;
  totalCount: number;
  locked?: boolean;
  current?: boolean;
  percentage: number;
}

export function LessonButton({
  id,
  idx,
  totalCount,
  locked,
  current,
  percentage,
}: LessonButtonProps) {
  const cycleLength = 8;
  const cycleIndex = idx % cycleLength;

  let indentationLevel;

  if (cycleIndex <= 2) {
    indentationLevel = cycleIndex;
  } else if (cycleIndex <= 4) {
    indentationLevel = 4 - cycleIndex;
  } else if (cycleIndex <= 6) {
    indentationLevel = 4 - cycleIndex;
  } else {
    indentationLevel = cycleIndex - 8;
  }

  const rightPos = indentationLevel * 40;
  const isFirst = idx === 0;
  const isLast = idx === totalCount;
  const isCompleted = !current && !locked;

  const Icon = isCompleted ? Check : isLast ? Crown : Star;

  const href = isCompleted ? `/lesson/${id}` : "/lesson";

  return (
    <Link
      href={href}
      aria-disabled={locked}
      style={{ pointerEvents: locked ? "none" : "auto" }}
    >
      <div
        className="relative"
        style={{
          right: `${rightPos}px`,
          marginTop: isFirst && !isCompleted ? 60 : 24,
        }}
      >
        {current ? (
          <div className="size-[102px] relative">
            <div className="absolute -top-6 left-3 px-3 py-2.5 font-bold uppercase bg-[#E94560] text-[#EBEAFF] rounded-xl animate-bounce tracking-wide z-10">
              Start
              <div className="absolute left-1/2 -bottom-2 w-0 h-0 border-x-8 border-x-transparent border-t-8 transform -translate-x-1/2" />
            </div>
            <CircularProgressbarWithChildren
              value={Number.isNaN(percentage) ? 0 : percentage}
              styles={{
                path: { stroke: "#F05454" },
                trail: { stroke: "#DDDDDD" },
              }}
            >
              <Button
                className="rounded-full size-[70px] border-b-8"
                variant={locked ? "outline" : "secondary"}
              >
                <Icon
                  className={cn(
                    "size-10",
                    locked
                      ? "fill-zinc-600 text-zinc-600 stroke-neutral-400"
                      : "",
                    isCompleted && "fill-none stroke-[4]",
                  )}
                />
              </Button>
            </CircularProgressbarWithChildren>
          </div>
        ) : (
          <div>
            <Button
              className="rounded-full size-[70px] border-b-8"
              variant={locked ? "outline" : "secondary"}
            >
              <Icon
                className={cn(
                  "size-10",
                  locked ? " text-zinc-600 stroke-neutral-400" : "",
                  isCompleted && "fill-none stroke-[4]",
                )}
              />
            </Button>
          </div>
        )}
      </div>
    </Link>
  );
}
