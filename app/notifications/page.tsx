"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import axios from "axios";
import { BellIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../store";
import { User } from "../types/user.interface";
import { LawyerProcess } from "../types/laywerProcesses.interface";
import { Lawyer } from "../types/lawyer.interface";
import { number } from "zod";
import { ProcessInfoModal } from "../_components/processInfoModal";
import { Button } from "@/components/ui/button";
import { DESTRUCTION } from "dns";
import { NewProcessModal } from "../_components/newProcessModal";
import ProfileLawyerProcesses from "../_components/profileLawyerProcesses";
import ProfileUserInfo from "../_components/profileUserInfo";
import NotificationBox from "../_components/notificationBox";

const Notifications = () => {
  const authData = useAppSelector((state) => state.auth);

  return (
    <main className="flex justify-center pt-24 gap-2">
      <NotificationBox />
    </main>
  );
};

export default Notifications;
