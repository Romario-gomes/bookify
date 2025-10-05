import { signIn } from "next-auth/react";

export function SignInButton() {
  return (
    <button onClick={() => signIn("google", { callbackUrl: "/dashboard" })}>
      Sign in with Google
    </button>
  );
}