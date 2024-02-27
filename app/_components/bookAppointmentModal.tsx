import { Button } from "@/components/ui/button";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import SessionStorageManager from "../utils/sessionStorageManager";

import moment from "moment";
import { eachHourOfInterval, set, format, isWithinInterval } from "date-fns";

import { useEffect, useState } from "react";
import router, { useRouter, useParams } from "next/navigation";
import { useAppSelector } from "../store";
import { Appointments } from "../types/appointment.interface";

interface BookAppointmentModalProps {
  selectedDate: string | undefined;
  selectedStartDate: string | undefined;
  selectedWorkspaceId: string | undefined;
  formattedTimes: Array<{ start: string; end: string }> | undefined;
}

export function BookAppointmentModal(props: BookAppointmentModalProps) {
  const [startDate, setDate] = useState<string | undefined>(props.selectedDate);
  const [horasFormatadas, setHorasFormatadas] = useState<string[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [bookingDescription, setBookingDescription] = useState<string>("");
  const [bookingTitle, setBookingTitle] = useState<string>("");

  const [selectedHour, setSelectedHour] = useState<string>("");
  const [selectedEndDate, setSelectedEndDate] = useState<string>("");

  const formatedDate = moment(startDate).format("YYYY-MM-DD");

  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState<string>(
    props.selectedWorkspaceId || ""
  );
  const [selectedStartDateFromProps, setSelectedStartDate] = useState<string>(
    props.selectedStartDate || ""
  );
  const [formattedTimes, setFormattedTimes] = useState<
    Array<{ start: string; end: string }>
  >([]);

  const authData = useAppSelector((state) => state.auth);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get<Appointments>(
          process.env.NEXT_PUBLIC_API_URL + `v1/workspace-appointment/${selectedWorkspaceId}/${formatedDate}`,
          {
            headers: {
              Access: process.env.NEXT_PUBLIC_ACCESS_KEY,
              Authorization: authData.token,
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

    const atualizarHoras = () => {
      const inicioComercial = set(new Date(), {
        hours: 8,
        minutes: 0,
        seconds: 0,
      });
      const fimComercial = set(new Date(), {
        hours: 20,
        minutes: 0,
        seconds: 0,
      });

      const horasComerciais = eachHourOfInterval({
        start: inicioComercial,
        end: fimComercial,
      });

      const horasFormatadas = horasComerciais.map((hora) =>
        format(set(hora, { minutes: 59 }), "HH:mm")
      );

      setHorasFormatadas(horasFormatadas);
    };

    atualizarHoras();
  }, [startDate, setHorasFormatadas, props.selectedDate]);

  useEffect(() => {
    if (props.selectedDate !== startDate) {
      setDate(props.selectedDate);
    }
  }, [props.selectedDate]);

  async function submitBooking(e: React.SyntheticEvent) {
    const newBooking = {
      title: bookingTitle,
      description: bookingDescription,
      startDate: `${formatedDate}T${props.selectedStartDate}:00`,
      endDate: `${formatedDate}T${selectedHour}:00`,
      workspaceId: selectedWorkspaceId,
      isPrivate: false,
    };

    setIsLoading(true);
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + "v1/appointment/create",
        newBooking,
        {
          headers: {
            Access: 123,
            Authorization: authData.token,
          },
        }
      );

      window.location.reload();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Agendar</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Titulo:
            </Label>
            <Input
              id="title"
              value={bookingTitle}
              placeholder="Titulo do agendamento"
              className="col-span-3"
              onChange={(e) => {
                setBookingTitle(e.target.value);
              }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Descrição:
            </Label>
            <Input
              id="description"
              className="col-span-3"
              value={bookingDescription}
              placeholder="Descrição breve do agendamento"
              onChange={(e) => {
                setBookingDescription(e.target.value);
              }}
            />
          </div>
        </div>

        <h1>Hora de inicio: {props.selectedStartDate}</h1>
        <Select onValueChange={(value) => setSelectedHour(value)}>
          <SelectTrigger className="w-[100%]">
            <SelectValue placeholder="Hora final" />
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
          <Button onClick={submitBooking}>Solicitar agendamento</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
