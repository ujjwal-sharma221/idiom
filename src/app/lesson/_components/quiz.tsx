"use client";

import { useState, useTransition } from "react";
import { InfinityIcon, XIcon } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import Confetti from "react-confetti";
import { useRouter } from "next/navigation";
import { useMount, useWindowSize } from "react-use";

import { challengeOptionsType } from "@/lib/types/schem-types";
import { Progress } from "@/components/ui/progress";
import { useExitModal } from "@/store/use-exit-modal";
import { QuestionBubble } from "./question-bubble";
import { CurrentChallenge } from "./current-challenge";
import { Footer } from "./footer";
import { upsertChallengeProgress } from "@/actions/challenge-progress";
import { reduceHearts } from "@/actions/user-progress.action";
import { ResultCard } from "./result-card";
import { useHeartsModal } from "@/store/use-hearts-modal";
import { usePracticeModal } from "@/store/use-practice-modal";

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
  const [percentage, setPercentage] = useState(() => {
    return initialPercentage === 100 ? 0 : initialPercentage;
  });
  const [challenges] = useState(initialLessonChallenges);
  const [activeIndex, setActiveIndex] = useState(() => {
    const incompletedIndex = challenges.findIndex(
      (challenge) => !challenge.completed,
    );
    return incompletedIndex === -1 ? 0 : incompletedIndex;
  });
  const [selectedOption, setSelectedOption] = useState<number>();
  const [status, setStatus] = useState<"none" | "correct" | "wrong">("none");
  const [lessonId] = useState(intialLessonId);

  const [pending, startTransition] = useTransition();
  const router = useRouter();
  const { width, height } = useWindowSize();

  const { open: openHeartsModal } = useHeartsModal();
  const { open: openPracticeModal } = usePracticeModal();

  useMount(() => {
    if (initialPercentage === 100) {
      openPracticeModal();
    }
  });

  const challenge = challenges[activeIndex];

  if (!challenge) {
    return (
      <>
        <Confetti
          recycle={false}
          numberOfPieces={500}
          tweenDuration={10000}
          width={width}
          height={height}
        />
        <div className="flex flex-col gap-y-4 lg:gap-y-8 max-w-lg mx-auto text-center items-center justify-center h-screen">
          <Image
            src="/icons/confetti.svg"
            alt="confetti"
            className="hidden animate-shine lg:block"
            height={100}
            width={100}
          />
          <Image
            src="/icons/confetti.svg"
            alt="confetti"
            className="lg:hidden animate-shine  block"
            height={50}
            width={50}
          />

          <h1 className="text-xl lg:text-3xl font-bold">
            Great Job! <br />
            You have completed this lesson. Forward with your language journey
          </h1>
          <div className="flex items-center gap-x-4 w-full">
            <ResultCard variant="points" value={challenges.length * 10} />
            <ResultCard variant="hearts" value={hearts} />
          </div>
        </div>
        <Footer
          status="completed"
          onCheck={() => router.push("/dashboard")}
          lessonId={lessonId}
        />
      </>
    );
  }

  const options = challenge.challengeOptions ?? [];

  const title =
    challenge.type === "ASSIST"
      ? "Select the correct meaning"
      : challenge.question;

  const onSelect = (id: number) => {
    if (status !== "none") return;
    setSelectedOption(id);
  };

  const onNext = () => {
    setActiveIndex((curr) => curr + 1);
  };

  const onContinue = () => {
    if (!selectedOption) return;

    if (status === "wrong") {
      setStatus("none");
      setSelectedOption(undefined);
      return;
    }

    if (status === "correct") {
      onNext();
      setStatus("none");
      setSelectedOption(undefined);
      return;
    }

    const correctOption = options.find((option) => option.correct);
    if (!correctOption) return;

    if (correctOption && correctOption.id === selectedOption) {
      startTransition(() => {
        upsertChallengeProgress(challenge.id)
          .then((res) => {
            if (res?.error === "hearts") {
              openHeartsModal();
              return;
            }

            setStatus("correct");
            setPercentage((prev) => prev + 100 / challenges.length);

            if (initialPercentage === 100) {
              setHearts((prev) => Math.min(prev + 1, 5));
            }
          })
          .catch(() => toast.error("Something went wrong, try again"));
      });
    } else {
      startTransition(() => {
        reduceHearts(challenge.id)
          .then((res) => {
            if (res?.error === "hearts") {
              openHeartsModal();
              return;
            }
            setStatus("wrong");

            if (!res?.error) {
              setHearts((prev) => Math.max(prev - 1, 0));
            }
          })
          .catch(() => toast.error("Something went wrong, please try again"));
      });
    }
  };

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
            <div>
              {challenge.type === "ASSIST" && (
                <QuestionBubble question={challenge.question} />
              )}
              <CurrentChallenge
                options={options}
                onSelect={onSelect}
                status={status}
                selectedOption={selectedOption}
                disabled={pending}
                type={challenge.type}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer
        disabled={pending || !selectedOption}
        status={status}
        onCheck={onContinue}
      />
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
