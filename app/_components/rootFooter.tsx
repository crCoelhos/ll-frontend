"use client";

import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Input } from "postcss";

export default function RootFooter() {
  const params = useParams();

  return (
    <>
      <footer className="bg-gray-900 mt-24">
        <div
          className="
        container
        flex flex-col flex-wrap 
        px-4
        py-16
        mx-auto
        md:items-center
        lg:items-start
        md:flex-row md:flex-nowrap
        mb-0
      "
        >
          <div className="flex-shrink-0 w-64 mx-auto text-center md:mx-0 md:text-left">
            <Link href={"/"} className="text-2xl text-white">
              LegaLiga
            </Link>
            <p className="mt-2 text-xs text-justify text-gray-400">
            Sua parceira em soluções jurídicas inovadoras. Oferecemos escritório virtual para advogados e espaços físicos sob demanda, proporcionando flexibilidade e eficiência para potencializar o sucesso do seu escritório. Conecte-se à excelência conosco.
            </p>
            <div className="flex mt-4">
              {/* <Input type="email" placeholder="Email" /> */}
              <Button variant="destructive">Entrar em contato</Button>
            </div>
            <div className="flex justify-center mt-4 space-x-4 lg:mt-2">
              <Link href={""}>
                <Facebook className="text-blue-500" />
              </Link>
              <Link href={""}>
                <Twitter className="text-sky-300" />
              </Link>
              <Link href={""}>
                <Instagram className="text-pink-500" />
              </Link>
              <Link href={""}>
                <Linkedin className="text-blue-400" />
              </Link>
            </div>
          </div>
          <div className="justify-between w-full mt-4 text-center lg:flex">
            <div className="w-full px-4 lg:w-1/3 md:w-1/2">
              <h2 className="mb-2 font-bold tracking-widest text-gray-100">
                Sobre a LegaLiga
              </h2>
              <ul className="mb-8 space-y-2 text-sm list-none">
                <li>
                  <Link href={"/"} className="text-gray-300">
                    Link
                  </Link>
                </li>
              </ul>
            </div>
            <div className="w-full px-4 lg:w-1/3 md:w-1/2">
              <h2 className="mb-2 font-bold tracking-widest text-gray-100">
                Nossos projetos
              </h2>
              <ul className="mb-8 space-y-2 text-sm list-none">
                <li>
                  <Link href={"/"} className="text-gray-300">
                    Link
                  </Link>
                </li>
              </ul>
            </div>
            <div className="w-full px-4 lg:w-1/3 md:w-1/2">
              <h2 className="mb-2 font-bold tracking-widest text-gray-100">
                Parceiros
              </h2>
              <ul className="mb-8 space-y-2 text-sm list-none">
                <li>
                  <Link href={"/"} className="text-gray-300">
                    Link
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex justify-center -mt-12">
          <p className="text-center text-white pb-2">
            @2024 Todos os direitos reservados à LegaLiga.
          </p>
        </div>
      </footer>
    </>
  );
}
