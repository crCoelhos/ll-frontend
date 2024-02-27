"use client";

import { CreateAppointmentModal } from "@/app/_components/createAppointmentModal";
import FullCalendar from "@/app/_components/fullCalendar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

import { cn } from "@/lib/utils";

import { BellIcon, CheckIcon, Cross2Icon } from "@radix-ui/react-icons";

import axios from "axios";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { format } from "date-fns";

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
import { Input } from "@/components/ui/input";
import { useAppSelector } from "@/app/store";
import { Appointment } from "@/app/types/appointment.interface";
import { AppointmentStatus } from "@/app/types/appointmentStatus.interface";
import { Workspace } from "@/app/types/workspace.interface";

export default function WorkspaceAdminPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [appointment, setAppointment] = useState<Appointment>();
  const [workspaceData, setWorkspaceData] = useState<Workspace>();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [appointmentStatus, setAppointmentStatus] = useState<
    AppointmentStatus[]
  >([]);

  const params = useParams();

  const authData = useAppSelector((state) => state.auth);

  const singleEvent = {
    title: appointment?.title ?? "",
    start: new Date(appointment ? new Date(appointment.startDate) : new Date()),
    end: appointment ? new Date(appointment.endDate) : new Date(),
    backgroundColor: "red",
  };

  const workspaceColors: Record<number, string> = {
    1: "#AA4465",
    2: "#C69F89",
    3: "#15616D",
    4: "orange",
    5: "#462255",
  };

  useEffect(() => {
    const fetchWorkspaceData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          process.env.NEXT_PUBLIC_API_URL + `v1/workspace/${params.workspaceId}`,
          {
            headers: {
              Access: 123,
              Authorization: authData.token,
            },
          }
        );
        setWorkspaceData(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          process.env.NEXT_PUBLIC_API_URL + `v1/workspace-appointment/${params.workspaceId}`,
          {
            headers: {
              Access: 123,
              Authorization: authData.token,
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

    const fetchAppointmentStatusData = async () => {
      try {
        const appointmentStatusResponse = await axios.get(
          process.env.NEXT_PUBLIC_API_URL + "v1/appointment-statuses/all",
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

    fetchWorkspaceData();
    fetchAppointmentStatusData();
    fetchData();
  }, []);

  const getAppointmentStatusIdToAppointmentStatusMap = () => {
    const appointmentStatusIdToAppointmentStatusMap: Record<number, string> =
      {};

    appointmentStatus.forEach((status) => {
      appointmentStatusIdToAppointmentStatusMap[status.id] = status.name;
    });

    return appointmentStatusIdToAppointmentStatusMap;
  };

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

  const handleChange = (field: keyof Workspace, value: string | number) => {
    setWorkspaceData((prevWorkspaceData) => {
      if (prevWorkspaceData) {
        return {
          ...prevWorkspaceData,
          [field]: value,
        };
      }
      return prevWorkspaceData;
    });
  };

  const handleChangeSwitch = (isChecked: boolean) => {
    setWorkspaceData((prevWorkspaceData) => {
      if (prevWorkspaceData) {
        return {
          ...prevWorkspaceData,
          isActive: isChecked,
        };
      }
      return prevWorkspaceData;
    });
  };

  return (
    <>
      <CreateAppointmentModal />
      {/* <CreateNewWorkspaceModal/> */}

      <div className="flex justify-center space-x-8 ">
        <Card className="w-[512px]">
          <CardHeader>
            <CardTitle>
              Nome da sala:
              <span>
                <Input
                  id="name"
                  value={workspaceData?.name}
                  placeholder="Nome da sala"
                  className="text-base col-span-3"
                  onChange={(e) => handleChange("name", e.target.value)}
                />
              </span>
            </CardTitle>
            <CardDescription>
              Descrição:{" "}
              <span>
                <Input
                  id="description"
                  value={workspaceData?.description}
                  placeholder="Descrição da sala"
                  className="text-base col-span-3"
                  onChange={(e) => handleChange("description", e.target.value)}
                />
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className=" flex items-center space-x-4 rounded-md border p-4">
              {workspaceData?.isActive == true ? <CheckIcon /> : <Cross2Icon />}
              <div className="flex-1 space-y-1">
                <p className="text-base font-medium leading-none">
                  Situação da sala:
                </p>
                <p className="text-base text-muted-foreground">
                  Torne a Sala ativa ou inativa
                </p>
              </div>
              <Switch checked={workspaceData?.isActive || false} />
            </div>

            <div>
              <div className="space-y-1">
                <p className="text-base text-muted-foreground">
                  Capacidade de pessoas na sala:{" "}
                  <span>
                    <Input
                      id="capacity"
                      value={workspaceData?.capacity.toString()}
                      placeholder="Capacidade da sala"
                      className="text-base col-span-3"
                      onChange={(e) => handleChange("capacity", e.target.value)}
                    />
                  </span>
                </p>
                <p className="text-base text-muted-foreground">
                  Tipo da sala:{" "}
                  <span>
                    {/* <Input
                      id="title"
                      value={workspaceData?.workspaceTypeId.toString()}
                      placeholder="Titulo do agendamento"
                      className="text-base col-span-3"
                      onChange={handleChange}
                    /> */}
                    <Input
                      id="capacity"
                      value={workspaceData?.workspaceTypeId.toString()}
                      placeholder="Capacidade da sala"
                      className="text-base col-span-3"
                      onChange={(e) =>
                        handleChange("workspaceTypeId", e.target.value)
                      }
                    />
                  </span>
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">
              <CheckIcon className="mr-2 h-4 w-4" /> Confirmar modificações
            </Button>
          </CardFooter>
        </Card>

        <Card className="w-[512px]">
          <CardHeader>
            <CardTitle>{workspaceData?.name}</CardTitle>
            <CardDescription>
              Descrição: <span>{workspaceData?.description}</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className=" flex items-center space-x-4 rounded-md border p-4">
              <BellIcon />
              <div className="flex-1 space-y-1">
                <p className="text-base font-medium leading-none">Sala ativa</p>
                <p className="text-base text-muted-foreground">
                  Torne a Sala ativa ou inativa
                </p>
              </div>
              <Switch />
            </div>

            <div>
              <div className="space-y-1">
                <p className="text-base text-muted-foreground">
                  Capacidade de pessoas na sala:{" "}
                  <span>{workspaceData?.capacity}</span>
                </p>
                <p className="text-base text-muted-foreground">
                  Tipo da sala: <span>{workspaceData?.workspaceTypeId}</span>
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      </div>

      <Separator className="my-24 h-4" />
    </>
  );
}
