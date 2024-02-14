import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";


import { useEffect, useState } from "react";
import { useAppSelector } from "../store";

interface NewProcessModalProps {}

export function NewProcessModal(props: NewProcessModalProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [newProcessToBeWatched, setNewProcessToBeWatched] =
    useState<string>("");
  const [newProcessTitle, setNewProcessTitle] = useState<string>("");
  const [open, setOpen] = useState(false);

  const authData = useAppSelector((state) => state.auth);

  async function handleNewProcess() {
    try {
      const response = await axios.post(
        `http://localhost:3030/v1/lawyer-process/watch/`,
        {
          processNumber: newProcessToBeWatched,
          processTitle: newProcessTitle,
        },
        {
          headers: {
            Access: "123",
            Authorization: authData.token,
          },
        }
      );
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      setOpen(false);
    }
  }

  console.log(newProcessToBeWatched);
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant={"ghost"}
            className="bg-green-700  hover:bg-green-400 text-white hover:text-white"
          >
            Cadastrar acompanhamento
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[640px]">
          <DialogHeader className="flex flex-col gap-3 text-center justify-center">
            <DialogTitle className=" text-center justify-center">
              Cadastrar novo acompanhamento
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className="flex flex-col ... gap-3">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="keyword" className="text-right">
                Palavra-chave:
              </Label>
              <Input
                id="keyword"
                placeholder="Ex1: 1001353-54.2023; Ex2: OAB: 3747/AC"
                className="col-span-3"
                onChange={(e) => {
                  setNewProcessToBeWatched(e.target.value);
                }}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Titulo:
              </Label>
              <Input
                id="title"
                className="col-span-3"
                placeholder="Ex: OAB-Diego"
                onChange={(e) => {
                  setNewProcessTitle(e.target.value);
                }}
              />
            </div>
          </DialogDescription>
          <Button onClick={() => handleNewProcess()}>Registrar</Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
