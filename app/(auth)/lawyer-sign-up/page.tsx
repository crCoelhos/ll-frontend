import React from "react";
import { LawyerSignUpBox } from "../../_components/lawyerSignUpBox";

interface Props {
  params: {
    [key: string]: string | undefined;
  };
}

const LawyerPage: React.FC<Props> = ({ params }) => {
  return (
    <div>
      <h1 className="pageTitle">Cadastro de Advogados</h1>
      <LawyerSignUpBox />
    </div>
  );
};

export default LawyerPage;
