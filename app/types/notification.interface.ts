import { User } from "./user.interface";
import { Expertise } from "./expertise.interface";

export type UserNotification = {
  globalNotifications: GlobalNotification[];
  personalNotifications: PersonalNotification[];
};

type GlobalNotification = {
  id: number;
  title: string;
  message: string;
  isRead: number;
};

type PersonalNotification = {
  id: number;
  title: string;
  message: string;
  isRead: number;
};
