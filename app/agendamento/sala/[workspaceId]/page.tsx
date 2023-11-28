"use client";

import { useParams } from "next/navigation";

export default function WorkspacePage() {
  const params = useParams();

  console.log(params.laywerId);

  return (
    <>
      <h1>Sala: {params.workspaceId}</h1>
    </>
  );
}
