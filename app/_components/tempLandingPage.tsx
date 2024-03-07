"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cards } from "../page";

interface TempLandingPageProps {}

const TempLandingPage = (props: TempLandingPageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [y, setY] = useState(window.scrollY);
  const [scrollTrigger, setScrollTrigger] = useState<number>();
  const [scrollBar, setScrollBar] = useState();

  useEffect(() => {
    window.addEventListener("scroll", () => setY(window.scrollY));
    const element = document.getElementsByTagName("body")[0];

    setScrollTrigger(window.scrollY);

    console.log(
      "scrollTrigger: ",
      scrollTrigger,
      "max height:",
      window.innerHeight
    );
  }, [y]);

  const text = cards;

  return (
    <div className="grid justify-center items-center gap-3 mt-[128px]">
      <div className="grid gap-3" id="firstQuarter">
        <div className="grid grid-cols-2 sm-grid-cols-1 justify-center items-center p-4">
          <div>
            {text.map((card, index) => {
              return (
                <Card
                  key={index}
                  className=" flex... text-center w-[478px] h-[478px] m-2 font-black p-8 justify-center items-center"
                >
                  {card.title}
                  <CardDescription>{card.text}</CardDescription>
                </Card>
              );
            })}
          </div>
          <img src="" alt="" className="w-[720px] h-[720px] bg-red-800" />
        </div>
      </div>

      <div className="grid gap-3 bg-red-200" id="secondQuarter">
        {scrollTrigger ?? 0 >= 1100 ? (
          <div className="grid grid-cols-2 sm-grid-cols-1 justify-center items-center p-4">
            <img src="" alt="" className="w-[720px] h-[720px] bg-red-800" />
            <div>
              {text.map((card, index) => {
                return (
                  <Card
                    key={index}
                    className=" flex... text-center w-[478px] h-[478px] m-2 font-black p-8 justify-center items-center"
                  >
                    {card.title}
                    <CardDescription>{card.text}</CardDescription>
                  </Card>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>

      <div className="grid gap-3 bg-red-300" id="thirdQuarter">
        {scrollTrigger ?? 0 >= 1100 ? (
          <div className="grid grid-cols-2 sm-grid-cols-1 justify-center items-center p-4">
            <div>
              {text.map((card, index) => {
                return (
                  <Card
                    key={index}
                    className=" flex... text-center w-[478px] h-[478px] m-2 font-black p-8 justify-center items-center"
                  >
                    {card.title}
                    <CardDescription>{card.text}</CardDescription>
                  </Card>
                );
              })}
            </div>
            <img src="" alt="" className="w-[720px] h-[720px] bg-red-800" />
          </div>
        ) : null}
      </div>

      <div className="grid gap-3 bg-red-400" id="fourthQuarter">
        {scrollTrigger ?? 0 >= 1100 ? (
          <div className="h-[768px]">
            <div className="grid grid-cols-3 min-h-[724px] p-8 gap-2">
              <Card>
                <CardHeader>
                  <CardTitle>Titulo</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>conteudo</CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Titulo</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>conteudo</CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Titulo</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>conteudo</CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default TempLandingPage;
