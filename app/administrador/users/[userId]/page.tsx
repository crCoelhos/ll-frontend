import React from "react";

interface Props {
  params: {
    [key: string]: string | undefined;
  };
}

const AdminUserPage: React.FC<Props> = ({ params }) => {
  return (
    <div>
      <h1 className="pageTitle">Lista de usuários</h1>
      
    </div>
  );
};

export default AdminUserPage;
