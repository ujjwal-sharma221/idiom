import Image from "next/image";

import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="hidden lg:block h-20 w-full border-t-2 p-2">
      <div className="max-w-screen-2xl mx-auto flex items-center justify-evenly h-full">
        <Button
          size="sm"
          variant="ghost"
          className="w-full flex items-center gap-x-1"
        >
          <Image
            src="/images/english-flag.svg"
            alt="english flag"
            height={30}
            width={40}
          />
          English
        </Button>

        <Button
          size="sm"
          variant="ghost"
          className="w-full flex items-center gap-x-1"
        >
          <Image
            src="/images/french-flag.svg"
            alt="english flag"
            height={30}
            width={40}
          />
          French
        </Button>

        <Button
          size="sm"
          variant="ghost"
          className="w-full flex items-center gap-x-1"
        >
          <Image
            src="/images/german-flag.svg"
            alt="english flag"
            height={30}
            width={40}
          />
          German
        </Button>

        <Button
          size="sm"
          variant="ghost"
          className="w-full flex items-center gap-x-1"
        >
          <Image
            src="/images/japanese-flag.svg"
            alt="english flag"
            height={30}
            width={40}
          />
          Japanese
        </Button>
      </div>
    </footer>
  );
}
