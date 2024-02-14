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
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../store";
import { User } from "../types/user.interface";
import { LawyerProcess } from "../types/laywerProcesses.interface";
import { Lawyer } from "../types/lawyer.interface";
import { Separator } from "@radix-ui/react-separator";
import ProfileLawyerInfo from "./profileLawyerInfo";
import { Label } from "flowbite-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Cross1Icon, Pencil1Icon } from "@radix-ui/react-icons";

export interface ProfileUserInfoProps {
  user: User;
}

const ProfileUserInfo = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userData, setUserData] = useState<User>();
  const [isEditing, setIsEditing] = useState<boolean>(false);

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

    fetchUserData();
  }, []);

  console.log("userData: ", userData);

  return (
    <div className="grid grid-rows">
      <Card className="w-[512px] h-[auto]">
        <CardHeader className="grid grid-cols-2">
          <CardTitle className="flex items-center justify-center">
            {userData?.user?.name}
          </CardTitle>

          <Button
            onClick={() => setIsEditing(!isEditing)}
            className={
              isEditing
                ? `w-12 bg-green-600 hover:bg-green-500 transition-colors duration-300 `
                : `w-12 bg-red-600 hover:bg-red-500 transition-colors duration-300 `
            }
          >
            {isEditing ? <Pencil1Icon /> : <Cross1Icon />}
          </Button>
        </CardHeader>
        <CardContent className="grid gap-4">
          <CardDescription>
            <Label>CPF: </Label>
            <Input value={userData?.user?.CPF} disabled={isEditing}></Input>
          </CardDescription>

          <p className="text-base text-muted-foreground">
            Usuário ativo?{" "}
            <Input
              value={userData?.user?.isActive == true ? "Sim" : "Não"}
              disabled={isEditing}
            ></Input>
          </p>
        </CardContent>
      </Card>
      {authData?.roleId === 3 ? (
        <ProfileLawyerInfo
          OAB={userData?.OAB}
          riteDate={userData?.riteDate}
          secNumber={userData?.secNumber}
          inscriptionType={userData?.inscriptionType}
          description={userData?.description}
          elaboratedDescription={userData?.elaboratedDescription}
          professionalDescription={userData?.professionalDescription}
          graduateDegree={userData?.graduateDegree}
          expertises={userData?.expertises || []}
          UF={userData?.UF}
          callmeReason={""}
          isEditing={isEditing}
        />
      ) : null}
    </div>
  );
};

export default ProfileUserInfo;
