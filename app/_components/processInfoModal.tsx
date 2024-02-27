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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

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
  processTitle: string;
}

export function ProcessInfoModal(props: ProcessInfoModalProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [processResponse, setProcessResponse] = useState<ProcessResponse[]>([]);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const currentResponse = processResponse[currentIndex];

  const authData = useAppSelector((state) => state.auth);

  async function fetchProcessInfo(processNumber: string) {
    try {
      const response = await axios.get<ProcessResponse[]>(
        process.env.NEXT_PUBLIC_API_URL + `api/dados/${processNumber}`,
        {
          headers: {
            Access: process.env.NEXT_PUBLIC_ACCESS_KEY,
            Authorization: authData.token,
          },
        }
      );

      setProcessResponse(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };


  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            onClick={() => fetchProcessInfo(props.processNumber)}
          >
            {props.processTitle}
          </Button>
        </DialogTrigger>
        <DialogContent className="min-w-[712px]">
          <DialogHeader>
            <DialogTitle>
              Citado na página:{" "}
              {isLoading ? <Spinner /> : currentResponse?.page?.number}
            </DialogTitle>
            <DialogDescription className="p-3">
              {isLoading ? (
                <Spinner />
              ) : (
                <span className="w-[512px]">
                  {currentResponse?.page?.content
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
          <Pagination className="max-w-[448px]">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  className={
                    currentIndex === 0 ? "cursor-not-allowed" : "cursor-pointer"
                  }
                  aria-disabled={currentIndex === 0}
                  onClick={currentIndex === 1 ? handlePrevious : undefined}
                />
              </PaginationItem>
              {processResponse.map((_, index) => (
                <PaginationItem key={index} className="cursor-pointer">
                  <PaginationLink
                    onClick={() => setCurrentIndex(index)}
                    isActive={currentIndex === processResponse.length - 1}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  className={
                    currentIndex === processResponse.length - 1
                      ? "cursor-not-allowed"
                      : "cursor-pointer"
                  }
                  aria-disabled={currentIndex === processResponse.length - 1}
                  onClick={
                    currentIndex !== processResponse.length - 1
                      ? handleNext
                      : undefined
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </DialogContent>
      </Dialog>
    </>
  );
}
