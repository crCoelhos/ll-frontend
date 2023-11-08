import React, { ReactNode } from "react";

interface ScheduleLayoutProps {
  children?: ReactNode;
}

const ScheduleLayout = ({ children }: ScheduleLayoutProps): JSX.Element => {
  return (
    <div>
      <h1>ScheduleLayout navbar</h1>
      {children}
      <h1>ScheduleLayout footer</h1>
    </div>
  );
};

export default ScheduleLayout;
