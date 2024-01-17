import React, { useEffect, useState } from 'react';
import LawyerInfoCard from './lawyerInfoCard';

const LawyerList: React.FC = () => {
    const [lawyers, setLawyers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('API_ENDPOINT');
                const data = await response.json();
                setLawyers(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            {/* {lawyers.map((lawyer) => ( */}
            <LawyerInfoCard
                name={"Jorge"}
                title={"Doutor"}
                specialization={["Direito trabalhista", "Direito tributário"]}
                contactNumber={["(68) 9995764"]}
                description={"Um advogado muito bom"}
                UF={"AC"}
                subsection={"Rio Branco"}
                image={{
                    fallback: "J",
                    src: "https://via.placeholder.com/350"
                }}
            />

            {/* ))} */}
        </div>
    );
};

export default LawyerList;
