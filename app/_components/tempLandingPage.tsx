import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cards } from "../page";
import Head from "next/head";

const TempLandingPage = () => {
  const text = cards;

  useEffect(() => {
    const verificarElementos = () => {
      const elementos = document.querySelectorAll(".scroll-appear");
      elementos.forEach((elemento) => {
        const rect = elemento.getBoundingClientRect();
        const scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;
        const scrollTrigger = window.innerHeight * 0.8;

        if (rect.top + scrollTop < scrollTrigger) {
          elemento.classList.add("visible");
          elemento.classList.remove("hidden");
        }
      });
    };

    const handleScroll = () => {
      verificarElementos();
    };

    window.addEventListener("scroll", handleScroll);
    verificarElementos();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="container mx-auto py-8">
      <Head>
        
        <title>Legaliga</title>
        <meta
          name="description"
          content="O seu escritório virtual"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="hidden mb-8 scroll-appear hidden " id="elemento2">
        <div className="grid gap-5" id="secondQuarter">
          <div className="grid grid-cols-2 sm-grid-cols-1 justify-center items-center p-7">
            <img
              src="legaliga.png"
              alt="Descrição da imagem"
              width={720}
              height={720}
              className="bg-red-800"
            />
            <div>
              {text.map((card, index) => {
                return (
                  <Card
                    key={index}
                    className="flex... text-4xl text-center w-[478px] h-[478px] m-2 font-black p-8 justify-center items-center  hover:scale-105 m-4 duration-200 	"
                  >
                    {card.title}
                    <CardDescription className="text-xl">
                      {card.text}
                    </CardDescription>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="hidden mb-8 scroll-appear hidden " id="elemento3">
        <div className="grid gap-3 scroll-appear hidden " id="fourthQuarter">
          <div className="h-[768px]">
            <div className="grid grid-cols-3 min-h-[724px] p-8 gap-2">
              <Card className="flex flex-col justify-around text-center">
                <CardHeader>
                  <CardTitle className="text-center">PLANO GRATUITO</CardTitle>
                </CardHeader>
                <CardContent className="flex... flex-cols px-3 justify-between text-center text-6xl">
                  <CardDescription className="  font-bold	 text-2xl list-none text-[#851023]">
                    <li>ACOMPANHAMENTO DE ATÉ 2 PROCESSOS</li>
                    <li>QUADRO DE HORARIOS</li>
                    <li>NOTIFICAÇÕES</li>
                  </CardDescription>
                </CardContent>
                <CardFooter>
                  <Button variant={"destructive"} className="min-w-full">
                    Saiba mais
                  </Button>
                </CardFooter>
              </Card>

              <Card className="flex flex-col justify-around text-center">
                <CardHeader>
                  <CardTitle className="text-center">
                    PLANO INICIAL R$ 14,59
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex... flex-cols px-3 justify-evenly align-center text-center text-6xl">
                  <CardDescription className="  font-bold	 text-2xl list-none text-[#851023]">
                    <li>ACOMPANHAMENTO DE ATÉ 15 PROCESSOS</li>
                    <li>QUADRO DE HORARIOS</li>
                    <li>PUBLICAÇÕES</li>
                    <li>CONTRATAÇÃO DE ESCRITÓRIO SOB DEMANDA</li>
                    <li>NOTIFICAÇÕES PERSONALIZADAS</li>
                  </CardDescription>
                </CardContent>
                <CardFooter>
                  <Button variant={"destructive"} className="min-w-full">
                    Saiba mais
                  </Button>
                </CardFooter>
              </Card>

              <Card className="flex flex-col justify-around text-center">
                <CardHeader>
                  <CardTitle className="text-center">
                    PLANO INICIAL R$ 254,59
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex... flex-cols px-3 justify-evenly align-center text-center text-6xl">
                  <CardDescription className="  font-bold	 text-2xl list-none text-[#851023]">
                    <li>ACOMPANHAMENTO DE ATÉ 60 PROCESSOS</li>
                    <li>QUADRO DE HORARIOS</li>
                    <li>ESTAÇÃO DE TIME</li>
                    <li>PUBLICAÇÕES</li>
                    <li>NOTIFICAÇÕES PERSONALIZADAS</li>
                  </CardDescription>
                </CardContent>
                <CardFooter>
                  <Button variant={"destructive"} className="min-w-full">
                    Saiba mais
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden mb-8 scroll-appear hidden " id="elemento2">
        <div className="grid gap-3" id="secondQuarter">
          <div className="grid grid-cols-1 sm-grid-cols-1 justify-center items-center p-4">
            <Card className="flex flex-col justify-around text-center min-w-max">
              <CardHeader>
                <CardTitle className="text-center">
                  PLANO PERSONALIZADO
                </CardTitle>
              </CardHeader>
              <CardContent className="flex... flex-cols px-3 justify-evenly align-center text-center text-6xl">
                <CardDescription className="  font-bold	 text-2xl list-none text-[#851023]">
                  <li>ENTRE EM CONTATO</li>
                  <li>ADEQUAMOS DE ACORDO COM AS SUAS NECESSIDADES</li>
                  <li>PARCERIAS E COLABORAÇÕES</li>
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Button variant={"destructive"} className="min-w-full">
                  Saiba mais
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TempLandingPage;
