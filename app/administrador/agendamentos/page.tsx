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
  userId: number;
  workspaceId: number;
  title: string;
  startDate: string;
  endDate: string;
  description: string;
  appointmentStatusId: number;
  isPrivate: boolean;
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

interface User {
  id: number;
  name: string;
  email: string;
  CPF: string;
  birthdate: string;
  roleId: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const AdminAppoinemtnsPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [users, setUsers] = useState<User[]>([]);

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
        const workspaceResponse = await axios.get(
          "http://localhost:3030/v1/workspaces/",
          {
            headers: {
              Access: "123",
              Authorization: user_key,
            },
          }
        );
        setWorkspaces(workspaceResponse.data);

        setIsLoading(true);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchAppointmentData = async () => {
      try {
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
    const fetchUserData = async () => {
      try {
        const userResponse = await axios.get(
          "http://localhost:3030/v1/users/",
          {
            headers: {
              Access: "123",
              Authorization: user_key,
            },
          }
        );
        setUsers(userResponse.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    fetchAppointmentData();
    fetchUserData();
  }, []);

  console.log(users);

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

  const getUserIdToNameMap = () => {
    const userIdToNameMap: Record<number, string> = {};

    users.forEach((user) => {
      userIdToNameMap[user.id] = user.name;
    });

    return userIdToNameMap;
  };
  const getWorkspaceIdToNameMap = () => {
    const workspaceIdToNameMap: Record<number, string> = {};

    workspaces.forEach((workspace) => {
      workspaceIdToNameMap[workspace.id] = workspace.name;
    });

    return workspaceIdToNameMap;
  };
  
  return (
    <div className="flex...">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          <Table>
            <TableCaption>Lista de agendamentos e reservas</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Id do agendamento</TableHead>
                <TableHead>Titulo</TableHead>
                <TableHead>Descrição do workspace</TableHead>
                <TableHead>Sala</TableHead>
                <TableHead>Inicio</TableHead>
                <TableHead>Final</TableHead>
                <TableHead>Criado em</TableHead>
                <TableHead>Por</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell>{appointment.id}</TableCell>
                  <TableCell>{appointment.title}</TableCell>
                  <TableCell>{appointment.description}</TableCell>
                  <TableCell>
                    {getWorkspaceIdToNameMap()[appointment.workspaceId]}
                  </TableCell>

                  <TableCell>
                    {format(new Date(appointment.startDate), "HH:mm")}(
                    {format(new Date(appointment.startDate), "dd/MM/yyyy")})
                  </TableCell>
                  <TableCell>
                    {format(new Date(appointment.endDate), "HH:mm")}(
                    {format(new Date(appointment.endDate), "dd/MM/yyyy")})
                  </TableCell>
                  <TableCell>
                    {format(new Date(appointment.createdAt), "dd/MM/yyyy")}
                  </TableCell>
                  <TableCell>
                    {getUserIdToNameMap()[appointment.userId]}
                  </TableCell>

                  <TableCell className="text-right space-x-1">
                    <Button variant="outline" className="bg-sky-900 text-white">
                      Editar
                    </Button>
                    <Button
                      variant="ghost"
                      className="bg-yellow-700  text-white"
                      // onClick={() => handleWorkspaceClick(workspace.id)}
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

export default AdminAppoinemtnsPage;
