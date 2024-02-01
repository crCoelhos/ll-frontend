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

const Profile = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userData, setUserData] = useState<User>();
  const [userLawyerData, setUserLawyerData] = useState<Lawyer>();
  const [userProcesses, setUserProcesses] = useState<LawyerProcess[]>();

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
  }, [isLoading]);

  console.log("userProcesses", userProcesses);

  return (
    <main className="flex justify-center pt-24 gap-2">
      <Card className="w-[512px]">
        <CardHeader>
          <CardTitle>{userData?.name}</CardTitle>
          <CardDescription>
            CPF: <span>{userData?.CPF}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div>
            <div className="space-y-1">
              <p className="text-base text-muted-foreground">
                Data de nascimento: <span>{userData?.birthdate}</span>
              </p>
              <p className="text-base text-muted-foreground">
                Usuário ativo?{" "}
                <span>{userData?.isActive == true ? "Sim" : "Não"}</span>
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
      <Card className="w-[512px]">
        <CardHeader>
          <CardTitle></CardTitle>
          <CardDescription>
            <span>{userProcesses?.length}</span> processos:
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {userProcesses?.map((process) => (
            <Card className="w-[512px]">
              <CardHeader>
                <CardTitle>{process.processNumber}</CardTitle>
                <CardDescription></CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4"></CardContent>
              <CardFooter></CardFooter>
            </Card>
          ))}
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </main>
  );
};

export default Profile;
