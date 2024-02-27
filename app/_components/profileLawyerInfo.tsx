"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { Lawyer } from "../types/lawyer.interface";
import { Expertise } from "../types/expertise.interface";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Pencil1Icon, ImageIcon, CheckIcon } from "@radix-ui/react-icons";
import format from "date-fns/format";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { User } from "lucide-react";
import { useAppSelector } from "../store";

export interface ProfileLawyerInfoProps {
  OAB?: string;
  riteDate?: string;
  secNumber?: string;
  inscriptionType?: string;
  description?: string;
  elaboratedDescription?: string;
  professionalDescription?: string;
  callmeReason?: string;
  graduateDegree?: string;
  UF?: string;
  expertises?: Expertise[];
  isEditing?: boolean;
}
const ProfileLawyerInfo = (props: ProfileLawyerInfoProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [lawyerData, setLawyerData] = useState<Lawyer>();

  const authData = useAppSelector((state) => state.auth);

  const [form, setForm] = useState<ProfileLawyerInfoProps>({
    OAB: "",
    riteDate: "",
    secNumber: "",
    inscriptionType: "",
    description: "",
    elaboratedDescription: "",
    professionalDescription: "",
    callmeReason: "",
    graduateDegree: "",
    UF: "",
    expertises: [],
  });

  useEffect(() => {
    setForm(props);
  }, [props]);

  const handleEditSubmit = async () => {
    try {
      setIsLoading(true);

      const lawyerNewDataResponse = await axios.put(
        process.env.NEXT_PUBLIC_API_URL + `v1/lawyer/`,
        form,
        {
          headers: {
            Access: 123,
            Authorization: authData.token,
          },
        }
      );

      setLawyerData(lawyerNewDataResponse.data as Lawyer);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <Card className="w-[512px] h-[auto]">
        <CardHeader className="grid grid-cols-4 gap-8">
          <div className="flex items-center justify-center col-span-3">
            <Label
              className="text-center flex items-center"
              htmlFor="graduateDegree"
            >
              Graduação:
            </Label>
            <Input
              id="graduateDegree"
              value={form.graduateDegree}
              onChange={(e) =>
                setForm((prevForm) => ({
                  ...prevForm,
                  graduateDegree: e.target.value,
                }))
              }
              disabled={props.isEditing}
            />
          </div>
          {!props.isEditing ? (
            <Button
              className="w-12 bg-blue-700 hover:bg-blue-500"
              onClick={() => handleEditSubmit()}
            >
              <CheckIcon />
            </Button>
          ) : null}
        </CardHeader>
        <CardContent>
          <CardDescription>
            <div className="grid grid-cols-2">
              <div className="grid grid-cols-2">
                <Label htmlFor="OAB" className="text-center flex items-center">
                  OAB:
                </Label>
                <Input
                  id="OAB"
                  placeholder="3747"
                  value={form.OAB}
                  onChange={(e) =>
                    setForm((prevForm) => ({
                      ...prevForm,
                      OAB: e.target.value,
                    }))
                  }
                  disabled={props.isEditing}
                />
              </div>
              <div className="grid grid-cols-2 gap-1">
                <Label htmlFor="UF" className="text-center flex items-center">
                  UF:
                </Label>
                <Input
                  id="UF"
                  placeholder="AC"
                  value={form.UF}
                  onChange={(e) =>
                    setForm((prevForm) => ({
                      ...prevForm,
                      UF: e.target.value,
                    }))
                  }
                  disabled={props.isEditing}
                />
              </div>
            </div>
            <div className="grid grid-cols-2">
              <Label
                htmlFor="riteDate"
                className="text-center flex items-center"
              >
                Data do rito:
              </Label>
              <Input
                id="riteDate"
                value={form.riteDate}
                onChange={(e) =>
                  setForm((prevForm) => ({
                    ...prevForm,
                    riteDate: e.target.value,
                  }))
                }
                disabled={props.isEditing}
              />
            </div>
            <div className="grid grid-cols-2">
              <Label
                htmlFor="secNumber"
                className="text-center flex items-center"
              >
                Seccional:
              </Label>
              <Input
                id="secNumber"
                value={form.secNumber}
                onChange={(e) =>
                  setForm((prevForm) => ({
                    ...prevForm,
                    secNumber: e.target.value,
                  }))
                }
                disabled={props.isEditing}
              />
            </div>
            <div className="grid grid-cols-2">
              <Label
                htmlFor="description"
                className="text-center flex items-center"
              >
                Descrição:
              </Label>
              <Textarea
                id="description"
                value={form.description}
                onChange={(e) =>
                  setForm((prevForm) => ({
                    ...prevForm,
                    description: e.target.value,
                  }))
                }
                disabled={props.isEditing}
              />
            </div>
            <div className="grid grid-cols-2">
              <Label
                htmlFor="elaboratedDescription"
                className="text-center flex items-center"
              >
                Descrição elaborada:
              </Label>
              <Textarea
                className="h-[128px]"
                id="elaboratedDescription"
                value={form.elaboratedDescription}
                onChange={(e) =>
                  setForm((prevForm) => ({
                    ...prevForm,
                    elaboratedDescription: e.target.value,
                  }))
                }
                disabled={props.isEditing}
              />
            </div>
            <div className="grid grid-cols-2">
              <Label
                htmlFor="professionalDescription"
                className="text-center flex items-center"
              >
                Descrição profissional:
              </Label>
              <Textarea
                className="h-[128px]"
                id="professionalDescription"
                value={form.professionalDescription}
                onChange={(e) =>
                  setForm((prevForm) => ({
                    ...prevForm,
                    professionalDescription: e.target.value,
                  }))
                }
                disabled={props.isEditing}
              />
            </div>
            <div className="grid grid-cols-2">
              <Label
                htmlFor="callmeReason"
                className="text-center flex items-center"
              >
                Motivo para contato:
              </Label>
              <Textarea
                className="h-[128px]"
                id="callmeReason"
                value={form.callmeReason}
                onChange={(e) =>
                  setForm((prevForm) => ({
                    ...prevForm,
                    callmeReason: e.target.value,
                  }))
                }
                disabled={props.isEditing}
              />
            </div>
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileLawyerInfo;
