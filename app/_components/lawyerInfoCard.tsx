import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { useRouter } from "next/navigation";

import React, { useState } from "react";
import { useNavigation } from "react-day-picker";
import { map } from "zod";

interface LawyerInfoCardProps {
  lawyerKey: number;
  name: string;
  title: string;
  expertise: string[];
  contactNumber: string[] | string;
  description: string;
  UF: string;
  subsection: string;
  image: {
    fallback: string;
    src?: string;
  };
}

export function LawyerInfoCard(props: LawyerInfoCardProps) {
  const router = useRouter();

  const handleClick = (lawyerKey: number) => {
    console.log(props.lawyerKey);
    router.push(`/advogado/${lawyerKey}`);
    console.log("lawyerKey: ", props);
  };

  return (
    <div className="lawyerInfoCard m-2">
      <Card
        className="grid grid-cols-4 px-12 mx-2 border-solid border-2 border-transparent hover:cursor-pointer hover:border-solid hover:border-2 hover:border-red-400 transition duration-300 ease-in-out ..."
        // className="flex flex-row w-full justify-between px-12 mx-2 border-solid border-2 border-transparent hover:cursor-pointer hover:border-solid hover:border-2 hover:border-red-400 transition duration-500  ease-in-out ..."
        onClick={() => handleClick(props.lawyerKey)}
      >
        <div className="info grid grid-cols-4  col-span-3 gap-1 items-center justify-center">
          <CardHeader className="text-center">
            <CardTitle>{props.name}</CardTitle> {props.title}
          </CardHeader>

          <div className="flex flex-col justify-center">
            {props.expertise ? (
              props.expertise.map((expertise: string) => (
                <CardContent key={expertise}>
                  <Badge>{expertise}</Badge>
                </CardContent>
              ))
            ) : (
              <CardContent>
                <Badge>Nenhuma</Badge>
              </CardContent>
            )}
          </div>

          <CardDescription className="text-center">
            {props.description}
          </CardDescription>

          <CardFooter className="grid grid-rows-1">
            <span>{props.contactNumber}</span>
            <span>- {props.subsection}</span>
            <span>- {props.UF}.</span>
          </CardFooter>
        </div>

        <div className="basicData flex items-center justify-center my-2">
          <Avatar className="w-[128px] h-[128px] transition-all duration-500 ease-in-out transform hover:scale-110">
            <AvatarImage src={props.image.src} />
            <AvatarFallback>{props.image.fallback}</AvatarFallback>
          </Avatar>
        </div>
      </Card>
    </div>
  );
}

export default LawyerInfoCard;
