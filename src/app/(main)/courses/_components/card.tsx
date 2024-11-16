import { BadgeCheck } from "lucide-react";
import Image from "next/image";

import { cn } from "@/lib/utils";

interface CardProps {
  title: string;
  id: number;
  imageSrc: string;
  onClick: (id: number) => void;
  disabled?: boolean;
  active?: boolean;
}

export function Card({
  title,
  id,
  imageSrc,
  onClick,
  disabled,
  active,
}: CardProps) {
  return (
    <div
      onClick={() => onClick(id)}
      className={cn(
        "h-full rounded-md border-[1px]  hover:bg-black/5 cursor-pointer active:border-b-2 flex flex-col items-center justify-between p-3 pb-6 min-h-[217px] min-w-[200px]",
        disabled && "pointer-events-none opacity-50",
      )}
    >
      <div className="min-h-[24px] w-full flex items-center justify-end">
        {active && (
          <div className="flex items-center justify-center p-1.5">
            <BadgeCheck className="size-5 stroke-4" />
          </div>
        )}
      </div>
      <Image
        src={imageSrc}
        alt={title}
        height={70}
        width={93.33}
        className="rounded-lg object-cover "
      />
      <p className="text-zinc-800 text-center font-semibold mt-3">{title}</p>
    </div>
  );
}
