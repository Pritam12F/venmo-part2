"use client";

import { TextInput } from "@repo/ui/textinput";
import { FormType } from "../types";
import { useState } from "react";

export const AuthFormWrapper = ({ type }: { type: FormType }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [pass, setPass] = useState("");

  if (type === FormType.Signin) {
    return (
      <div>
        <TextInput
          placeholder="Enter number"
          label="Phone number"
          onChange={(str) => {
            setNumber(str);
          }}
        />
        <TextInput
          placeholder="*********"
          label="Password"
          onChange={(str) => {
            setPass(str);
          }}
        />
      </div>
    );
  } else {
    return (
      <div>
        <TextInput
          placeholder="Enter name"
          label="Username"
          onChange={(str) => {
            setName(str);
          }}
        />
        <TextInput
          placeholder="Enter email"
          label="Email"
          onChange={(str) => {
            setEmail(str);
          }}
        />
        <TextInput
          placeholder="Enter number"
          label="Phone number"
          onChange={(str) => {
            setNumber(str);
          }}
        />
        <TextInput
          placeholder="*********"
          label="Password"
          onChange={(str) => {
            setPass(str);
          }}
        />
      </div>
    );
  }
};
