"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { Appbar } from "@repo/ui/appbar";
import { usePathname, useRouter } from "next/navigation";

export function AppbarClient() {
  const session = useSession();
  const router = useRouter();
  const path = usePathname();
  const excludedPaths = ["/signin", "/signup"];

  if (excludedPaths.includes(path)) {
    return null;
  }

  return (
    <div>
      <Appbar
        onSignin={signIn}
        onSignout={async () => {
          await signOut();
          router.push("/api/auth/signin");
        }}
        user={session.data?.user}
      />
    </div>
  );
}
