import React, { useEffect, useState } from "react";
import LawyerInfoCard from "./lawyerInfoCard";
import axios from "axios";
import { RootState, useAppSelector } from "../store";
import { Lawyer } from "../types/lawyer.interface";
import { useSelector } from "react-redux";
import { lawyerSearchResponse } from "../types/lawyerSearchResponse.interface";
import { UserNotification } from "../types/notification.interface";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BellIcon } from "@radix-ui/react-icons";

const NotificationBox: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [notification, setNotification] = useState<UserNotification>();

  const authData = useAppSelector((state) => state.auth);
  const searchString = useSelector(
    (state: RootState) => state.search.searchString
  );

  useEffect(() => {
    if (authData.token) {
      const fetchData = async () => {
        try {
          setIsLoading(true);
          const notificationResponse = await axios.get(
            process.env.NEXT_PUBLIC_API_URL + "notifications/",
            {
              headers: {
                Access: process.env.NEXT_PUBLIC_ACCESS_KEY,
                Authorization: authData.token,
              },
            }
          );

          setNotification(notificationResponse.data);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();
    }
  }, []);

  const HandleMarkNotificationAsReadClick = async (notificationId: string) => {
    try {
      setIsLoading(true);
      const markAsReadResponse = await axios.put(
        process.env.NEXT_PUBLIC_API_URL + "notification/read/",
        { notificationId: notificationId },
        { headers: { Access: process.env.NEXT_PUBLIC_ACCESS_KEY, Authorization: authData.token } }
      );
      console.log(markAsReadResponse.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="NotificationBox">
        <BellIcon className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="NotificationBox">
      <></>
      <ul className="grid w-[300px] gap-3 p-4 md:w-[400px] md:grid-rows-2 lg:w-[450px] ">
        {notification?.personalNotifications.map((notification) => (
          <Card
            key={notification.id}
            className={!notification.isRead ? "" : "bg-gray-100 "}
            onClick={(e) => {
              HandleMarkNotificationAsReadClick(notification.id.toString());
            }}
          >
            <CardHeader>
              <div className="flex flex-row justify-between">
                <CardTitle>{notification.title}</CardTitle>
                {notification.isRead ? null : (
                  <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                )}
              </div>

              <CardContent>{notification.message}</CardContent>
            </CardHeader>
          </Card>
        ))}
        {notification?.globalNotifications.map((notification) => (
          <Card
            key={notification.id}
            className={!notification.isRead ? "" : "bg-gray-100"}
            onClick={(e) => {
              HandleMarkNotificationAsReadClick(notification.id.toString());
            }}
          >
            <CardHeader>
              <div className="flex flex-row justify-between">
                <CardTitle>{notification.title}</CardTitle>
                {notification.isRead ? null : (
                  <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                )}
              </div>

              <CardContent>{notification.message}</CardContent>
            </CardHeader>
          </Card>
        ))}
      </ul>
    </div>
  );
};

export default NotificationBox;
