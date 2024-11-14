import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

export async function Header() {
  return (
    <header className="h-20 w-full border-b-2 px-4">
      Header
      <LoginLink>Sign in</LoginLink>
      <RegisterLink>Sign up</RegisterLink>
    </header>
  );
}
