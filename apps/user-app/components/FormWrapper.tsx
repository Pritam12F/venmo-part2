"use client";

import { TextInput } from "@repo/ui/textinput";
import { FormType } from "../types";
import { Button } from "@repo/ui/button";
import { signIn } from "next-auth/react";
import { createUser, validSignIn, validSignup } from "../app/lib/actions";

export const AuthFormWrapper = ({ type }: { type: FormType }) => {
  const handleSignin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const phone = formData.get("number");
    const password = formData.get("password");

    if (!validSignIn(phone, password)) {
      alert("wrong inputs");
      return;
    }

    try {
      await signIn("credentials", {
        phone,
        password,
        callbackUrl: "/dashboard",
      });
    } catch (error) {
      alert(error);
      return null;
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const phone = String(formData.get("number"));
    const password = String(formData.get("password"));
    const email = String(formData.get("email"));
    const username = String(formData.get("username"));

    if (validSignup(phone, password, email, username)) {
      alert("Wrong inputs!!");
      return;
    }

    try {
      await createUser(phone, password, email, username);
    } catch (err) {
      console.log("Error signing up user");
    }
  };
  if (type === FormType.Signin) {
    return (
      <form onSubmit={handleSignin}>
        <TextInput
          placeholder="Enter number"
          label="Phone number"
          name="number"
        />
        <TextInput
          placeholder="*********"
          label="Password"
          name="password"
          type="password"
        />
        <div className="my-6">
          <Button style="w-full" type="submit">
            Sign in
          </Button>
        </div>
      </form>
    );
  } else {
    return (
      <form onSubmit={handleSignup}>
        <TextInput placeholder="Enter name" label="Username" name="username" />
        <TextInput placeholder="Enter email" label="Email" name="email" />
        <TextInput
          placeholder="Enter number"
          label="Phone number"
          name="number"
        />
        <TextInput
          placeholder="*********"
          label="Password"
          name="password"
          type="password"
        />
        <div className="my-6">
          <Button style="w-full" type="submit">
            Sign up
          </Button>
        </div>
      </form>
    );
  }
};
