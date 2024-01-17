"use client";

import { useAppSelector } from "@/app/store";
import axios from "axios";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

import { Lawyer } from "@/app/types/lawyer.interface";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Expertise } from "@/app/types/expertise.interface";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "flowbite-react";
import { CopyIcon } from "lucide-react";
import { Input } from "postcss";

export default function LawyerPage() {
  const authData = useAppSelector((state) => state.auth);

  const params = useParams();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [lawyer, setLawyer] = useState<Lawyer>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const lawyerResponse = await axios.get(
          `http://localhost:3030/v1/lawyer/${params.lawyerKey}`,
          {
            headers: {
              Access: "123",
              Authorization: authData.token,
            },
          }
        );

        setLawyer(lawyerResponse.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h1 className="pageTitle">{lawyer?.user.name}</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="LawyerProfile flex flex-row justify-between m-12">
          <main className="lawyerProfileContent">
            <Card className="mb-1">
              <CardContent className="m-4 px-4 pt-4">
                <div className="elaboratedDescription p-2">
                  {lawyer?.description}
                  {lawyer?.description}
                  {lawyer?.description}
                  {lawyer?.description}
                  {lawyer?.description}
                  {lawyer?.description}
                  {lawyer?.description}
                  {lawyer?.description}
                  {lawyer?.description}
                  {lawyer?.description}
                  {lawyer?.description}
                  {lawyer?.description}
                </div>

                <div className="professionalDescription p-2">
                  {lawyer?.description}
                  {lawyer?.description}
                  {lawyer?.description}
                  {lawyer?.description}
                  {lawyer?.description}
                  {lawyer?.description}
                  {lawyer?.description}
                  {lawyer?.description}
                  {lawyer?.description}
                  {lawyer?.description}
                  {lawyer?.description}
                  {lawyer?.description}
                  {lawyer?.description}
                  {lawyer?.description}
                  {lawyer?.description}
                  {lawyer?.description}
                  {lawyer?.description}
                  {lawyer?.description}
                  {lawyer?.description}
                  {lawyer?.description}
                  {lawyer?.description}
                  {lawyer?.description}
                  {lawyer?.description}
                  {lawyer?.description}
                </div>

                <div className="callMeReason  p-2">
                  {lawyer?.description}
                  {lawyer?.description}
                  {lawyer?.description}
                  {lawyer?.description}
                  {lawyer?.description}
                  {lawyer?.description}
                  {lawyer?.description}
                  {lawyer?.description}
                </div>
              </CardContent>
            </Card>
            <Card className="mb-1">
              <CardContent className="m-4 px-4">
                <div className="callMeReason  p-2">
                  {lawyer?.description}
                  {lawyer?.description}
                  {lawyer?.description}
                  {lawyer?.description}
                </div>
              </CardContent>
            </Card>
          </main>
          <div className="lawyerProfileInfo">
            <Card className=" w-[512px] ml-12  items-center justify-center text-center mb-1 mt-24">
              <CardHeader className=" items-center justify-center">
                <Dialog>
                  <DialogTrigger asChild>
                    <Avatar className="w-[202px] h-[202px] mt-[-112px]">
                      <AvatarImage unselectable="on" src={lawyer?.image} />
                      <AvatarFallback delayMs={600}>
                        {lawyer?.user.name[0]}
                      </AvatarFallback>
                    </Avatar>
                  </DialogTrigger>
                  <DialogContent className="w-[1880px]">
                    <DialogHeader className="items-center">
                      <DialogTitle>{lawyer?.user.name}</DialogTitle>
                      <DialogDescription>
                        {lawyer?.graduateDegree}
                      </DialogDescription>
                      <img
                        src={lawyer?.image}
                        alt={lawyer?.user.name}
                        className="w-[3000px]"
                      />
                    </DialogHeader>

                    <DialogFooter className="sm:justify-start"></DialogFooter>
                  </DialogContent>
                </Dialog>

                <div className="socialActions flex flex-row justify-between gap-12 ...">
                  <Button variant="outline">Contactar</Button>
                  <Button variant="outline">Seguir</Button>
                </div>

                <div className="lawyerMetaData flex flex-row justify-between gap-12">
                  <CardDescription className="lawyerCustomers">
                    Clientes: {Math.floor(Math.random() * 129)}
                  </CardDescription>
                  <CardDescription className="lawyerFollowers">
                    Seguidores: {Math.floor(Math.random() * 129)}
                  </CardDescription>
                </div>
                <CardTitle>{lawyer?.user.name}</CardTitle>
                <CardDescription className="mb-2">
                  {lawyer?.graduateDegree}
                </CardDescription>
              </CardHeader>
              <CardContent className="">
                {lawyer?.description}
                {lawyer?.description}
                {lawyer?.description}
                {lawyer?.description}
              </CardContent>
              <CardFooter className=" items-center justify-center">
                {lawyer?.UF} - {lawyer?.secNumber}
              </CardFooter>
            </Card>
            <Card className=" w-[512px] ml-12  items-center justify-center text-center">
              <CardContent>
                {lawyer?.description}
                {lawyer?.description}
                {lawyer?.description}
                {lawyer?.description}
              </CardContent>
              <CardFooter className=" items-center">
                {lawyer?.expertises?.length ?? 0 > 0 ? (
                  lawyer?.expertises.map((expertise: Expertise) => (
                    <CardContent key={expertise.id}>
                      <Badge>{expertise.name}</Badge>
                    </CardContent>
                  ))
                ) : (
                  <CardContent>
                    <Badge>Nenhuma</Badge>
                  </CardContent>
                )}
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </>
  );
}
