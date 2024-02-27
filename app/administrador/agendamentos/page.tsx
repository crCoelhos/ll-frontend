"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
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

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Separator } from "@/components/ui/separator";
import FullCalendar from "@/app/_components/fullCalendar";
import { useAppSelector } from "@/app/store";
import { Appointment } from "@/app/types/appointment.interface";
import { Workspace } from "@/app/types/workspace.interface";
import { AppointmentStatus } from "@/app/types/appointmentStatus.interface";
import { User } from "@/app/types/user.interface";

const AdminAppoinemtnsPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [appointmentStatus, setAppointmentStatus] = useState<
    AppointmentStatus[]
  >([]);

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
        const workspaceResponse = await axios.get(
          process.env.NEXT_PUBLIC_API_URL + "workspaces/",
          {
            headers: {
              Access: process.env.NEXT_PUBLIC_ACCESS_KEY,
              Authorization: authData.token,
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
          process.env.NEXT_PUBLIC_API_URL + "appointments/all",
          {
            headers: {
              Access: process.env.NEXT_PUBLIC_ACCESS_KEY,
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

    const fetchUserData = async () => {
      try {
        const userResponse = await axios.get(
          process.env.NEXT_PUBLIC_API_URL + "users/",
          {
            headers: {
              Access: process.env.NEXT_PUBLIC_ACCESS_KEY,
              Authorization: authData.token,
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

    const fetchAppointmentStatusData = async () => {
      try {
        const appointmentStatusResponse = await axios.get(
          process.env.NEXT_PUBLIC_API_URL + "appointment-statuses/all",
          {
            headers: {
              Access: process.env.NEXT_PUBLIC_ACCESS_KEY,
              Authorization: authData.token,
            },
          }
        );
        setAppointmentStatus(appointmentStatusResponse.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    fetchAppointmentStatusData();
    fetchAppointmentData();
    fetchUserData();
  }, []);

  const eventArray = appointments.map((appointment) => ({
    id: appointment.id.toString(),
    title: appointment.title,
    start: new Date(appointment.startDate),
    end: new Date(appointment.endDate),
    borderColor: workspaceColors[appointment.workspaceId],
    backgroundColor: workspaceColors[appointment.workspaceId],
  }));

  const handleAppointmentClick = (workspaceInfo: number) => {
    router.push(`/administrador/agendamentos/${workspaceInfo}`);
  };

  const handleAppointmentConfirmationClick = (workspaceInfo: number) => {
    const updateData = async () => {
      try {
        setIsLoading(true);
        const appointmentResponse = await axios.put(
          process.env.NEXT_PUBLIC_API_URL +
            `confirm-appointment/${workspaceInfo}`,
          {},
          {
            headers: {
              Access: process.env.NEXT_PUBLIC_ACCESS_KEY,
              Authorization: authData.token,
            },
          }
        );
        fetchData();
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
        router.push("/administrador/agendamentos");
      }
    };
    updateData();
  };

  const handleAppointmentCancelationClick = (workspaceInfo: number) => {
    const updateData = async () => {
      try {
        const appointmentResponse = await axios.put(
          process.env.NEXT_PUBLIC_API_URL +
            `cancel-appointment/${workspaceInfo}`,
          {},
          {
            headers: {
              Access: process.env.NEXT_PUBLIC_ACCESS_KEY,
              Authorization: authData.token,
            },
          }
        );
        fetchData();
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    updateData();
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const workspaceResponse = await axios.get(
        process.env.NEXT_PUBLIC_API_URL + "workspaces/",
        {
          headers: {
            Access: process.env.NEXT_PUBLIC_ACCESS_KEY,
            Authorization: authData.token,
          },
        }
      );
      setWorkspaces(workspaceResponse.data);

      const appointmentResponse = await axios.get(
        process.env.NEXT_PUBLIC_API_URL + "appointments/all",
        {
          headers: {
            Access: process.env.NEXT_PUBLIC_ACCESS_KEY,
            Authorization: authData.token,
          },
        }
      );
      setAppointments(appointmentResponse.data.appointments);

      const userResponse = await axios.get(
        process.env.NEXT_PUBLIC_API_URL + "users/",
        {
          headers: {
            Access: process.env.NEXT_PUBLIC_ACCESS_KEY,
            Authorization: authData.token,
          },
        }
      );
      setUsers(userResponse.data);

      const appointmentStatusResponse = await axios.get(
        process.env.NEXT_PUBLIC_API_URL + "appointment-statuses/all",
        {
          headers: {
            Access: process.env.NEXT_PUBLIC_ACCESS_KEY,
            Authorization: authData.token,
          },
        }
      );
      setAppointmentStatus(appointmentStatusResponse.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getUserIdToNameMap = () => {
    const userIdToNameMap: Record<number, string> = {};

    users.forEach((user) => {
      userIdToNameMap[user.id] = user.name;
    });

    return userIdToNameMap;
  };

  const getAppointmentStatusIdToAppointmentStatusMap = () => {
    const appointmentStatusIdToAppointmentStatusMap: Record<number, string> =
      {};

    appointmentStatus.forEach((status) => {
      appointmentStatusIdToAppointmentStatusMap[status.id] = status.name;
    });

    return appointmentStatusIdToAppointmentStatusMap;
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
          <Separator className="my-12 h-4" />

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
                <TableHead>Status</TableHead>
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
                    {/* #TODO mapear a cor sala igual nos card/callendar event */}
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
                  <TableCell>
                    {/* #TODO adicionar e mapear a cor da badge */}

                    {
                      getAppointmentStatusIdToAppointmentStatusMap()[
                        appointment.appointmentStatusId
                      ]
                    }
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

                        <DropdownMenuItem>Editar</DropdownMenuItem>

                        <DropdownMenuItem
                          onClick={() => handleAppointmentClick(appointment.id)}
                        >
                          Visualizar reserva
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="my-2 bg-black-500" />

                        <DropdownMenuItem
                          onClick={() =>
                            handleAppointmentConfirmationClick(appointment.id)
                          }
                          className="bg-blue-400  text-white"
                        >
                          Confirmar reserva
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          onClick={() => {
                            handleAppointmentCancelationClick(appointment.id);
                          }}
                          className="bg-red-400  text-white"
                        >
                          Canceler reserva
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="my-2" />
                        <DropdownMenuItem className="bg-red-700  text-white">
                          Excluir
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
      <Separator className="my-24 h-4" />
    </div>
  );
};

export default AdminAppoinemtnsPage;
