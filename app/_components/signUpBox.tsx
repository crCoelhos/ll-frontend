"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Separator } from "@/components/ui/separator";
import { Datepicker } from "flowbite-react";
import { useState } from "react";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export function SignUpBox() {
  const [newBirthdate, setNewBirthdate] = useState<Date | undefined>(
    new Date()
  );
  const [address, setAddress] = useState({
    street: "",
    number: "",
    city: "",
    state: "",
    CEP: "",
  });

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    try {
      const formDataObject = {
        name: form.getValues().name,
        email: form.getValues().email,
        CPF: form.getValues().CPF,
        password: form.getValues().password,
        birthdate: newBirthdate,
        address: {
          street: address.street,
          number: address.number,
          city: address.city,
          state: address.state,
          CEP: address.CEP,
        },
      };

      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + "v1/user/create",
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
      router.push("/sign-in");
    }
  }

  return (
    <div className="w-[75vw] pl-[22vw] my-24">
      <Form {...form}>
        <form onSubmit={onSubmit} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="Rogerio Sergio" {...field} />
                </FormControl>
                <FormDescription>Este é o seu nome completo</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="rogerio@email.com" {...field} />
                </FormControl>
                <FormDescription>Este é o seu melhor email</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 items-center gap-2">
            <FormField
              control={form.control}
              name="CPF"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CPF</FormLabel>
                  <FormControl>
                    <Input placeholder="123.456.789-10" {...field} />
                  </FormControl>
                  <FormDescription>Este é o seu CPF.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Datepicker
              language="pt-BR"
              labelTodayButton="Hoje"
              labelClearButton="Limpar"
              onSelectedDateChanged={(date) => setNewBirthdate(date)}
            />
          </div>

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input
                    placeholder="insira uma senha"
                    {...field}
                    type="password"
                  />
                </FormControl>
                <FormDescription>
                  Esta é sua senha de acesso ao sistema.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="passwordConfirmation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmação de senha</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Confirme sua senha"
                    // {...field}
                    type="password"
                  />
                </FormControl>
                <FormDescription>
                  Esta é sua senha de acesso ao sistema.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Separator className="my-4" />
          <FormField
            control={form.control}
            name="CEP"
            render={({ field }) => (
              <FormItem className="w-72">
                <FormLabel>CEP</FormLabel>
                <FormControl>
                  <Input
                    placeholder="69999-000"
                    {...field}
                    type="text"
                    onChange={(e) => {
                      setAddress((prevAddress) => ({
                        ...prevAddress,
                        CEP: e.target.value,
                      }));
                      field.onChange(e);
                    }}
                  />
                </FormControl>
                <FormDescription>Este é o CEP de sua rua.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 items-center gap-2">
            <FormField
              control={form.control}
              name="street"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rua</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Rua Rio Branco"
                      {...field}
                      type="text"
                      onChange={(e) => {
                        setAddress((prevAddress) => ({
                          ...prevAddress,
                          street: e.target.value,
                        }));
                        field.onChange(e);
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    Esta é a rua em que você reside.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="16"
                      {...field}
                      type="text"
                      className="w-32"
                      onChange={(e) => {
                        setAddress((prevAddress) => ({
                          ...prevAddress,
                          number: e.target.value,
                        }));
                        field.onChange(e);
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    Este é o número da residência em que você reside.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 items-center gap-2">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cidade</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Rio Branco"
                      {...field}
                      type="text"
                      onChange={(e) => {
                        setAddress((prevAddress) => ({
                          ...prevAddress,
                          city: e.target.value,
                        }));
                        field.onChange(e);
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    Esta é a cidade em que você reside.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estado</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Acre"
                      {...field}
                      type="text"
                      onChange={(e) => {
                        setAddress((prevAddress) => ({
                          ...prevAddress,
                          state: e.target.value,
                        }));
                        field.onChange(e);
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    Este é o estado em que você reside.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Separator className="my-4" />

          <div className="grid grid-cols-3 gap-2">
            <Button
              type="submit"
              variant="secondary"
              className="bg-green-600 hover:bg-green-500 text-white"
            >
              Registrar
            </Button>
            <Button variant="destructive" onClick={() => router.back}>
              Cancelar
            </Button>
            <Button variant={"outline"} onClick={() => router.push("/sign-in")}>
              Já tem uma conta?
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
