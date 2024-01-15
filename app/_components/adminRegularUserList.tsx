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

interface Appointment {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  description: string;
  workspaceId: number;
  appointmentStatusId: number;
  createdAt: string;
  updatedAt: string | "";
}

interface Workspace {
  id: number;
  name: string;
  description: string;
  capacity: number;
  workspaceTypeId: number;
  createdAt: string;
  updatedAt: string | "";
}

const AdminWorkspaceList = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);

  const [focusedButtons, setFocusedButtons] = useState<{
    [key: number]: boolean;
  }>({});

  const authData = useAppSelector((state) => state.auth);

  const router = useRouter();

  const workspaceColors: Record<number, string> = {
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
        const response = await axios.get(
          "http://localhost:3030/v1/all-workspaces/",
          {
            headers: {
              Access: "123",
              Authorization: authData.token,
            },
          }
        );
        setWorkspaces(response.data);

        setIsLoading(true);
        const appointmentResponse = await axios.get(
          "http://localhost:3030/v1/appointments/all",
          {
            headers: {
              Access: "123",
              Authorization: authData.token,
            },
          }
        );
        setAppointments(appointmentResponse.data.appointments);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const eventArray = appointments.map((appointment) => ({
    id: appointment.id.toString(),
    title: appointment.title,
    start: new Date(appointment.startDate),
    end: new Date(appointment.endDate),
    borderColor: workspaceColors[appointment.workspaceId],
    backgroundColor: workspaceColors[appointment.workspaceId],
  }));

  const handleWorkspaceClick = (workspaceInfo: number) => {
    router.push(`/administrador/workspaces/${workspaceInfo}`);
  };

  const handleWorkspaceEditClick = (workspaceInfo: number) => {
    const url = `/administrador/workspaces/${workspaceInfo}`;

    useEffect(() => {
      const fetchData = async () => {
        try {
          setIsLoading(true);

          setIsLoading(true);
          const appointmentResponse = await axios.get(url, {
            headers: {
              Access: "123",
              Authorization: authData.token,
            },
          });
          setAppointments(appointmentResponse.data.appointments);

          const workspaceResponse = await axios.get(
            "http://localhost:3030/v1/all-workspaces/",
            {
              headers: {
                Access: "123",
                Authorization: authData.token,
              },
            }
          );
          setWorkspaces(workspaceResponse.data);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();
    }, []);
  };

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
                <TableHead className="w-[100px]">Id do workspace</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Descrição do workspace</TableHead>
                <TableHead>Capacidade</TableHead>
                <TableHead>Tipo do workspace</TableHead>
                <TableHead>Criado em</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {workspaces.map((workspace) => (
                <TableRow key={workspace.id}>
                  <TableCell>{workspace.id}</TableCell>
                  <TableCell>{workspace.name}</TableCell>
                  <TableCell>{workspace.description}</TableCell>
                  <TableCell>{workspace.capacity}</TableCell>
                  <TableCell>{workspace.workspaceTypeId}</TableCell>
                  <TableCell>
                    {format(new Date(workspace.createdAt), "dd/MM/yyyy")}
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
                          onClick={() => handleWorkspaceClick(workspace.id)}
                        >
                          Visualizar sala
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="my-2" />
                        <DropdownMenuItem
                          onClick={() => console.log("Visualizar sala")}
                          className="bg-red-400  text-white"
                        >
                          Desativar sala
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="my-2" />
                        <DropdownMenuItem
                          className="bg-red-700  text-white"
                          onClick={() => console.log("Excluir sala")}
                        >
                          Excluir sala
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
