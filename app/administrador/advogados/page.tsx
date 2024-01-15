import AdminLawyerList from "@/app/_components/adminLawyerList";
import React from "react";

interface Props {
  params: {
    [key: string]: string | undefined;
  };
}

const AdminLawyersPage: React.FC<Props> = () => {
  return (
    <div>
      <h1 className="pageTitle">Lista de Advogados</h1>
      <AdminLawyerList />
    </div>
  );
};

export default AdminLawyersPage;
