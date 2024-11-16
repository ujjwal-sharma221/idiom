import Image from "next/image";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

import { Button } from "@/components/ui/button";

export async function Header() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <header className="h-20 w-full px-4">
      <div className="lg:max-w-screen-2xl mx-auto flex items-center justify-between h-full">
        <div className="pt-8 pb-7 flex items-center gap-x-3">
          <Image src="/logo.svg" alt="brand logo" height={40} width={40} />
          <h1 className="text-2xl font-bold">Idiom</h1>
        </div>
        <div>
          {user ? (
            <div className="flex gap-x-1 items-center">
              <div className="font-semibold text-sm text-muted-foreground">
                hey, {user.given_name}
              </div>
              <Button asChild variant="linkHover1">
                <LogoutLink>Log out</LogoutLink>
              </Button>
            </div>
          ) : (
            <div className="flex gap-x-2">
              <Button asChild variant="secondary">
                <LoginLink>Sign in</LoginLink>
              </Button>

              <Button asChild variant="gooeyLeft">
                <RegisterLink>Sign up</RegisterLink>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
