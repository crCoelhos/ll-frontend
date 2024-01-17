import React, { useEffect, useState } from "react";
import LawyerInfoCard from "./lawyerInfoCard";
import axios from "axios";
import { useAppSelector } from "../store";
import { Lawyer } from "../types/lawyer.interface";

const LawyerList: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [lawyers, setLawyers] = useState<Lawyer[]>([]);

  const authData = useAppSelector((state) => state.auth);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const lawyersResponse = await axios.get(
          "http://localhost:3030/v1/lawyer/all",
          {
            headers: {
              Access: "123",
              Authorization: authData.token,
            },
          }
        );

        setLawyers(lawyersResponse.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log(lawyers);

  return (
    <div className="LawyerList">
      {lawyers.map((lawyer) => (
        <LawyerInfoCard
          key={lawyer.id}
          lawyerKey={lawyer.id}
          name={lawyer.user.name}
          title={lawyer.graduateDegree}
          expertise={lawyer.expertises.map((expertise) => expertise.name)}
          contactNumber={lawyer.user.phoneNumber}
          description={lawyer.description}
          UF={lawyer.UF}
          subsection={lawyer.UF}
          image={{
            fallback: lawyer.user.name[0],
            src: lawyer.image,
          }}
        />
      ))}
    </div>
  );
};

export default LawyerList;
