"use client";

import * as React from "react";

import LoginBox from "../../_components/loginBox";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function UserAuthForm({
  className,
  ...props
}: UserAuthFormProps) {
  return (
    <div>
      <LoginBox />
    </div>
  );
}
