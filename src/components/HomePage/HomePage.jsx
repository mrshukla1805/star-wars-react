import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

import { Star } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useNavigate } from 'react-router-dom';
import './HomePage.css'


function HomePage() {
  const pointers = [
    {
      title: "Welcome to Star Wars.",
      description: "Let's get started.",
    },
    {
      title: "I am Parth Shukla",
      description: "your guide for the day",
    },
    {
      title: "This project will constantly evolve",
      description: "Just like my development skills ;)",
    },
  ];

  const navigate = useNavigate();

  return (
    <div className="intro-card m-4">
      <Card className={cn("w-[380px]")}>
        <CardHeader>
          <CardTitle>Star Wars</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className=" flex items-center space-x-4 rounded-md border p-4">
            <Star />
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">Stars Galaxy</p>
            </div>
          </div>
          <div>
            {pointers.map((notification, index) => (
              <div
                key={index}
                className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
              >
                <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {notification.title}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {notification.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={() => navigate(`/planets`)} >Lets Go !!!!!!!!!</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default HomePage;
