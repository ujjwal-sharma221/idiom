import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  return (
    <div className=" sticky top-0 pb-3 lg:pt-[28px] flex items-center justify-between  border-b-2 mb-5 lg:z-50">
      <Link href="/courses">
        <Button variant="ghost" size="icon">
          <ArrowLeft className="size-5 stroke-2" />
        </Button>
      </Link>
      <h1 className="font-bold text-lg">{title}</h1>
      <div></div>
    </div>
  );
}
