import { getServerSession } from "next-auth";
import { AuthHeader } from "../../components/AuthHeader";
import { AuthFormWrapper } from "../../components/FormWrapper";
import { AuthType, FormType } from "../../types";
import { redirect } from "next/navigation";
import { authOptions } from "../lib/auth";

export default async function Signin() {
  const session = await getServerSession(authOptions);
  if (session?.user) {
    redirect("/dashboard");
  }
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-gray-100 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <AuthHeader type={AuthType.Signin} />
        <AuthFormWrapper type={FormType.Signin} />
      </div>
    </div>
  );
}
