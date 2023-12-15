"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

const Administrador = () => {
  const router = useRouter();

  const handleWorkspaceRouting = () => {
    router.push(`/administrador/workspaces`);
  };
  return (
    <div>
      Administrador
      <Button onClick={handleWorkspaceRouting}>Workspaces</Button>
    </div>
  );
};

export default Administrador;
