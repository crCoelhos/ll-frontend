"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Administrador = () => {
  const router = useRouter();

  const [focusedButtons, setFocusedButtons] = useState<{
    [key: string]: boolean;
  }>({});

  const handleWorkspaceRouting = () => {
    router.push(`/administrador/workspaces`);
  };
  const handleAppointmentRouting = () => {
    router.push(`/administrador/agendamentos`);
  };
  const handleUserRouting = () => {
    router.push(`/administrador/users`);
  };

  const handleButtonFocus = (cardId: string, isFocused: boolean) => {
    setFocusedButtons((prev) => ({
      ...prev,
      [cardId]: isFocused,
    }));
  };

  return (
    <div className="flex...">
      <div className="grid grid-cols-3 grid-rows-1 m-8 content-center">
        <Card
          className="w-[380px] text-white"
          onClick={handleWorkspaceRouting}
          onMouseEnter={() => handleButtonFocus("card1", true)}
          onMouseLeave={() => handleButtonFocus("card1", false)}
          style={{
            backgroundColor: "#AA4465",
            transition: "background-color 0.8s ease",
            filter: focusedButtons["card1"] ? "brightness(80%)" : "none",
            cursor: focusedButtons["card1"] ? "pointer" : "auto",
          }}
        >
          <CardHeader>
            <CardTitle>
              <div
                className="w-auto h-4 rounded-sm  mb-2"
                id="workspaceColorLabel"
              >
                Salas/workspaces
              </div>
            </CardTitle>
            <div
              className="w-auto h-1 rounded-sm"
              id="workspaceColorLabel"
              style={{
                backgroundColor: "#fff",
              }}
            ></div>
          </CardHeader>
          <CardContent className="grid gap-4">
            <p>Área de gestão das salas e ambientes de trabalho</p>
          </CardContent>
          <CardFooter>Área para administradores</CardFooter>
        </Card>

        <Card
          className="w-[380px] text-white"
          onClick={handleAppointmentRouting}
          onMouseEnter={() => handleButtonFocus("card2", true)}
          onMouseLeave={() => handleButtonFocus("card2", false)}
          style={{
            backgroundColor: "#462255",
            transition: "background-color 0.8s ease",
            filter: focusedButtons["card2"] ? "brightness(80%)" : "none",
            cursor: focusedButtons["card2"] ? "pointer" : "auto",
          }}
        >
          <CardHeader>
            <CardTitle>
              <div
                className="w-auto h-4 rounded-sm  mb-2"
                id="workspaceColorLabel"
              >
                Agendamentos/reservas
              </div>
            </CardTitle>

            <div
              className="w-auto h-1 rounded-sm"
              id="workspaceColorLabel"
              style={{
                backgroundColor: "#fff",
              }}
            ></div>
          </CardHeader>
          <CardContent className="grid gap-4">
            <p>Área de gestão das solicitações de agendamentos e reservas</p>
          </CardContent>
          <CardFooter>Área para administradores</CardFooter>
        </Card>

        <Card
          className="w-[380px] text-white"
          onClick={handleUserRouting}
          onMouseEnter={() => handleButtonFocus("card3", true)}
          onMouseLeave={() => handleButtonFocus("card3", false)}
          style={{
            backgroundColor: "#15616D",
            transition: "background-color 0.8s ease",
            filter: focusedButtons["card3"] ? "brightness(80%)" : "none",
            cursor: focusedButtons["card3"] ? "pointer" : "auto",
          }}
        >
          <CardHeader>
            <CardTitle>
              <div
                className="w-auto h-4 rounded-sm  mb-2"
                id="workspaceColorLabel"
              >
                Usuários
              </div>
            </CardTitle>

            <div
              className="w-auto h-1 rounded-sm"
              id="workspaceColorLabel"
              style={{
                backgroundColor: "#fff",
              }}
            ></div>
          </CardHeader>

          <CardContent className="grid gap-4">
            <p>Área de gestão das solicitações de pessoas</p>
          </CardContent>

          <CardFooter>Área para administradores</CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Administrador;
