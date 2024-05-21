"use client";

import { TextInput } from "@repo/ui/textinput";
import { FormType } from "../types";
import { Button } from "@repo/ui/button";
import { handleSignin } from "../app/lib/actions";

export const AuthFormWrapper = ({ type }: { type: FormType }) => {
  if (type === FormType.Signin) {
    return (
      <form onSubmit={handleSignin}>
        <TextInput
          placeholder="Enter number"
          label="Phone number"
          name="number"
        />
        <TextInput placeholder="*********" label="Password" name="password" />
        <div className="my-6">
          <Button style="w-full" type="submit">
            Sign in
          </Button>
        </div>
      </form>
    );
  } else {
    return (
      <form>
        <TextInput placeholder="Enter name" label="Username" name="username" />
        <TextInput placeholder="Enter email" label="Email" name="email" />
        <TextInput
          placeholder="Enter number"
          label="Phone number"
          name="number"
        />
        <TextInput placeholder="*********" label="Password" name="password" />
        <div className="my-6">
          <Button style="w-full" type="submit">
            Sign up
          </Button>
        </div>
      </form>
    );
  }
};
