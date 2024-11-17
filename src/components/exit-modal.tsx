"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

import { useExitModal } from "@/store/use-exit-modal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";

export function ExitModal() {
  const router = useRouter();

  const [client, setClient] = useState(false);
  const { isOpen, close } = useExitModal();

  useEffect(() => setClient(true), []);

  if (!client) return null;

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center w-full justify-center mb-5">
            <Image src="/icons/sad.svg" alt="sad" height={80} width={80} />
          </div>
          <DialogTitle className="text-center font-semibold text-2xl">
            Wait! Don&apos;t go
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            You are about to leave the lesson, are you sure?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mb-4">
          <div className="flex flex-col gap-y-4 w-full">
            <Button className="w-full" size="lg" onClick={close}>
              Keep Learning
            </Button>
            <Button
              className="w-full"
              variant="destructive"
              size="lg"
              onClick={() => {
                close();
                router.push("/dashboard");
              }}
            >
              End Session
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
