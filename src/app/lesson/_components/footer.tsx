import { CheckCircle2, XCircle } from "lucide-react";
import { useKey, useMedia } from "react-use";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FooterProps {
  onCheck: () => void;
  status: "correct" | "wrong" | "none" | "completed";
  disabled?: boolean;
  lessonId?: boolean;
}

export function Footer({ onCheck, status, lessonId, disabled }: FooterProps) {
  const isMobile = useMedia("(max-width: 1024px)");
  useKey("Enter", onCheck, {}, [onCheck]);

  return (
    <footer
      className={cn(
        "lg:h-[140px] h-[100px] border-t-2",
        status === "correct" && "bg-[#B6FFA1] border-transparent",
        status === "wrong" && "bg-[#FA7070] border-transparent",
      )}
    >
      <div className="max-w-[1140px] h-full mx-auto flex items-center justify-between px-6 lg:px-10">
        {status === "correct" && (
          <div className="  font-bold text-base lg:text-2xl flex items-center">
            <CheckCircle2 className="size-6 lg:size-10 mr-4" />
            Nicely Done
          </div>
        )}

        {status === "wrong" && (
          <div className=" font-bold text-base lg:text-2xl flex items-center">
            <XCircle className="size-6 lg:size-10 mr-4" />
            Give it another chance
          </div>
        )}

        {status === "completed" && (
          <Button
            variant="secondary"
            size={isMobile ? "sm" : "lg"}
            onClick={() => (window.location.href = `/lesson/${lessonId}`)}
          >
            Practice Again
          </Button>
        )}

        <Button
          disabled={disabled}
          className="ml-auto "
          onClick={onCheck}
          size={isMobile ? "sm" : "lg"}
          variant={status === "wrong" ? "gooeyLeft" : "ringHover"}
        >
          {status === "none" && "Check"}
          {status === "correct" && "Next"}
          {status === "wrong" && "Retry"}
          {status === "completed" && "Continue"}
        </Button>
      </div>
    </footer>
  );
}
