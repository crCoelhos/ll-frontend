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
import { useParams } from "next/navigation";

import moment from "moment";
import { eachHourOfInterval, set, format, isWithinInterval } from "date-fns";

import axios from "axios";
import { formatDate } from "@fullcalendar/core/index.js";
import { BookAppointmentModal } from "./bookAppointmentModal";

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
  const [selectedHour, setSelectedHour] = useState<string>();
  const [formattedTimes, setFormattedTimes] = useState<
    Array<{ start: string; end: string }>
  >([]);

  const [selectedHourColor, setSelectedHourColor] = useState<string>("");

  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [newAppointment, setNewAppointment] = useState();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState<
    string | undefined
  >(undefined);
  const [selectedWorkspaceIdFromParam, setSelectedWorkspaceIdFromParam] =
    useState<string | undefined>(undefined);

  const user_key =
    typeof window !== "undefined" ? localStorage.getItem("user_key") : null;

  const fomatedDate = moment(date).format("YYYY-MM-DD");

  const params = useParams();

  useEffect(() => {
    if (params.workspaceId) {
      setSelectedWorkspaceIdFromParam(params.workspaceId[0] as string);
    }
  }, [params.workspaceId]);


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

  const handleBookButtonClick = () => {
    let appointmentsData = {
      startDate: `${date}T` + `${selectedHour}:00.000Z`,
      endDate: "",
      isPrivate: false,
      description: "teste",
      workspaceId: selectedWorkspaceId,
    };

    // setNewAppointment();
  };

  const handleSendBooking = async () => { };

  const handleCheckButtonClick = () => {
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
            start: `${startHour}:${startMinutes < 10 ? "0" : ""
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

    console.log(selectedHour);
    fetchData();
  };

  useEffect(() => {
    setFormattedTimes([]);
    handleCheckButtonClick();
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
      <DialogTrigger asChild onClick={handleModalOppening} className="m-8 w-32 h-16 bg-black text-white">
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
          <Label>Sala</Label>
          <Select onValueChange={(value) => setSelectedWorkspaceId(value)}>
            <SelectTrigger className="w-[100%]">
              <SelectValue placeholder="Selecione uma sala" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Salas</SelectLabel>
                {selectedWorkspaceIdFromParam ? (
                  <SelectItem
                    key={selectedWorkspaceIdFromParam}
                    value={selectedWorkspaceIdFromParam}
                  >
                    {
                      workspaces.find(
                        (workspace) =>
                          workspace.id.toString() ===
                          selectedWorkspaceIdFromParam
                      )?.name
                    }
                  </SelectItem>
                ) : (
                  workspaces &&
                  workspaces.map((workspace) => (
                    <SelectItem
                      key={workspace.id}
                      value={workspace.id.toString()}
                    >
                      {workspace.name}
                    </SelectItem>
                  ))
                )}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Label>Data</Label>

          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          />

          {/* <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            disabled={(date) => date < new Date()}
            className="rounded-md border shadow"
          /> */}
        </div>
        <DialogFooter>
          <Button onClick={handleCheckButtonClick}>Verificar</Button>
        </DialogFooter>

        <Select onValueChange={(value) => setSelectedHour(value)}>
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

                  const [agendamentoHoraInicio, agendamentoMinutoInicio] =
                    interval.start.split(":").map(Number);

                  const [agendamentoHoraFim, agendamentoMinutoFim] =
                    interval.end.split(":").map(Number);

                  const isWithinRange =
                    (horaAtual > agendamentoHoraInicio ||
                      (horaAtual === agendamentoHoraInicio &&
                        minutosAtual >= agendamentoMinutoInicio)) &&
                    (horaAtual < agendamentoHoraFim ||
                      (horaAtual === agendamentoHoraFim &&
                        minutosAtual <= agendamentoMinutoFim));

                  return isWithinRange;
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
          {/* <Button onClick={handleBookButtonClick}>Agendar</Button> */}
          <BookAppointmentModal
            selectedDate={date?.toString()}
            selectedStartDate={selectedHour}
            selectedWorkspaceId={
              params.workspaceId && params.workspaceId[0]
                ? params.workspaceId[0]
                : selectedWorkspaceId
            }
            formattedTimes={formattedTimes}
          />
          <Button variant="destructive">Cancelar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
