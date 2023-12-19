import React, { useState } from "react";
import axios from "axios";
import { cn } from "@/lib/utils";
import { Label } from "@radix-ui/react-label";
import { Icons } from "./icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";


interface SignUpBoxProps extends React.HTMLAttributes<HTMLDivElement> { }

export default function SignUpBox({ className, ...props }: SignUpBoxProps) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        CPF: "",
        birthdate: "",
        password: "",
        isActive: 1,
        roleId: 1,
        address: {
            street: "",
            city: "",
            state: "",
            CEP: "",
        },
    });

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            address: {
                ...prevData.address,
                [name]: value,
            },
        }));
    };


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
                "http://localhost:3030/v1/user/",
                formDataObject,
                {
                    headers: {
                        Access: 123,
                    },
                }
            );

        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
            router.push("/sign-in");

        }
    }

    return (
        <div className="w-[512px] mt-[248px] mx-[512px]">
            <div className={cn("grid gap-6", className)} {...props}>
                <form onSubmit={onSubmit}>
                    <div className="grid gap-2">
                        <div className="grid gap-1">
                            <Label className="sr-only" htmlFor="name">
                                Nome
                            </Label>
                            <Input
                                id="name"
                                placeholder="NOME: Jorge Rogério"
                                type="text"
                                name="name"
                                autoCapitalize="none"
                                autoComplete="off"
                                autoCorrect="off"
                                disabled={isLoading}
                            />
                        </div>
                        <div className="grid gap-1">
                            <Label className="sr-only" htmlFor="email">
                                Email
                            </Label>
                            <Input
                                id="email"
                                placeholder="EMAIL: jorge@example.com"
                                type="email"
                                name="email"
                                autoCapitalize="off"
                                autoComplete="off"
                                autoCorrect="off"
                                disabled={isLoading}
                            />
                        </div>
                        <div className="grid gap-1">
                            <Label className="sr-only" htmlFor="cpf">
                                CPF
                            </Label>
                            <Input
                                id="cpf"
                                placeholder="CPF: 123.456.789-10"
                                type="text"
                                name="cpf"
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
                                disabled={isLoading}
                            />
                        </div>
                        <div className="grid gap-1">
                            <Label className="sr-only" htmlFor="passwordConfirmation">
                                Confirmar Senha
                            </Label>
                            <Input
                                id="passwordConfirmation"
                                placeholder="Confirme a senha"
                                name="passwordConfirmation"
                                type="passwordConfirmation"
                                disabled={isLoading}
                            />
                        </div>
                        <div className="grid gap-1">
                            <Label className="sr-only" htmlFor="street">
                                Rua
                            </Label>
                            <Input
                                id="street"
                                placeholder="RUA: Rio Branco"
                                name="street"
                                type="street"
                                disabled={isLoading}
                            />
                        </div>
                        <div className="grid gap-1">
                            <Label className="sr-only" htmlFor="number">
                                Numero
                            </Label>
                            <Input
                                id="number"
                                placeholder="NUMERO: 16"
                                name="number"
                                type="number"
                                disabled={isLoading}
                            />
                        </div>
                        <div className="grid gap-1">
                            <Label className="sr-only" htmlFor="city">
                                Cidade
                            </Label>
                            <Input
                                id="city"
                                placeholder="CIDADE: Rio Branco"
                                name="city"
                                type="city"
                                disabled={isLoading}
                            />
                        </div>
                        <div className="grid gap-1">
                            <Label className="sr-only" htmlFor="state">
                                Estado
                            </Label>
                            <Input
                                id="state"
                                placeholder="ESTADO: Acre"
                                name="state"
                                type="state"
                                disabled={isLoading}
                            />
                        </div>
                        <div className="grid gap-1">
                            <Label className="sr-only" htmlFor="CEP">
                                CEP
                            </Label>
                            <Input
                                id="CEP"
                                placeholder="CEP: 69999-123"
                                name="CEP"
                                type="CEP"
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
};
