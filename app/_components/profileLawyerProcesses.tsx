"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import axios from "axios";
import { BellIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../store";
import { User } from "../types/user.interface";
import { LawyerProcess } from "../types/laywerProcesses.interface";
import { Lawyer } from "../types/lawyer.interface";
import { number } from "zod";
import { ProcessInfoModal } from "../_components/processInfoModal";
import { Button } from "@/components/ui/button";
import { DESTRUCTION } from "dns";
import { NewProcessModal } from "../_components/newProcessModal";
import { ProcessResponse } from "../types/processResponse.interface";

interface ProfileLawyerProcessesProps {
  user: User;
  lawyer: Lawyer;
  processes: LawyerProcess[];
}

const ProfileLawyerProcesses = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userData, setUserData] = useState<ProfileLawyerProcessesProps>();
  const [userLawyerData, setUserLawyerData] = useState<Lawyer>();
  const [userProcesses, setUserProcesses] = useState<LawyerProcess[]>();
  const [processResponse, setProcessResponse] = useState<ProcessResponse[]>();

  const authData = useAppSelector((state) => state.auth);

  useEffect(() => {
    const fetchUserProcessesData = async () => {
      try {
        setIsLoading(true);
        const userProcessesResponse = await axios.get(
          process.env.NEXT_PUBLIC_API_URL + `v1/lawyer-process/all`,
          {
            headers: {
              Access: 123,
              Authorization: authData.token,
            },
          }
        );
        setUserProcesses(userProcessesResponse.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserProcessesData();
  }, []);


  return (
    <main className="flex justify-center pt-24 gap-2">
      <Card className="w-[512px]">
        <CardHeader>
          <CardTitle>processos acompanhados:</CardTitle>
          <CardDescription>
            <span>{userData?.processes?.length ?? " Nenhum"}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {userProcesses?.map((process) => (
            <ProcessInfoModal
              processNumber={process.processNumber}
              processTitle={process.processTitle}
            />
          ))}
        </CardContent>
        <CardFooter>
          <NewProcessModal />
        </CardFooter>
      </Card>
    </main>
  );
};

export default ProfileLawyerProcesses;
