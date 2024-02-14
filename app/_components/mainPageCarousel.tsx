"use client";

import { Inter as FontSans } from "next/font/google";
import { CardContent, Card } from "@/components/ui/card";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import EmblaCarousel from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";

import React from "react";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const cards = [
  {
    title: "Transforme sua Prática Jurídica",
    text: "Descubra a LegaLiga, onde oferecemos escritório virtual, espaços físicos sob demanda e exposição estratégica, revolucionando a maneira como os advogados gerenciam seus escritórios e se conectam com clientes.",
  },
  {
    title: "Eficiência e Flexibilidade",
    text: "Otimize suas atividades diárias com nosso escritório virtual intuitivo, elimine custos fixos alugando espaços físicos apenas quando necessário e aumente sua visibilidade através de nossa plataforma estratégica de exposição.",
  },
  {
    title: "Inovação Holística",
    text: "Diferenciamos ao oferecer não apenas serviços de escritório, mas uma solução completa que une praticidade e visibilidade para advogados. Seja parte da LegaLiga e transforme sua abordagem na advocacia.",
  },
  {
    title: "Cresça Conosco",
    text: "Participe de nossa jornada de crescimento. Investimos em desenvolvimento tecnológico, estratégias de marketing e expansão da equipe para consolidar a LegaLiga como líder no mercado jurídico nos próximos 18 meses.",
  },
];

export default function mainPageCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  return (
    <div className="flex items-center mx-[128px]">
      <Carousel
        plugins={[plugin.current]}
        className="w-full min-w-[512px] max-w-xs"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {cards.map((card, index) => (
            <CarouselItem key={index}>
              <div className="">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <div
                      key={index}
                      className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4"
                    >
                      <span className="flex h-2 w-2 translate-y-1 rounded-full bg-red-500" />
                      <div className="space-y-1">
                        <p className="text-base font-extrabold leading-none">
                          {card.title}
                        </p>
                        <p className="font-medium text-muted-foreground">
                          {card.text}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
