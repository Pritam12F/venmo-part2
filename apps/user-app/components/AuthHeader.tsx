import Link from "next/link";
import { AuthType } from "../types";

export const AuthHeader = ({ type }: { type: AuthType }) => {
  return (
    <div>
      <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
        {type === AuthType.Signin
          ? "Sign in to your account"
          : "Create a new account"}
      </h2>
      <p className="mt-2 text-center text-sm text-gray-600">
        Or
        <Link
          className="font-medium text-primary-800 hover:text-primary-500 hover:underline"
          href={type === AuthType.Signin ? "/signup" : "/api/auth/signin"}
        >
          {" "}
          {type === AuthType.Signin
            ? "sign up for a new account"
            : "sign in if you already have an account!"}
        </Link>
      </p>
    </div>
  );
};
