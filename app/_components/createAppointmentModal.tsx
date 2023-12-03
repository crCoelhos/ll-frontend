import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Calendar } from "@/components/ui/calendar";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";

import moment from "moment";
import { eachHourOfInterval, set, format, isWithinInterval } from "date-fns";

import axios from "axios";

interface Workspace {
  id: number;
  name: string;
  description: string;
  capacity: number;
  workspaceTypeId: number;
  createdAt: string;
  updatedAt: string | "";
}

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

interface Appointments {
  appointments: Appointment[];
}

export function CreateAppointmentModal() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [horasFormatadas, setHorasFormatadas] = useState<string[]>([]);
  const [formattedTimes, setFormattedTimes] = useState<
    Array<{ start: string; end: string }>
  >([]);

  const [selectedHourColor, setSelectedHourColor] = useState<string>("");

  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState<
    string | undefined
  >(undefined);

  const user_key = sessionStorage.getItem("user_key");

  const fomatedDate = moment(date).format("YYYY-MM-DD");

  const handleModalOppening = () => {
    const fetchWorkspaceData = async () => {
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
        setWorkspaces(Object.values(response.data));
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWorkspaceData();
  };

  const handleButtonClick = () => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get<Appointments>(
          `http://localhost:3030/v1/workspace-appointment/${selectedWorkspaceId}/${fomatedDate}`,
          {
            headers: {
              Access: "123",
              Authorization: user_key,
            },
          }
        );


        const formattedTimes = response.data.appointments.map((appointment) => {
          const startHour = new Date(appointment.startDate).getHours();
          const startMinutes = new Date(appointment.startDate).getMinutes();
          const endHour = new Date(appointment.endDate).getHours();
          const endMinutes = new Date(appointment.endDate).getMinutes();

          return {
            start: `${startHour}:${
              startMinutes < 10 ? "0" : ""
            }${startMinutes}`,
            end: `${endHour}:${endMinutes < 10 ? "0" : ""}${endMinutes}`,
          };
        });

        setFormattedTimes(formattedTimes);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  };

  useEffect(() => {
    setFormattedTimes([]); //refresh das salas
    handleButtonClick(); 
  }, [selectedWorkspaceId]);

  useEffect(() => {
    const atualizarHoras = () => {
      const inicioComercial = set(new Date(), {
        hours: 9,
        minutes: 0,
        seconds: 0,
      });
      const fimComercial = set(new Date(), {
        hours: 18,
        minutes: 0,
        seconds: 0,
      });

      const horasComerciais = eachHourOfInterval({
        start: inicioComercial,
        end: fimComercial,
      });
      const horasFormatadas = horasComerciais.map((hora) =>
        format(hora, "HH:mm")
      );

      setHorasFormatadas(horasFormatadas);
    };

    atualizarHoras();
  }, [date, setHorasFormatadas]);

  const isWithinInterval = (
    time: string,
    start: string,
    end: string
  ): boolean => {
    const currentTime = moment(time);
    const startTime = moment(start);
    const endTime = moment(end);

    return (
      currentTime.isBetween(startTime, endTime) || currentTime.isSame(startTime)
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild onClick={handleModalOppening}>
        <Button variant="outline">Agendar sala</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Agendar Sala</DialogTitle>
          <DialogDescription>
            Escolha a sala e a data de agendamento.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Select onValueChange={(value) => setSelectedWorkspaceId(value)}>
            <SelectTrigger className="w-[100%]">
              <SelectValue placeholder="Selecione uma sala" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Salas</SelectLabel>
                {workspaces &&
                  workspaces.map((workspace) => (
                    <SelectItem
                      key={workspace.id}
                      value={workspace.id.toString()}
                    >
                      {workspace.name}
                    </SelectItem>
                  ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border shadow"
          />
        </div>
        <DialogFooter>
          <Button onClick={handleButtonClick}>Verificar</Button>
        </DialogFooter>

        <Select>
          <SelectTrigger className="w-[100%]">
            <SelectValue placeholder="Selecione uma hora" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Horas</SelectLabel>
              {horasFormatadas.map((hora) => {
                const [horaAtual, minutosAtual] = hora.split(":").map(Number);

                const isRed = formattedTimes.some((interval) => {
                  const [inicio, fim] = interval.start.split(":").map(Number);

                  return (
                    (horaAtual === inicio && minutosAtual >= 0) ||
                    (horaAtual === fim && minutosAtual <= 59) ||
                    (horaAtual > inicio && horaAtual < fim)
                  );
                });

                return (
                  <SelectItem
                    key={hora}
                    value={hora}
                    className={isRed ? "text-red-500" : ""}
                    disabled={isRed}
                  >
                    {hora}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>

        <DialogFooter>
          <Button onClick={handleButtonClick}>Agendar</Button>
          <Button variant="destructive">Cancelar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
