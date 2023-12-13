"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icons } from "../_components/icons";

import axios from "axios";
import { useRouter } from "next/navigation";

interface LoginBoxProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function LoginBox({ className, ...props }: LoginBoxProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const router = useRouter();

  async function onSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    const formDataObject: { [key: string]: any } = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });

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
      sessionStorage.setItem("user_name", response.data.name);
      sessionStorage.setItem("user_email", response.data.email);
      sessionStorage.setItem("user_role", response.data.roleId);
      sessionStorage.setItem("is_user_active", response.data.isActive);

    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      router.push("/agendamento/sala");

    }
  }

  return (
    <div className="w-[512px] mt-[248px] mx-[512px]">
      <div className={cn("grid gap-6", className)} {...props}>
        <form onSubmit={onSubmit}>
          <div className="grid gap-2">
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="email">
                Email
              </Label>
              <Input
                id="email"
                placeholder="jorge@example.com"
                type="email"
                name="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={isLoading}
              />
            </div>
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="password">
                Senha
              </Label>
              <Input
                id="password"
                placeholder="Senha"
                name="password"
                type="password"
                autoCapitalize="none"
                autoComplete="off"
                autoCorrect="off"
                disabled={isLoading}
              />
            </div>
            <Button disabled={isLoading}>
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Entrar
            </Button>
          </div>
        </form>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Ou acesse com
            </span>
          </div>
        </div>
        <Button variant="outline" type="button" disabled={isLoading}>
          {isLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.google className="mr-2 h-4 w-4" />
          )}
          Google
        </Button>
      </div>
    </div>
  );
}
