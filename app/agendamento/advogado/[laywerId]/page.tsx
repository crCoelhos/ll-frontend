"use client";

import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";

export default function LawyerSchedulePage() {
  const params = useParams();


  return (
    <>
      <h1>Advogado: {params.laywerId}</h1>
    </>
  );
}
