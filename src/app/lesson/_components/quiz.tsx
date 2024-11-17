"use client";

import { useState } from "react";
import { InfinityIcon, XIcon } from "lucide-react";
import Image from "next/image";

import { challengeOptionsType } from "@/lib/types/schem-types";
import { Progress } from "@/components/ui/progress";
import { useExitModal } from "@/store/use-exit-modal";

interface QuizProps {
  initialPercentage: number;
  initialHearts: number;
  intialLessonId: number;
  initialLessonChallenges: challengeOptionsType;
  userSubscription: boolean | null;
}

export function Quiz({
  intialLessonId,
  initialHearts,
  initialPercentage,
  initialLessonChallenges,
  userSubscription,
}: QuizProps) {
  const [hearts, setHearts] = useState(initialHearts);
  const [percentage, setPercentage] = useState(initialPercentage);
  const [challenges] = useState(initialLessonChallenges);
  const [activeIndex, setActiveIndex] = useState(() => {
    const incompletedIndex = challenges.findIndex(
      (challenge) => !challenge.completed,
    );
    return incompletedIndex === -1 ? 0 : incompletedIndex;
  });

  const challenge = challenges[activeIndex];

  const title =
    challenge.type === "ASSIST"
      ? "Select the correct meaning"
      : challenge.question;

  return (
    <>
      <Header
        hearts={hearts}
        percentage={percentage}
        hasActiveSubscription={!!userSubscription}
      />
      <div className="flex-1 ">
        <div className="h-full flex items-center justify-center">
          <div className="lg:min-h-[350px] lg:w-[600px] w-full px-6 lg:px-0 flex flex-col gap-y-12">
            <h1 className="text-lg lg:text-3xl text-center lg:text-start font-bold ">
              {title}
            </h1>
            <div></div>
          </div>
        </div>
      </div>
    </>
  );
}

interface HeaderProps {
  hearts: number;
  percentage: number;
  hasActiveSubscription: boolean;
}

function Header({ hearts, hasActiveSubscription, percentage }: HeaderProps) {
  const { open } = useExitModal();

  return (
    <header className="lg:pt-[50px] pt-[20px] px-10 flex gap-x-7 items-center justify-between max-w-[1140px] mx-auto w-full">
      <XIcon
        onClick={open}
        className="text-zinc-700 hover:opacity-75 transition cursor-pointer"
      />
      <Progress value={percentage} />
      <div className="font-bold flex items-center">
        <Image
          src="/icons/heart.svg"
          height={28}
          width={28}
          alt="heart"
          className="mr-2"
        />
        {hasActiveSubscription ? (
          <InfinityIcon className="size-6 stroke-[3]" />
        ) : (
          hearts
        )}
      </div>
    </header>
  );
}
