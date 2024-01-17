'use client'
import AdminLawyerList from "@/app/_components/adminLawyerList";
import React from "react";
import LawyerInfoCard from "../_components/lawyerInfoCard";
import LawyerList from "../_components/lawyerList";

interface Props {
  params: {
    [key: string]: string | undefined;
  };
}

const LawyerPage: React.FC<Props> = () => {
  return (
    <div>
      <h1 className="pageTitle">Lista de Advogados</h1>
      <LawyerList />
    </div>
  );
};

export default LawyerPage;