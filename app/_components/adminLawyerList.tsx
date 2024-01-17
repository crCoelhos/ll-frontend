"use client";
import { Button } from "@/components/ui/button";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { format } from "date-fns";
import { Badge } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import FullCalendar from "@/app/_components/fullCalendar";
import { useAppSelector } from "../store";
import { Lawyer } from "../types/lawyer.interface";

const AdminWorkspaceList = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [lawyers, setLawyers] = useState<Lawyer[]>([]);

  const [focusedButtons, setFocusedButtons] = useState<{
    [key: number]: boolean;
  }>({});

  const authData = useAppSelector((state) => state.auth);

  const router = useRouter();

  const lawyerColors: Record<number, string> = {
    1: "#AA4465",
    2: "#C69F89",
    3: "#15616D",
    4: "orange",
    5: "#462255",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const lawyersResponse = await axios.get(
          "http://localhost:3030/v1/lawyer/all",
          {
            headers: {
              Access: "123",
              Authorization: authData.token,
            },
          }
        );

        setLawyers(lawyersResponse.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log("resposta advogados: ", lawyers);

  return (
    <div className="flex...">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          <Table>
            <TableCaption>Lista de espaços de trabalho</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Id do advogado</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>OAB</TableHead>
                <TableHead>Apresentação</TableHead>
                <TableHead>Número de inscrição</TableHead>
                <TableHead>Especialidades</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lawyers?.map((lawyer) => (
                <TableRow key={lawyer.id}>
                  <TableCell>{lawyer.id}</TableCell>
                  <TableCell>{lawyer.user.name}</TableCell>
                  <TableCell>
                    {lawyer.UF}
                    {lawyer.OAB}
                  </TableCell>
                  <TableCell>
                    {format(new Date(lawyer.riteDate), "dd/MM/yyyy")}
                  </TableCell>
                  <TableCell>{lawyer.inscriptionType}</TableCell>
                  <TableCell>
                    {lawyer.expertises
                      ?.map((expertise) => expertise.name)
                      .join(", ") || "Nenhuma"}
                  </TableCell>
                  <TableCell className="text-right space-x-1">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <DotsHorizontalIcon className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                        <DropdownMenuSeparator />

                        <DropdownMenuItem
                        // onClick={() => handleWorkspaceClick(lawyer.id)}
                        // onClick={() => console.log(lawyer.id)}
                        >
                          Visualizar advogado
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="my-2" />
                        <DropdownMenuItem
                          onClick={() => console.log("confirmar sala")}
                          className="bg-red-400  text-white"
                        >
                          Desativar advogado
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="my-2" />
                        <DropdownMenuItem
                          className="bg-red-700  text-white"
                          onClick={() => console.log("excluir sala")}
                        >
                          Excluir advogado
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ul>
      )}
    </div>
  );
};

export default AdminWorkspaceList;
