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

import { useDispatch, useSelector } from "react-redux";
import { searchActions } from "../store/slices/search-slice";
import { RootState } from "../store";

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
  const handleLawyerRouting = () => {
    router.push(`/administrador/advogados`);
  };

  const handleButtonFocus = (cardId: string, isFocused: boolean) => {
    setFocusedButtons((prev) => ({
      ...prev,
      [cardId]: isFocused,
    }));
  };

  const dispatch = useDispatch();
  const searchString = useSelector(
    (state: RootState) => state.search.searchString
  );
  const handleTeste = () => {
  };

  return (
    <div className="flex...">
      <h1 className="pageTitle">Area de adminsitrador</h1>
      <Button
        onClick={() => {
          handleTeste();
        }}
      >
        testar
      </Button>
      <div className="grid grid-cols-3 gap-24 m-12 content-center">
        <Card
          className="w-[380px] text-white"
          onClick={handleWorkspaceRouting}
          onMouseEnter={() => handleButtonFocus("card1", true)}
          onMouseLeave={() => handleButtonFocus("card1", false)}
          style={{
            backgroundColor: "#AC7765",
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
            backgroundColor: "#AE4765",
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
          onClick={handleLawyerRouting}
          onMouseEnter={() => handleButtonFocus("card3", true)}
          onMouseLeave={() => handleButtonFocus("card3", false)}
          style={{
            backgroundColor: "#462255",
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
                Advogados
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
            <p>Área de gestão de advogados registrados</p>
          </CardContent>

          <CardFooter>Área para administradores</CardFooter>
        </Card>

        <Card
          className="w-[380px] text-white"
          onClick={handleUserRouting}
          onMouseEnter={() => handleButtonFocus("card4", true)}
          onMouseLeave={() => handleButtonFocus("card4", false)}
          style={{
            backgroundColor: "#15616D",
            transition: "background-color 0.8s ease",
            filter: focusedButtons["card4"] ? "brightness(80%)" : "none",
            cursor: focusedButtons["card4"] ? "pointer" : "auto",
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
            <p>Área para gestão de pessoas</p>
          </CardContent>
          <CardFooter>Área para administradores</CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Administrador;
