import { Cover } from "@/components/cover";
import Image from "next/image";
import Link from "next/link";
import { NumbersCount } from "./numbers";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <div className="px-4 md:px-8 lg:px-12 flex flex-col gap-2">
      <div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold max-w-7xl mx-auto text-center mt-6 md:mt-4 relative z-20 py-4 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
          Learn languages efficiently and <br className="hidden md:block" /> at
          a <Cover>warp speed</Cover>
        </h1>
      </div>

      <div className="w-full items-center justify-between flex flex-wrap md:flex-nowrap">
        <div className="w-full">
          <div className="h-32 md:h-64 w-full relative p-2 mb-4 md:mb-0 k">
            <Image
              src="/images/hero.webp"
              alt="Picture of the author"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div>More than</div>
          <NumbersCount />
          <div className="text-center">
            Learning a new language worldwide at Idiom
          </div>
          <Button
            className="bg-transparent text-zinc-900 border-[0.8px] hover:text-white border-black"
            asChild
          >
            <Link href="/dashboard">Start Your Journey</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
