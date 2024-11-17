import Link from "next/link";
import { Book } from "lucide-react";

import { Button } from "@/components/ui/button";

interface UnitBannerProps {
  title: string;
  description: string;
}

export function UnitBanner({ title, description }: UnitBannerProps) {
  return (
    <div className="w-full rounded-md bg-[#FEFAF6] text-[#102C57] p-5 flex items-center justify-between">
      <div className="space-y-2.5">
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="text-lg">{description}</p>
      </div>
      <Link href="/lesson">
        <Button variant="shine" className="hidden xl:flex">
          <Book className="mr-2" />
          Continue
        </Button>
      </Link>
    </div>
  );
}
