"use client";

import { Inter as FontSans } from "next/font/google";
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";

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

import { store } from "./store";
import MainPageCarousel from "./_components/mainPageCarousel";
import MainPageSideContent from "./_components/mainPageSideContent";

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

export default function Home() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  const content = [
    {
      title: "Transforme sua Prática Jurídica",
      text: "Descubra a LegaLiga, onde oferecemos escritório virtual, espaços físicos sob demanda e exposição estratégica, revolucionando a maneira como os advogados gerenciam seus escritórios e se conectam com clientes.",
    },
    // {
    //   title: "Eficiência e Flexibilidade",
    //   text: "Otimize suas atividades diárias com nosso escritório virtual intuitivo, elimine custos fixos alugando espaços físicos apenas quando necessário e aumente sua visibilidade através de nossa plataforma estratégica de exposição.",
    // },
    // {
    //   title: "Inovação Holística",
    //   text: "Diferenciamos ao oferecer não apenas serviços de escritório, mas uma solução completa que une praticidade e visibilidade para advogados. Seja parte da LegaLiga e transforme sua abordagem na advocacia.",
    // },
    // {
    //   title: "Cresça Conosco",
    //   text: "Participe de nossa jornada de crescimento. Investimos em desenvolvimento tecnológico, estratégias de marketing e expansão da equipe para consolidar a LegaLiga como líder no mercado jurídico nos próximos 18 meses.",
    // },
    {
      title: "Conectando Advogados e Clientes",
      text: "A LegaLiga proporciona uma plataforma inovadora que facilita a conexão entre advogados e clientes. Utilize nossos recursos para expandir sua rede profissional e encontrar clientes em busca de serviços jurídicos especializados.",
      description:
        "Amplie sua carteira de clientes e fortaleça sua presença no mercado com nossa abordagem única de conexão entre advogados e clientes.",
    },
    // {
    //   title: "Segurança e Privacidade",
    //   text: "Priorizamos a segurança e privacidade dos dados dos nossos usuários. Com a LegaLiga, você pode conduzir suas atividades jurídicas com confiança, sabendo que implementamos as mais recentes medidas de segurança para proteger suas informações sensíveis.",
    //   description:
    //     "Confie em nossa plataforma para garantir a integridade e confidencialidade das suas comunicações e documentos, proporcionando um ambiente seguro para suas operações jurídicas.",
    // },
    {
      title: "Facilite Sua Rotina Jurídica",
      text: "Simplificamos a gestão do seu escritório virtual. Com a LegaLiga, tenha acesso a ferramentas avançadas de organização, agendamento e colaboração. Torne sua rotina jurídica mais eficiente, permitindo que você se concentre no que realmente importa: atender às necessidades dos seus clientes.",
      description:
        "A LegaLiga oferece uma experiência integrada para facilitar a administração do seu escritório, proporcionando mais tempo para o exercício da advocacia e fortalecendo o seu relacionamento com os clientes.",
    },
    {
      title: "Colabore e Cresça",
      text: "Na LegaLiga, acreditamos no poder da colaboração. Conecte-se com outros advogados, compartilhe conhecimentos e experiências. Nossa comunidade proporciona um ambiente colaborativo para troca de ideias e oportunidades de parcerias que podem impulsionar o crescimento do seu escritório.",
      description:
        "Junte-se a uma rede dinâmica de profissionais jurídicos. Colabore em casos, expanda sua influência e alcance novos patamares de sucesso. A LegaLiga é mais do que uma plataforma, é uma comunidade que impulsiona o seu crescimento profissional.",
    },
    {
      title: "Avaliações de Clientes",
      text: "Explore nosso sistema de avaliações transparente, onde clientes podem compartilhar feedback sobre os serviços dos advogados. Destaque suas conquistas e construa uma reputação sólida baseada na satisfação dos clientes.",
      description:
        "Construa confiança através de avaliações positivas. Seja reconhecido por seu profissionalismo e dedicação aos clientes na LegaLiga.",
    },
    {
      title: "Agenda Integrada",
      text: "Sincronize sua agenda com a LegaLiga e gerencie seus compromissos de forma eficiente. Receba notificações, programe reuniões e mantenha-se organizado enquanto foca no que realmente importa - seu trabalho jurídico.",
      description:
        "Otimize seu tempo com nossa agenda integrada. Simplifique a gestão de compromissos e concentre-se no crescimento da sua prática.",
    },
    {
      title: "Assistência Jurídica Pro Bono",
      text: "Dedique parte do seu tempo para ações pro bono através da LegaLiga. Contribua para causas sociais, construa uma reputação ética e faça a diferença na comunidade. Juntos, podemos promover a justiça e o acesso à lei para todos.",
      description:
        "Envolva-se em iniciativas pro bono e deixe um impacto positivo na sociedade. Faça parte de uma comunidade que valoriza a responsabilidade social.",
      footer:
        "*A LegaLiga oferece suporte para ações pro bono, mas não se responsabiliza pela prestação de serviços jurídicos gratuitos.",
      color: "red",
    },
    {
      title: "Plano de Marketing Personalizado",
      text: "Desenvolva sua presença online com um plano de marketing personalizado da LegaLiga. Aumente sua visibilidade, atraia novos clientes e fortaleça sua marca como um advogado líder em sua área de atuação.",
      description:
        "Conte com nosso suporte para criar uma estratégia de marketing eficaz. Destaque-se no mercado jurídico e alcance seus objetivos comerciais com a LegaLiga.",
      color: "#f00",
    },
  ];

  return (
    <main className="">
      <div className="top-0">
        <MainPageCarousel />
      </div>
      <aside className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-16 justify-center mx-[8vw] lg:grid-cols-3">
        {content.map((item, index) => (
          <MainPageSideContent
            title={item.title}
            description={item.description}
            text={item.text}
            footer={item.footer ? item.footer : ""}
            color={item.color ? item.color : "green"}
          />
        ))}
      </aside>
    </main>
  );
}
