"use client";

import { useParams } from "next/navigation";

export default function LawyerPage() {
  const params = useParams();

  console.log(params.laywerId);

  return (
    <>
      <h1>Advogado: {params.laywerId}</h1>
    </>
  );
}
