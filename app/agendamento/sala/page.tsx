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
import { CreateAppointmentModal } from "@/app/_components/createAppointmentModal";
import { useRouter } from "next/navigation";

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

interface Props {
  params: {
    [key: string]: string | undefined;
  };
}

const WorkspacePage: React.FC<Props> = ({ params }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);

  const user_key = sessionStorage.getItem("user_key");
  const router = useRouter();

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
    title: appointment.title,
    start: new Date(appointment.startDate),
    end: new Date(appointment.endDate),
    backgroundColor: "red",
  }));

  const handleWorkspaceClick = (workspaceInfo: number) => {
    router.push(`/agendamento/sala/${workspaceInfo}`);
  };

  return (
    <div className="flex...">
      <br />
      <CreateAppointmentModal />
      <h1>WorkspaceList Page</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul className="grid grid-cols-3 grid-rows-1">
          {workspaces.map((workspace) => (
            <li key={workspace.id} className="max-w-[0px] mx-0">
              <br />
              <Card className="w-[380px]">
                <CardHeader>
                  <CardTitle>{workspace.name}</CardTitle>
                  <CardDescription>Sala</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className=" flex items-center space-x-4 rounded-md border p-4">
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Tipo: {workspace.workspaceTypeId}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Descrição: {workspace.description}
                      </p>
                    </div>
                  </div>
                  <div></div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    onClick={() => handleWorkspaceClick(workspace.id)}
                  >
                    Calendário de agendamento
                  </Button>
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
