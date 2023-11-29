"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icons } from "../_components/icons";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoginBox from "../_components/loginBox";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export default function UserAuthForm({
  className,
  ...props
}: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);


  async function onSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    const formDataObject: { [key: string]: any } = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });

    console.log("leticia: ", formDataObject);
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3030/v1/signin",
        formDataObject,
        {
          headers: {
            Access: 123,
          },
        }
      );
      sessionStorage.setItem("user_key", response.data.token);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (

    <div>
      <LoginBox />
    </div>
  );
}
