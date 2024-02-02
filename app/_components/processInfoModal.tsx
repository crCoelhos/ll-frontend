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
import {
  eachHourOfInterval,
  set,
  format,
  isWithinInterval,
  setDate,
} from "date-fns";

import { useEffect, useState } from "react";
import router, { useRouter, useParams } from "next/navigation";
import { useAppSelector } from "../store";
import { Appointments } from "../types/appointment.interface";
import { Lawyer } from "../types/lawyer.interface";
import { LawyerProcess } from "../types/laywerProcesses.interface";
import { User } from "../types/user.interface";
import { ProcessResponse } from "../types/processResponse.interface";
import { Spinner } from "flowbite-react";

interface ProcessInfoModalProps {
  processNumber: string;
}

export function ProcessInfoModal(props: ProcessInfoModalProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [processResponse, setProcessResponse] = useState<ProcessResponse>();

  const authData = useAppSelector((state) => state.auth);

  async function fetchProcessInfo(processNumber: string) {
    try {
      const response = await axios.get<ProcessResponse[]>(
        `http://localhost:3030/v1/api/dados/${processNumber}`,
        {
          headers: {
            Access: "123",
            Authorization: authData.token,
          },
        }
      );

      if (response.data.length > 0) {
        setProcessResponse(
          (prevResponses: ProcessResponse | undefined) => response.data[0]
        );
      } else {
        console.warn("Empty response array");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  console.log(processResponse);

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            onClick={() => fetchProcessInfo(props.processNumber)}
          >
            {props.processNumber}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[512px]">
          <DialogHeader>
            <DialogTitle>
              Citado na página:{" "}
              {isLoading ? <Spinner /> : processResponse?.page?.number}
            </DialogTitle>
            <DialogDescription>
              {isLoading ? (
                <Spinner />
              ) : (
                <span>
                  {processResponse?.page?.content
                    .split(new RegExp(`(${props.processNumber})`, "gi"))
                    .map((highlightedKeyword, index) =>
                      index % 2 === 0 ? (
                        <span key={index}>{highlightedKeyword}</span>
                      ) : (
                        <span
                          key={index}
                          className="bg-red-500 font-bold text-white"
                        >
                          {highlightedKeyword}
                        </span>
                      )
                    )}
                </span>
              )}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
