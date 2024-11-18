import Image from "next/image";

import { cn } from "@/lib/utils";

interface ResultCardProps {
  variant: "points" | "hearts";
  value: number;
}

export function ResultCard({ variant, value }: ResultCardProps) {
  const imageSrc =
    variant === "points" ? "/icons/points.svg" : "/icons/heart.svg";

  return (
    <div className={cn("rounded w-full")}>
      <div
        className={cn(
          "p-1.5 rounded-t-xl font-bold text-center uppercase text-xs text-black",
        )}
      >
        {variant === "hearts" ? "Hearts left" : "Points left"}
      </div>
      <div
        className={cn(
          "rounded-2xl bh-white items-center justify-center flex p-6 font-semibold text-lg",
        )}
      >
        <Image
          src={imageSrc}
          alt="icon"
          height={30}
          width={30}
          className="mr-1.5"
        />
        {value}
      </div>
    </div>
  );
}
