import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

function People() {
  const [residents, setResidents] = useState(null);
  const { planetId } = useParams();

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const response = await axios.get(
          `https://swapi.dev/api/planets/${planetId}/`
        );

        const residentUrls = response.data.residents;

        const residentPromises = residentUrls.map((url) => axios.get(url));
        const residentResponses = await Promise.all(residentPromises);

        const residentData = residentResponses.map((response) => response.data);

        setResidents(residentData);
      } catch (error) {
        console.error("Failed to fetch people", error);
      }
    };

    fetchPeople();
  }, [planetId]);
  return (
    <>
      {residents === null ? (
        <p> loading.... </p>
      ) : residents.length > 0 ? (
        residents.map((resident) => (
          <div key={resident.name} className="m-4 planetCards">
            <Card className="w-[350px]">
              <CardHeader>
                <CardTitle>{resident.name}</CardTitle>
                <CardDescription>
                  <b>Birth Year</b> : {resident.birth_year}
                </CardDescription>
              </CardHeader>

              <CardContent className="grid gap-4">
                <div>
                  <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                    <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        gender : {resident.gender}
                      </p>
                    </div>

                    <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        height | mass : {resident.height} | {resident.mass}
                      </p>
                    </div>

                    <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        hair color | skin color : {resident.hair_color} |{" "}
                        {resident.skin_color}
                      </p>
                    </div>

                    <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        eye color: {resident.eye_color}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))
      ) : (
        <p> No residents found </p>
      )}
    </>
  );
}

export default People;
