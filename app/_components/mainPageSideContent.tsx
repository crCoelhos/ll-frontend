"use client";

import React, { useState } from "react";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Card } from "flowbite-react";

interface MainPageSideContentProps {
  title: string;
  description?: string;
  text: string;
  footer?: string;
  color: string | "primary" | "secondary" | "success" | "warning" | "danger";
}

const MainPageSideContent = (props: MainPageSideContentProps) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div>
      <Card
        className={
          props.color
            ? `border-${props.color}-400 w-[672px]  transition-all duration-500 ease-in-out transform hover:scale-105`
            : "w-[696px]"
        }
        color={props.color}
      >
        <CardHeader>
          <CardTitle className="text-center mb-3">{props.title}</CardTitle>
          <CardDescription className="text-justify">
            {props.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="">{props.text}</CardContent>
        <CardContent className="text-xs text-gray-400">
          {props.text}
        </CardContent>
      </Card>
    </div>
  );
};

export default MainPageSideContent;
