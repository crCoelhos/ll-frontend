"use client";

import { CreateAppointmentModal } from "@/app/_components/createAppointmentModal";
import FullCalendar from "@/app/_components/fullCalendar";
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
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

import axios from "axios";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { format } from "date-fns";

interface Appointment {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  description: string;
  workspaceId: number;
  userId: number;
  isPrivate: boolean;
  appointmentStatusId: number;
  createdAt: string;
  updatedAt: string | "";
}

export default function WorkspaceAdminPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [appointment, setAppointment] = useState<Appointment>();
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const singleEvent = {
    title: appointment?.title ?? "",
    start: new Date(appointment ? new Date(appointment.startDate) : new Date()),
    end: appointment ? new Date(appointment.endDate) : new Date(),
    backgroundColor: "red",
  };

  const params = useParams();

  const user_key =
    typeof window !== "undefined" ? sessionStorage.getItem("user_key") : null;

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
          `http://localhost:3030/v1//workspace-appointment/${params.workspaceId}`,
          {
            headers: {
              Access: 123,
              Authorization: user_key,
            },
          }
        );
        setAppointments(response.data.appointments);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const convertedAppointments = appointments.map((appointment) => ({
    title: appointment.title,
    start: new Date(appointment.startDate),
    end: new Date(appointment.endDate),
    backgroundColor: "red",
  }));

  const eventArray = appointments.map((appointment) => ({
    id: appointment.id.toString(),
    title: appointment.title,
    start: new Date(appointment.startDate),
    end: new Date(appointment.endDate),
    borderColor: workspaceColors[appointment.workspaceId],
    backgroundColor: workspaceColors[appointment.workspaceId],
  }));

  return (
    <>
      <CreateAppointmentModal />
      <Table>
        <TableCaption>Lista de agendamentos</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id do agendamento</TableHead>
            <TableHead>Origem do agendamento</TableHead>
            <TableHead>Título</TableHead>
            <TableHead>Inicio</TableHead>
            <TableHead>Final</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Privado?</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appointments.map((appointment) => (
            <TableRow key={appointment.id}>
              <TableCell>{appointment.id}</TableCell>
              <TableCell>{appointment.userId}</TableCell>
              <TableCell>{appointment.title}</TableCell>
              <TableCell>
                {format(new Date(appointment.startDate), "HH:mm")} (
                {format(new Date(appointment.startDate), "dd/MM/yyyy")})
              </TableCell>
              <TableCell>
                {format(new Date(appointment.endDate), "HH:mm")} (
                {format(new Date(appointment.endDate), "dd/MM/yyyy")})
              </TableCell>
              <TableCell>
                {appointment.appointmentStatusId ? (
                  <>
                    <Badge className="bg-green-600">Ativo</Badge>
                  </>
                ) : (
                  <>
                    <Badge variant="destructive">Inativo</Badge>
                  </>
                  // isso aqui ta errado, não é boolean. é um numero que representa o status do agendamento (1, 2, 3, 4) e cada numero representa um status. Refazer isso aqui
                )}
              </TableCell>
              <TableCell>
                {appointment.isPrivate ? (
                  <>
                    <Badge variant="destructive">Sim</Badge>
                  </>
                ) : (
                  <>
                    <Badge className="bg-green-600">Não</Badge>
                  </>
                  // isso aqui ta errado, não é boolean. é um numero que representa o status do agendamento (1, 2, 3, 4) e cada numero representa um status. Refazer isso aqui
                )}
              </TableCell>
              <TableCell className="text-right space-x-1">
                <Button variant="outline" className="bg-sky-900 text-white">
                  Editar
                </Button>
                <Button variant="ghost" className="bg-yellow-700  text-white">
                  Cancelar
                </Button>
                <Button variant="ghost" className="bg-red-700  text-white">
                  Excluir
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <FullCalendar events={eventArray} />;
    </>
  );
}
