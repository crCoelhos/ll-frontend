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

export interface ProfileProps {
  user: User;
  lawyer: Lawyer;
  processes: LawyerProcess[];
}

export interface processResponse {
  keyword: string;
  page: {
    number: number;
    content: string;
  };
}

const Profile = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userData, setUserData] = useState<ProfileProps>();
  const [userLawyerData, setUserLawyerData] = useState<Lawyer>();
  const [userProcesses, setUserProcesses] = useState<LawyerProcess[]>();
  const [processResponse, setProcessResponse] = useState<processResponse[]>();

  const authData = useAppSelector((state) => state.auth);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const userFetchResponse = await axios.get(
          `http://localhost:3030/v1/user/`,
          {
            headers: {
              Access: 123,
              Authorization: authData.token,
            },
          }
        );
        setUserData(userFetchResponse.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchUserProcessesData = async () => {
      try {
        setIsLoading(true);
        const userProcessesResponse = await axios.get(
          `http://localhost:3030/v1/lawyer-process/all`,
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

    fetchUserData();
    fetchUserProcessesData();
  }, []);

  console.log("user", userData);

  // function handleProcessSearch(processNumber: string) {
  //   return async () => {
  //     try {
  //       setIsLoading(true);
  //       const processResponse = await axios.get(
  //         `http://localhost:3030/v1/api/dados/${processNumber}`,
  //         {
  //           headers: {
  //             Access: 123,
  //             Authorization: authData.token,
  //           },
  //         }
  //       );

  //       console.log(processResponse.data);
  //     } catch (error) {
  //       console.error(error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  // }

  return (
    <main className="flex justify-center pt-24 gap-2">
      <Card className="w-[512px] h-[256px]">
        <CardHeader>
          <CardTitle>{userData?.user.name}</CardTitle>
          <CardDescription>
            CPF: <span>{userData?.user.CPF}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div>
            <div className="space-y-1">
              <p className="text-base text-muted-foreground">
                Data de nascimento: <span>{userData?.user.birthdate}</span>
              </p>
              <p className="text-base text-muted-foreground">
                Usuário ativo?{" "}
                <span>{userData?.user.isActive == true ? "Sim" : "Não"}</span>
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
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

export default Profile;
