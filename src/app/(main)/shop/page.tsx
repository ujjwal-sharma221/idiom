import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import Image from "next/image";

import { StickyWrapper } from "@/components/sticky-wrapper";
import { UserProgress } from "@/components/user-progress";
import { getUserProgress } from "../../../../db/queries";
import { FeedWrapper } from "@/components/feed-wrapper";
import { Items } from "./_components/items";

const ShopPage = async () => {
  const { isAuthenticated } = getKindeServerSession();
  const user = await isAuthenticated();
  if (!user) redirect("/");

  const userProgressData = getUserProgress();
  const [userProgress] = await Promise.all([userProgressData]);

  if (!userProgress || !userProgress.activeCourse) redirect("/courses");

  return (
    <div className="flex flex-row-reverse px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={false}
        />
      </StickyWrapper>

      <FeedWrapper>
        <div className="w-full flex flex-col items-center">
          <Image src="/images/shop.svg" alt="shop" height={90} width={90} />
        </div>
        <h1 className="text-center font-bold text-2xl my-4">Shop</h1>
        <p className="text-lg text-muted-foreground  text-center  text-md mb-6">
          Spend your coins on cool stuff
        </p>
        <Items
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={false}
        />
      </FeedWrapper>
    </div>
  );
};

export default ShopPage;
