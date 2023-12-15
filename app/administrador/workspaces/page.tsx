"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
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

const AdminWorkspacesPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);

  const [focusedButtons, setFocusedButtons] = useState<{
    [key: number]: boolean;
  }>({});

  const user_key =
    typeof window !== "undefined" ? sessionStorage.getItem("user_key") : null;

  console.log("user_key: ", user_key);
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
          "http://localhost:3030/v1/workspaces/",
          {
            headers: {
              Access: "123",
              Authorization: user_key,
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
              Authorization: user_key,
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
          const response = await axios.get(
            "http://localhost:3030/v1/workspaces/",
            {
              headers: {
                Access: "123",
                Authorization: user_key,
              },
            }
          );
          setWorkspaces(response.data);

          setIsLoading(true);
          const appointmentResponse = await axios.get(url, {
            headers: {
              Access: "123",
              Authorization: user_key,
            },
          });
          setAppointments(appointmentResponse.data.appointments);
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
                    <Button variant="outline" className="bg-sky-900 text-white">
                      Editar
                    </Button>
                    <Button
                      variant="ghost"
                      className="bg-yellow-700  text-white"
                      onClick={() => handleWorkspaceClick(workspace.id)}
                    >
                      Agenda
                    </Button>
                    <Button variant="ghost" className="bg-red-700  text-white">
                      Excluir
                    </Button>
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

export default AdminWorkspacesPage;