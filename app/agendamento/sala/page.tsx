"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import FullCalendar from "@/app/_components/fullCalendar";

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

interface Props {
  params: {
    [key: string]: string | undefined;
  };
}

const WorkspacePage: React.FC<Props> = ({ params }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const user_key = sessionStorage.getItem("user_key");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          "http://localhost:3030/v1/appointments/all",
          {
            headers: {
              Access: "123",
              Authorization: user_key,
            },
          }
        );
        setAppointments(response.data.appointments);

        console.log("leticia: ", response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const eventArray = appointments.map((appointment) => ({
    title: appointment.title,
    start: new Date(appointment.startDate),
    end: new Date(appointment.endDate),
  }));

  console.log(params);

  return (
    <div>
      <br />
      <h1>WorkspaceList Page</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {appointments.map((appointment) => (
            <li key={appointment.id}>
              <br />
              <Card className="w-[380px]">
                <CardHeader>
                  <CardTitle>{appointment.title}</CardTitle>
                  <CardDescription>Sala</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className=" flex items-center space-x-4 rounded-md border p-4">
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Numero da sala: {appointment.workspaceId}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Descrição: {appointment.description}
                      </p>
                    </div>
                  </div>
                  <div></div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full"> Calendário de agendamento</Button>
                </CardFooter>
              </Card>
            </li>
          ))}
        </ul>
      )}
      <br />
      <br />
      <FullCalendar events={eventArray} />;
    </div>
  );
};

export default WorkspacePage;
