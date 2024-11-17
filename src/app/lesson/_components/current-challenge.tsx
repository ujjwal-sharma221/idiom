import Image from "next/image";

import { cn } from "@/lib/utils";
import { challengeOptions, challenges } from "../../../../db/schema";

interface CurrentChallengeProps {
  options: (typeof challengeOptions.$inferSelect)[];
  onSelect: (id: number) => void;
  status: "correct" | "wrong" | "none";
  selectedOption?: number;
  disabled?: boolean;
  type: (typeof challenges.$inferSelect)["type"];
}

export function CurrentChallenge({
  options,
  status,
  onSelect,
  selectedOption,
  type,
  disabled,
}: CurrentChallengeProps) {
  return (
    <div
      className={cn(
        "grid gap-2",
        type === "ASSIST" && "grid-cols-1",
        type === "SELECT" &&
          "grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(0,1fr))]",
      )}
    >
      {options.map((option, idx) => (
        <Card
          key={option.id}
          id={option.id}
          text={option.text}
          imageSrc={option.imageSrc}
          shortCut={`${idx + 1}`}
          selected={true || selectedOption === option.id}
          onClick={() => onSelect(option.id)}
          status={status}
          audioSrc={option.audioSrc}
          disabled={disabled}
          type={type}
        />
      ))}
    </div>
  );
}

interface CardProps {
  id: number;
  imageSrc: string | null;
  audioSrc: string | null;
  text: string;
  shortCut: string;
  selected?: boolean;
  disabled?: boolean;
  onClick: () => void;
  status?: "correct" | "none" | "wrong";
  type: (typeof challenges.$inferSelect)["type"];
}

function Card({
  id,
  audioSrc,
  imageSrc,
  onClick,
  shortCut,
  text,
  type,
  disabled,
  selected,
  status,
}: CardProps) {
  return (
    <div
      onClick={() => {}}
      className={cn(
        "h-full border-2 rounded-xl hover:bg-black/5 p-4 lg:p-6 cursor-pointer ",
        selected && "bg-[#EBEAFF]",
        selected &&
          status === "correct" &&
          "bg-[#B6FFA1] border-[#B6FFA1] hover:bg-green-300",
        selected &&
          status === "wrong" &&
          "bg-[#FA7070] border-[#FA7070] hover:bg-red-300",
        disabled && "pointer-events-none hover:bg-white",
        type === "ASSIST" && "lg:p-3 w-full",
      )}
    >
      {imageSrc && (
        <div className="relative aspect-square mb-4 max-h-[80px] lg:max-h-[150px] w-full">
          <Image src={imageSrc} alt={text} fill />
        </div>
      )}

      <div
        className={cn(
          "flex items-center justify-between ",
          type === "ASSIST" && "flex-row-reverse",
        )}
      >
        {type === "ASSIST" && <div />}
        <p
          className={cn(
            "text-zinc-700 text-sm lg:text-base",
            selected && "text-sky-500",
            selected && status === "correct" && "text-green-500",
            selected && status === "wrong" && "text-white",
          )}
        >
          {text}
        </p>
        <div
          className={cn(
            "lg:w-[30px] lg:h-[30px] h-[20px] border-2 flex items-center justify-center rounded-lg lg:text-[15px] text-xs font-semibold",
            selected && "border-sky-300 text-sky-500",
            selected &&
              status === "correct" &&
              "border-green-500 text-green-500",
            selected && status === "wrong" && "text-white border-white",
          )}
        >
          {shortCut}
        </div>
      </div>
    </div>
  );
}
