"use client";

import { useRouter } from "next/navigation";
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
import { useHeartsModal } from "@/store/use-hearts-modal";

export function HeartsModal() {
  const router = useRouter();

  const [client, setClient] = useState(false);
  const { isOpen, close } = useHeartsModal();

  useEffect(() => setClient(true), []);

  if (!client) return null;

  const onClick = () => {
    close();
    router.push("/store");
  };

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center w-full justify-center mb-5">
            <Image
              src="/icons/anxious.svg"
              alt="anxious"
              height={80}
              width={80}
            />
          </div>
          <DialogTitle className="text-center font-semibold text-2xl">
            You ran out of hearts
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            Get pro for unlimited hearts, or purchase them from the store
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mb-4">
          <div className="flex flex-col gap-y-4 w-full">
            <Button
              className="w-full bg-[#3A1078] text-[#F7F7F8]"
              size="lg"
              onClick={onClick}
            >
              Get Unlimited Hearts
            </Button>
            <Button
              className="w-full"
              variant="secondary"
              size="lg"
              onClick={() => {
                close();
              }}
            >
              No Thanks
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
