export type Appointment = {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  userId: number;
  description: string;
  workspaceId: number;
  appointmentStatusId: number;
  isPrivate: boolean;
  createdAt: string;
  updatedAt: string | "";
};

export type Appointments = {
  appointments: Appointment[];
};
