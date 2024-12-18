"use client";

import Image from "next/image";
import { useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { POINTS_TO_REFIL } from "@/lib/constant";
import { refilHearts } from "@/actions/refil.hearts.actions";
import { createStripeUrl } from "@/actions/user.subscription.action";

interface ShopProps {
  hearts: number;
  points: number;
  hasActiveSubscription: boolean;
}

export function Items({ hearts, points, hasActiveSubscription }: ShopProps) {
  const [pending, startTransition] = useTransition();

  const onRefilHearts = () => {
    if (pending || hearts === 5 || points < POINTS_TO_REFIL) return;

    startTransition(() => {
      refilHearts().catch(() => toast.error("Something went wrong"));
    });
  };

  const onUpgrade = () => {
    startTransition(() => {
      createStripeUrl()
        .then((res) => {
          if (res.data) {
            window.location.href = res.data;
          }
        })
        .catch(() => toast.error("Something went wrong"));
    });
  };

  return (
    <ul className="w-full">
      <div className="flex items-center w-full p-4 gap-x-4 border-t-2">
        <Image src="/icons/heart.svg" alt="heart" width={60} height={60} />
        <div className="flex-1">
          <p className="text-base lg:text-xl text-zinc-800 font-semibold">
            Refill Hearts
          </p>
        </div>
        <Button
          variant="outline"
          disabled={hearts === 5 || points < POINTS_TO_REFIL || pending}
          onClick={onRefilHearts}
        >
          {hearts === 5 ? (
            "full"
          ) : (
            <div className="flex items-center">
              <Image
                src="/icons/points.svg"
                alt="points"
                height={20}
                width={20}
              />
              <p>{POINTS_TO_REFIL}</p>
            </div>
          )}
        </Button>
      </div>
      <div className="flex items-center w-full p-4 pt-8 gap-x-4 border-t-2">
        <Image
          src="/icons/unlimited.svg"
          alt="unlimited"
          height={60}
          width={60}
        />
        <div className="flex-1 ">
          <p className="text-base lg:text-xl text-zinc-800 font-semibold">
            Unlimited Hearts
          </p>
        </div>
        <Button className="" onClick={onUpgrade} disabled={pending}>
          {hasActiveSubscription ? "Settings" : "Upgrade"}
        </Button>
      </div>
    </ul>
  );
}
