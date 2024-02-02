import React, { useEffect, useState } from "react";
import LawyerInfoCard from "./lawyerInfoCard";
import axios from "axios";
import { RootState, useAppSelector } from "../store";
import { Lawyer } from "../types/lawyer.interface";
import { useSelector } from "react-redux";
import { lawyerSearchResponse } from "../types/lawyerSearchResponse.interface";

const LawyerList: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSearchActive, setIsSearchActive] = useState<boolean>(false);
  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  const [lawyerSearchResponseData, setLawyerSearchResponseData] = useState<
    lawyerSearchResponse[]
  >([]);

  const authData = useAppSelector((state) => state.auth);
  const searchString = useSelector(
    (state: RootState) => state.search.searchString
  );

  useEffect(() => {
    if (searchString === null) {
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
    }

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const searchResponse = await axios.get(
          `http://localhost:3030/v1/search/lawyer/${searchString}`,
          {
            headers: {
              Access: "123",
              Authorization: authData.token,
            },
          }
        );

        console.log("resultado da busca: ", searchResponse.data);
        setLawyerSearchResponseData(searchResponse.data);
        setIsLoading(false);
        setIsSearchActive(true);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [searchString, authData.token]);

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
  }, [authData.token]);

  console.log("lawyerSearchResponseData: ", lawyerSearchResponseData);
  return (
    <div className="LawyerList">
      {searchString === null
        ? lawyerSearchResponseData.length === 0
          ? lawyers.map(
              (lawyer) => (
                console.log("lawyer: ", lawyer),
                (
                  <LawyerInfoCard
                    key={lawyer.id}
                    lawyerKey={lawyer.id}
                    name={lawyer.user.name}
                    title={lawyer.graduateDegree}
                    expertise={lawyer.expertises.map(
                      (expertise) => expertise.name
                    )}
                    contactNumber={lawyer.user.phoneNumber}
                    description={lawyer.description}
                    UF={lawyer.UF}
                    subsection={lawyer.UF}
                    image={{
                      fallback: lawyer.user.name[0],
                      src: lawyer.image,
                    }}
                  />
                )
              )
            )
          : lawyerSearchResponseData.map((lawyer) => (
              <LawyerInfoCard
                key={lawyer.userId}
                lawyerKey={lawyer.lawyerId}
                name={lawyer.name}
                title={lawyer.graduateDegree}
                expertise={lawyer.expertises.map((expertise) => expertise.name)}
                contactNumber={lawyer.phoneNumber}
                description={lawyer.description}
                UF={lawyer.UF}
                subsection={lawyer.UF}
                image={{
                  fallback: lawyer.name[0],
                  src: lawyer.image,
                }}
              />
            ))
        : lawyerSearchResponseData.map((lawyer) => (
            <LawyerInfoCard
              key={lawyer.lawyerId}
              lawyerKey={lawyer.lawyerId}
              name={lawyer.name}
              title={lawyer.graduateDegree}
              expertise={lawyer.expertises.map((expertise) => expertise.name)}
              contactNumber={lawyer.phoneNumber}
              description={lawyer.description}
              UF={lawyer.UF}
              subsection={lawyer.UF}
              image={{
                fallback: lawyer?.name ? lawyer.name[0] : "",
                src: lawyer.image,
              }}
            />
          ))}
    </div>
  );
};

export default LawyerList;
