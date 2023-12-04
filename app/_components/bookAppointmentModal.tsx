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

import { useEffect, useState } from "react";

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

interface BookAppointmentModalProps {
  selectedStartDate: string | undefined;
  selectedWorkspaceId: string | undefined;
  formattedTimes: Array<{ start: string; end: string }> | undefined;
}

export function BookAppointmentModal(props: BookAppointmentModalProps) {
  const [horasFormatadas, setHorasFormatadas] = useState<string[]>([]);
  const [selectedHour, setSelectedHour] = useState<string>("");
  const [selectedEndDate, setSelectedEndDate] = useState<string>("");

  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState<string>(
    props.selectedWorkspaceId || ""
  );
  const [selectedStartDate, setSelectedStartDate] = useState<string>(
    props.selectedStartDate || ""
  );
  const [formattedTimes, setFormattedTimes] = useState<
    Array<{ start: string; end: string }>
  >([]);

  useEffect(() => {
    console.log("Hora inicial recebida:", props.selectedStartDate);
    setSelectedStartDate(props.selectedStartDate || "");
  }, [props.selectedStartDate]);

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
            <Input id="title" value="title" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Descrição:
            </Label>
            <Input
              id="description"
              value="description"
              className="col-span-3"
            />
          </div>
        </div>

        <h1>Hora de inicio: {selectedStartDate}</h1>
        <Select onValueChange={(value) => setSelectedHour(value)}>
          <SelectTrigger className="w-[100%]">
            <SelectValue placeholder="Selecione uma hora final" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Hora de finalização</SelectLabel>
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
          <Button type="submit">Solicitar agendamento</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
