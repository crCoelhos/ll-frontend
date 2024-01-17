"use client";

import { useAppSelector } from "@/app/store";
import axios from "axios";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

import { Lawyer } from "@/app/types/lawyer.interface";

export default function LawyePage() {
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

        console.log(lawyerResponse.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log(lawyer);

  return (
    <>
      <h1>Advogado: {params.lawyerKey}</h1>
    </>
  );
}
