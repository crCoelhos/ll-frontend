import React from "react";

interface Props {
  params: {
    [key: string]: string | undefined;
  };
}

const LawyerPage: React.FC<Props> = ({ params }) => {
  console.log(params);
  return (
    <div>
      <h1>LawyerList Page</h1>
    </div>
  );
};

export default LawyerPage;
