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

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Quer ser parceiro?",
    href: "/docs/primitives/alert-dialog",
    description:
      "Para fazer parte de nossos profissionais, submeta a sua inscrição.",
  },
  {
    title: "Conheça nossos planos",
    href: "/docs/primitives/hover-card",
    description:
      "",
  },
  {
    title: "Nosso diferencial",
    href: "/docs/primitives/progress",
    description: "Conexão advogado-cliente para além de um escritório virtual",
  },
  {
    title: "Como atuamos",
    href: "/docs/primitives/scroll-area",
    description: "Conheça nosso fluxo.",
  },
];

export function Navbar() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Legaliza</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/sobre"
                  >
                    <Icons.logo className="h-6 w-6" />
                    <div className="mb-2 mt-4 text-lg font-medium">
                      Legaliza
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      O seu escritório virtual!
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/advogado/" title="Teste agora!">
                Comece descobrindo alguns dos advogados parceiros.
              </ListItem>
              <ListItem href="/agendamento/advogado/1" title="Agendamento">
                Ja sabe quem contratar? Marque um horario!
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Parceiros</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
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

        <NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Entre em contato
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        {/* {userIsLoggedIn} */}

        {/* <NavigationMenuItem className="pl-[48vw]">
          <Link href="/sign-in" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              userName
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem> */}
        {/* else */}

        <NavigationMenuItem className="pl-[48vw] space-x-4">
          <Link href="/sign-in" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Entrar
            </NavigationMenuLink>
          </Link>
          <Link href="/sign-up" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Registrar
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
      
    </NavigationMenu>
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