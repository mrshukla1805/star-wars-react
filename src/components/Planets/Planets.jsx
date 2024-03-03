/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import "./Planets.css";

function Planets() {
  const [planets, setPlanets] = useState([]);
  const [page, setPage] = useState(1);
  const [nextUrl, setNextUrl] = useState(true);
  const [prevUrl, setPrevUrl] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlanets = async () => {
      const response = await axios.get(
        `https://swapi.dev/api/planets/?page=${page}`
      );
      setNextUrl(response.data.next !== null);
      setPrevUrl(response.data.previous !== null);
      let res = response.data.results.map((v) => {
        const segments = v.url.split("/");
        const id = segments[segments.length - 2];
        return {
          ...v,
          id,
        };
      });
      setPlanets(res);
    };
    fetchPlanets();
  }, [page]);

  return (
    <div className="planetParent">
      {planets.map((planet) => (
        <div key={planet.name} className="m-4 planetCards">
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>{planet.name}</CardTitle>
              <CardDescription>
                <b>terrain</b> : {planet.terrain}
              </CardDescription>
            </CardHeader>

            <CardContent className="grid gap-4">
              <div>
                <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                  <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      rotation period : {planet.rotation_period}
                    </p>
                  </div>

                  <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      orbital period: {planet.orbital_period}
                    </p>
                  </div>

                  <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      diameter: {planet.diameter}
                    </p>
                  </div>

                  <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      climate: {planet.climate}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex justify-between">
              <Button onClick={() => navigate(`/people/${planet.id}`)}>
                Check Residents
              </Button>
            </CardFooter>
          </Card>
        </div>
      ))}
      <div className="lastDiv" >
        <Button
          disabled={!nextUrl}
          onClick={() => setPage(page + 1)}
          className="m-3"
        >
          Next
        </Button>
        <Button
          disabled={!prevUrl}
          onClick={() => setPage(page - 1)}
          className="m-3"
        >
          Previous
        </Button>
      </div>
    </div>
  );
}

export default Planets;
