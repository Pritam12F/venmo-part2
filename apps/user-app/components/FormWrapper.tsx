import { TextInput } from "@repo/ui/textinput";

export enum FormType {
  Signup,
  Signin,
}

export const AuthFormWrapper = ({ type }: { type: FormType }) => {
  if (type === FormType.Signin) {
    return (
      <div>
        <TextInput placeholder="Enter number" label="Phone number" />
        <TextInput placeholder="*********" label="Password" />
      </div>
    );
  } else {
    return (
      <div>
        <TextInput placeholder="Enter name" label="Username" />
        <TextInput placeholder="Enter email" label="Email" />
        <TextInput placeholder="Enter number" label="Phone number" />
        <TextInput placeholder="*********" label="Password" />
      </div>
    );
  }
};
