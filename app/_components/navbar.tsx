"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Icons } from "./icons";

import { useRouter } from "next/navigation";
import { useAppSelector } from "../store";
import { authActions } from "../store/auth/auth-slice";
import { useDispatch } from "react-redux";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "É advogado e ser parceiro?",
    href: "/lawyer-sign-up",
    description:
      "Para fazer parte de nosso grupo de profissionais, submeta a sua inscrição.",
  },
  {
    title: "Nossos parceiros",
    href: "/advogado",
    description: "Conheça nossos parceiros e suas especialidades.",
  },
  {
    title: "Nosso diferencial",
    href: "/docs/primitives/progress",
    description: "Conexão advogado-cliente para além de um escritório virtual",
  },
  {
    title: "Como atuamos",
    href: "/docs/primitives/scroll-area",
    description: "Entenda como funciona a nossa plataforma.",
  },
];

export function Navbar() {
  const router = useRouter();

  const dispatch = useDispatch();
  const authData = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(authActions.logout());

    if (typeof window !== "undefined") {
      window.location.href = "/";
    }
    router.push("/");
  };

  return (
    <>
      <div className="flex... pt-2">
        <NavigationMenu className="">
          <NavigationMenuList className="grid grid-cols-4 grid-rows-1">
            <NavigationMenu id="logo-options" className="">
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <img src="legaliga.png" alt="" className="w-32" />
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-1 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-1 no-underline outline-none focus:shadow-md"
                          href="/sobre"
                        >
                          <Icons.logo className="h-1 w-1" />
                          <div className="mb-2 mt-4 text-lg font-medium">
                            LEGALIGA
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            O seu escritório virtual!
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <ListItem href="/agendamento/sala/1" title="Teste agora!">
                      Comece descobrindo alguns dos advogados parceiros.
                    </ListItem>
                    <ListItem
                      href="/agendamento/sala"
                      title="Agendamento de salas"
                    >
                      Não tem escritório? Agende uma reunião!
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenu>
            <NavigationMenu id="parceiros" className="">
              <NavigationMenuItem>
                <NavigationMenuTrigger>Parceiros</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-1 p-1 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                    {components.map((component) => (
                      <ListItem
                        key={component.title}
                        title={component.title}
                        href={component.href}
                      >
                        {component.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenu>
          </NavigationMenuList>

          <NavigationMenuList className="grid grid-cols-1 grid-rows-1">
            {authData.roleId == "1" && (
              <NavigationMenu className=" px-12	">
                <NavigationMenuItem>
                  <Link href="/dashboard" legacyBehavior passHref>
                    <NavigationMenuLink
                      // className={navigationMenuTriggerStyle()}
                      className={cn(
                        "text-red-700 !font-bold",
                        navigationMenuTriggerStyle()
                      )}
                    >
                      Dashboard
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/administrador" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        "text-red-700 !font-bold",
                        navigationMenuTriggerStyle()
                      )}
                    >
                      Area do Administrador
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenu>
            )}
          </NavigationMenuList>

          <NavigationMenuList className="grid grid-cols-2 grid-rows-1">
            {authData.name ? (
              <NavigationMenu>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>{authData.name}</NavigationMenuTrigger>

                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[200px] md:grid-cols-2 lg:w-[350px] ">
                      <ListItem key="Profile" title="Perfil" href="/perfil">
                        Meus dados
                      </ListItem>
                      <ListItem
                        key="Logout"
                        title="Logout"
                        onClick={handleLogout}
                      >
                        Sair da conta
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenu>
            ) : (
              <>
                <NavigationMenuItem className=" space-x-1">
                  <NavigationMenuLink
                    href="/sign-in"
                    className={`${navigationMenuTriggerStyle()} bg-red-900 hover:bg-red-700 text-white  hover:text-white`}
                  >
                    Entrar
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/sign-up"
                    className={`${navigationMenuTriggerStyle()} bg-rose-400 text-white  hover:bg-rose-800  hover:text-white`}
                  >
                    Registrar
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </>
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
