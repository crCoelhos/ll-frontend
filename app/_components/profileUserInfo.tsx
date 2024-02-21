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
import ProfileLawyerInfo from "./profileLawyerInfo";
import { Checkbox, Label } from "flowbite-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Cross1Icon, ImageIcon, Pencil1Icon } from "@radix-ui/react-icons";
import { Badge } from "@/components/ui/badge";
import { User } from "../types/user.interface";
import { CheckIcon, SaveAllIcon } from "lucide-react";
import format from "date-fns/format";

const ProfileUserInfo = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userData, setUserData] = useState<User>();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [form, setForm] = useState<User>({
    isActive: false,
    updatedAt: "",
    name: "",
    email: "",
    phoneNumber: "",
    id: "" as any,
    CPF: "",
    birthdate: "",
  });

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
        setForm({
          isActive: userFetchResponse.data?.user?.isActive || false,
          updatedAt: userFetchResponse.data?.updatedAt || "",
          name: userFetchResponse.data?.user?.name || "",
          email: userFetchResponse.data?.user?.email || "",
          phoneNumber: userFetchResponse.data?.user?.phoneNumber || "",
          id: userFetchResponse.data?.id || "",
          CPF: userFetchResponse.data?.user?.CPF || "",
          birthdate: userFetchResponse.data?.user?.birthdate || "",
        });
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [isLoading]);

  const handleEditSubmit = async () => {
    try {
      setIsLoading(true);

      const editedData = {
        name: form.name,
        email: form.email,
        phoneNumber: form.phoneNumber,
      };

      const userFetchResponse = await axios.put(
        `http://localhost:3030/v1/user/`,
        editedData,
        {
          headers: {
            Access: 123,
            Authorization: authData.token,
          },
        }
      );

      setUserData(userFetchResponse.data as User);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="grid grid-rows">
      <Card className="w-[512px] h-[auto]">
        <CardHeader className="grid grid-cols-4 gap-4">
          <CardTitle className="flex items-center justify-center col-span-3">
            <Input
              className="flex items-center justify-center text-2xl font-bold text-primary"
              id="name"
              value={form.name}
              onChange={(e) =>
                setForm((prevForm) => ({ ...prevForm, name: e.target.value }))
              }
              disabled={!isEditing}
            />
          </CardTitle>

          <div className="grid grid-cols-2">
            <Button
              onClick={() => setIsEditing(!isEditing)}
              className={
                isEditing
                  ? `w-12 bg-red-600 hover:bg-red-500 transition-colors duration-300 `
                  : `w-12 bg-green-600 hover:bg-green-500 transition-colors duration-300 `
              }
            >
              {isEditing ? <Cross1Icon /> : <Pencil1Icon />}
            </Button>
            {isEditing ? (
              <Button
                className="bg-blue-700 hover:bg-blue-500"
                onClick={() => handleEditSubmit()}
              >
                <CheckIcon />
              </Button>
            ) : null}
          </div>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2">
            <CardDescription>
              <Label htmlFor="CPF">
                CPF:
                <Input
                  value={userData?.user?.CPF || userData?.CPF || "UNDEFINED"}
                  id="CPF"
                  disabled
                />{" "}
              </Label>
            </CardDescription>
            <Label
              htmlFor="isActive"
              className="text-base text-muted-foreground flex items-center justify-center"
            >
              Usuário ativo?{" "}
              <Badge
                variant="outline"
                className={
                  userData?.user?.isActive
                    ? `bg-green-500 text-white`
                    : `bg-red-500 text-white`
                }
              >
                {userData?.user?.isActive == true
                  ? "Sim"
                  : "Não" || userData?.isActive || "UNDEFINED"}
              </Badge>
            </Label>
          </div>
          <Label htmlFor="email">
            Email:
            <Input
              value={form.email}
              id="email"
              onChange={(e) =>
                setForm((prevForm) => ({ ...prevForm, email: e.target.value }))
              }
              disabled={!isEditing}
            />
          </Label>
          <Label htmlFor="email">
            Data de nascimento:
            <Input
              value={
                userData?.user?.birthdate || userData?.birthdate || "UNDEFINED"
              }
              id="email"
              disabled={!isEditing}
            />
          </Label>
          <Label htmlFor="phoneNumber">
            Fone:
            <Input
              value={
                userData?.user?.phoneNumber ||
                userData?.phoneNumber ||
                "UNDEFINED"
              }
              id="phoneNumber"
              onChange={(e) => {
                setForm((prevForm) => ({
                  ...prevForm,
                  phoneNumber: e.target.value,
                }));
              }}
              disabled={!isEditing}
            />
          </Label>
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
          callmeReason={userData?.callmeReason}
          isEditing={!isEditing}
        />
      ) : null}
    </div>
  );
};

export default ProfileUserInfo;
