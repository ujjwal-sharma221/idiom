import Image from "next/image";

interface QuestionBubbleProps {
  question: string;
}

export function QuestionBubble({ question }: QuestionBubbleProps) {
  return (
    <div className="flex items-center gap-x-4 mb-6">
      <Image
        src="/images/default-user.svg"
        alt="mascot"
        height={60}
        width={60}
        className="hidden lg:block"
      />

      <Image
        src="/images/default-user.svg"
        alt="mascot"
        height={40}
        width={40}
        className="lg:hidden block"
      />
      <div className="relative py-2 px-4 border-2 rounded-xl text-sm lg:text-base">
        {question}
        <div className="absolute -left-3 top-1/2 size-0 border-x-8 border-x-transparent border-t-8 -translate-y-1/2 rotate-90"></div>
      </div>
    </div>
  );
}
