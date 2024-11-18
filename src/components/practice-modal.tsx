"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { usePracticeModal } from "@/store/use-practice-modal";

export function PracticeModal() {
  const [client, setClient] = useState(false);
  const { isOpen, close } = usePracticeModal();

  useEffect(() => setClient(true), []);

  if (!client) return null;

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center w-full justify-center mb-5">
            <Image
              src="/icons/practice.svg"
              alt="practice"
              height={100}
              width={100}
            />
          </div>
          <DialogTitle className="text-center font-semibold text-2xl">
            Practice Lesson
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            Use practice lessons to regain hearts and points, You will not lose
            any heart or points while in a practice lesson
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mb-4">
          <div className="flex flex-col gap-y-4 w-full">
            <Button
              className="w-full"
              variant="default"
              size="lg"
              onClick={() => {
                close();
              }}
            >
              I understand
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
