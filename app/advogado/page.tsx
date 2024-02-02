"use client";

import React from "react";
import LawyerList from "../_components/lawyerList";
import { LawyerSearchBox } from "../_components/lawyerSearchBox";

interface Props {
  params: {
    [key: string]: string | undefined;
  };
}

const LawyerPage: React.FC<Props> = () => {
  return (
    <div>
      <h1 className="pageTitle">Lista de Advogados</h1>
      <LawyerSearchBox />
      <LawyerList />
    </div>
  );
};

export default LawyerPage;
