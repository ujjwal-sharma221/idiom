import Link from "next/link";
import Image from "next/image";
import { InfinityIcon } from "lucide-react";

import { Button } from "./ui/button";

interface UserProgressProps {
  activeCourse: { imageSrc: string; title: string };
  hearts: number;
  points: number;
  hasActiveSubscription: boolean;
}

export function UserProgress({
  activeCourse,
  hearts,
  points,
  hasActiveSubscription,
}: UserProgressProps) {
  return (
    <div className="flex items-center justify-between gap-x-2">
      <Link href="/courses">
        <Button variant="outline" size="icon">
          <Image
            src={activeCourse.imageSrc}
            alt={activeCourse.title}
            className="rounded-md"
            width={32}
            height={32}
          />
        </Button>
      </Link>
      <Link href="/shop">
        <Button variant="ghost" className="text-[#674188] font-bold">
          <Image
            src="/icons/points.svg"
            alt="points"
            height={28}
            width={28}
            className="mr-2"
          />
          {points}
        </Button>
      </Link>
      <Link href="/shop">
        <Button variant="ghost" className="text-rose-500 font-bold">
          <Image
            src="/icons/heart.svg"
            alt="hearts"
            height={22}
            width={22}
            className="mr-2"
          />
          {hasActiveSubscription ? (
            <InfinityIcon className="size-4 stroke-3" />
          ) : (
            hearts
          )}
        </Button>
      </Link>
    </div>
  );
}
