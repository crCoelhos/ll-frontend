"use client"
import axios from "axios";
import React, { useEffect, useState } from "react";

interface Appointment {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  description: string;
  workspaceId: number;
  appointmentStatusId: number;
  createdAt: string;
  updatedAt: string | '';
}


interface Props {
  params: {
    [key: string]: string | undefined;
  };
}

const WorkspacePage: React.FC<Props> = ({ params }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const user_key = sessionStorage.getItem("user_key");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          "http://localhost:3030/v1/appointments/all",
          {
            headers: {
              Access: '123',
              Authorization: user_key,
            },
          }
        );
        setAppointments(response.data.appointments);

        console.log('leticia: ', response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

  }, []);

  console.log(params);

  return (
    <div>
      <br />
      <br />
      <h1>WorkspaceList Page</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {appointments.map((appointment) => (
            <li key={appointment.id}>
              <strong>{appointment.title}</strong>
              <p>Numero da sala: {appointment.workspaceId}</p>
              <p>Description: {appointment.description}</p>

              <h1>Agendamento:</h1>
              <p>Inicio: {appointment.startDate}</p>
              <p>Final: {appointment.endDate}</p>
            </li>
          ))}
        </ul>
      )}

      <br />
      <br />
    </div>
  );
};

export default WorkspacePage;