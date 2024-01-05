"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React, { ReactNode } from "react";

import { ArrowLeft } from "lucide-react";

interface ScheduleLayoutProps {
  children?: ReactNode;
}

const AdminAreaLayout = ({ children }: ScheduleLayoutProps): JSX.Element => {
  const router = useRouter();
  const handleBackPage = () => {
    router.back();
  };

  return (
    <div>
      <Button className="w-12 m-6" onClick={handleBackPage}>
        <ArrowLeft />
      </Button>
      {children}
    </div>
  );
};

export default AdminAreaLayout;
