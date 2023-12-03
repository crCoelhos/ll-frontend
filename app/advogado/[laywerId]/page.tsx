"use client";

import { useParams } from "next/navigation";

export default function LawyerPage() {
  const params = useParams();


  return (
    <>
      <h1>Advogado: {params.laywerId}</h1>
    </>
  );
}
