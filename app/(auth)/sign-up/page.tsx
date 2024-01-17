"use client";

import * as React from "react";

import { SignUpBox } from "../../_components/signUpBox";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export default function UserAuthForm({
  className,
  ...props
}: UserAuthFormProps) {
  return (
    <div>
      <SignUpBox />
    </div>
  );
}
