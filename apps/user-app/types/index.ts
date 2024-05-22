import { z } from "zod";

export enum FormType {
  Signup,
  Signin,
}

export enum AuthType {
  Signup,
  Signin,
}

export const signInSchema = z.object({
  number: z.string().length(10, { message: "wrong number" }),
  password: z.string(),
});

export const signUpSchema = z.object({
  number: z.string().length(10, { message: "wrong number" }),
  password: z.string(),
  email: z.string().email({ message: "Enter a valid email" }),
  username: z.string(),
});

const a = 5;
