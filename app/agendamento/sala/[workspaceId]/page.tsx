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
  appointmentStatusId: number;
  createdAt: string;
  updatedAt: string | "";
}

export default function WorkspacePage() {
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
    typeof window !== "undefined" ? localStorage.getItem("user_key") : null;

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

  return (
    <>
      <CreateAppointmentModal />
      <div className="grid grid-cols-3 grid-rows-1">
        {appointments.map((appointment) => (
          <Card key={appointment.id} className="m-2">
            <CardHeader>
              <CardTitle>{appointment.title}</CardTitle>
              <CardDescription>{appointment.description}</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex items-center space-x-4 w-96 rounded-md border p-4 bg-slate-800 text-white">
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Sala: {appointment.workspaceId}
                  </p>

                  <p className="text-sm font-medium leading-none">
                    Dia: {format(new Date(appointment.startDate), "dd/MM/yyyy")}{" "}
                    de {format(new Date(appointment.startDate), "HH:mm")} às{" "}
                    {format(new Date(appointment.endDate), "HH:mm")} (
                    {format(new Date(appointment.endDate), "dd/MM/yyyy")}){" "}
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-sm font-medium leading-none">
                Agendado por: {appointment.userId}
              </p>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="w-300px">
        <FullCalendar
          events={appointments.map((appointment) => ({
            id: appointment.id.toString(),
            title: appointment.title,
            start: new Date(appointment.startDate),
            end: new Date(appointment.endDate),
            appointmentStatusId: appointment.appointmentStatusId,
            borderColor: "",
            backgroundColor: "",
          }))}
        />
        ;
      </div>
    </>
  );
}
