"use client";

import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Switch } from "@radix-ui/react-switch";
import axios from "axios";
import { Card } from "flowbite-react";
import { BellIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../store";
import { User } from "../types/user.interface";

const Profile = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userData, setUserData] = useState<User>();

  const authData = useAppSelector((state) => state.auth);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`http://localhost:3030/v1/user/`, {
          headers: {
            Access: 123,
            Authorization: authData.token,
          },
        });
        setUserData(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <main className="flex justify-center pt-24">
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
    </main>
  );
};

export default Profile;
