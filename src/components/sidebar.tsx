"use client";
import React, { useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { Logs, Store, Swords, TentTreeIcon } from "lucide-react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

import { cn } from "@/lib/utils";
import { Sidebar, SidebarBody, SidebarLink } from "./siderbar-component";

export function SidebarMain({ children }: { children: React.ReactNode }) {
  const links = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: (
        <TentTreeIcon className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Leaderboards",
      href: "/leaderboards",
      icon: (
        <Swords className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Quests",
      href: "/quests",
      icon: (
        <Logs className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Shop",
      href: "/shop",
      icon: (
        <Store className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);

  return (
    <div
      className={cn(
        "rounded-md h-full md:h-fit flex flex-col md:flex-row dark:bg-neutral-800 dark:border-neutral-700 z-10",
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10 md:sticky md:top-0 md:h-fit">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
        </SidebarBody>
      </Sidebar>
      {children}
    </div>
  );
}

export const Logo = () => {
  const { getUser } = useKindeBrowserClient();
  const user = getUser();
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <Image src="/logo.svg" alt="brand logo" height={40} width={40} />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-black dark:text-white whitespace-pre font-semibold text-muted-foreground text-lg"
      >
        {user?.given_name}&apos;s dashboard
      </motion.span>
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <Image src="/logo.svg" alt="brand logo" height={40} width={40} />
    </Link>
  );
};
