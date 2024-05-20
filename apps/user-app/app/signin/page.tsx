import { AuthHeader } from "../../components/AuthHeader";
import { AuthFormWrapper } from "../../components/FormWrapper";
import { AuthType, FormType } from "../../types";

export default function Signin() {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-gray-100 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <AuthHeader type={AuthType.Signin} />
        <form action="#" className="space-y-6" method="POST">
          <AuthFormWrapper type={FormType.Signin} />
        </form>
      </div>
    </div>
  );
}
