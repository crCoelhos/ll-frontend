import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useAppSelector } from "../store";
import { authActions } from "../store/auth/auth-slice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "./icons";
import { cn } from "@/lib/utils";
import axios from "axios";

interface LoginBoxProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function LoginBox({ className, ...props }: LoginBoxProps) {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.target as HTMLFormElement);

    const formDataObject: { [key: string]: any } = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });

    try {
      console.log("URL da API: ", process.env.NEXT_PUBLIC_API_URL);
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + "v1/signin",
        formDataObject,
        {
          headers: {
            Access: 123,
          },
        }
      );

      const userData = {
        token: response.data.token,
        name: response.data.name,
        email: response.data.email,
        roleId: response.data.roleId,
      };

      dispatch(authActions.login(userData));

      router.push("/advogado");

    } catch (error) {
      // console.log((error as any).response.status, (error as any).response.headers, (error as any).response.data);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  
  console.log("url: ",process.env.NEXT_PUBLIC_API_URL + "v1/signin");

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
