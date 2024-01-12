"use client";
import { Button } from "@/components/ui/button";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { format } from "date-fns";
import { Badge } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import FullCalendar from "@/app/_components/fullCalendar";
import { useAppSelector } from "@/app/store";
import AdminWorkspaceList from "@/app/_components/adminWorkspaceList";

interface Appointment {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  description: string;
  workspaceId: number;
  appointmentStatusId: number;
  createdAt: string;
  updatedAt: string | "";
}

interface Workspace {
  id: number;
  name: string;
  description: string;
  capacity: number;
  workspaceTypeId: number;
  createdAt: string;
  updatedAt: string | "";
}

const AdminWorkspacesPage = () => {
  return (
    <div>
      <h1 className="pageTitle">Workspaces</h1>
      <AdminWorkspaceList />
    </div>
  );
};

export default AdminWorkspacesPage;
