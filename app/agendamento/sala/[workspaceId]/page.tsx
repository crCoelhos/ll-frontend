"use client";

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

  const singleEvent = {
    title: appointment?.title ?? "",
    start: new Date(appointment ? new Date(appointment.startDate) : new Date()),
    end: appointment ? new Date(appointment.endDate) : new Date(),
    backgroundColor: "red",
  };


  const params = useParams();

  const user_key = sessionStorage.getItem("user_key");
  console.log("jorgim: ", user_key);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `http://localhost:3030/v1/appointment/${params.workspaceId}`,
          {
            headers: {
              Access: 123,
              Authorization: user_key,
            },
          }
        );
        setAppointment(response.data.appointment);

        console.log("Paulo: ", response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Card className="w-[380px]">
        {appointment && (
          <>
            <CardHeader>
              <CardTitle>{appointment.title}</CardTitle>
              <CardDescription>{appointment.description}</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex items-center space-x-4 rounded-md border p-4">
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Sala: {appointment.workspaceId}
                  </p>

                  <p className="text-sm font-medium leading-none">
                    De: {appointment.startDate}
                  </p>
                  <p className="text-sm font-medium leading-none">
                    Até: {appointment.endDate}
                  </p>
                </div>
              </div>
              <div></div>
            </CardContent>
            <CardFooter>
              <p className="text-sm font-medium leading-none">
                Por: {appointment.userId}
              </p>
            </CardFooter>
          </>
        )}
      </Card>

      <div className="w-300px">
        <FullCalendar events={singleEvent} />;
      </div>
    </>
  );
}
