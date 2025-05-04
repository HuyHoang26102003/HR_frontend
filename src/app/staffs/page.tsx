"use client";
import { BellRing, Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { use, useEffect, useState } from "react";
import api from "@/services/api";
import { Badge } from "@/components/ui/badge";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
const notifications = [
  {
    title: "Your call has been confirmed.",
    description: "1 hour ago",
  },
  {
    title: "You have a new message!",
    description: "1 hour ago",
  },
  {
    title: "Your subscription is expiring soon!",
    description: "2 hours ago",
  },
];

type CardProps = React.ComponentProps<typeof Card>;

export function CardDemo({
  className,
  name,
  email,
  on_board,
  ...props
}: CardProps & {
  name: string;
  email: string;
  on_board: { is_on_board: boolean; start_date: string; end_date: string };
}) {
  return (
    <Card className={cn("w-[380px]", className)} {...props}>
      <CardHeader>
        <div className="flex items-center gap-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold">{name}</h3>
            <h3 className="text-gray-400">{email}</h3>
          </div>
        </div>
        <CardTitle>Frontend Dev</CardTitle>
        <CardDescription>Junior</CardDescription>
      </CardHeader>
      <CardContent className="justify-end items-end flex">
        <Badge className="bg-violet-400">{on_board.is_on_board === true ? 'On Board' : 'Official'} ({Math.ceil((new Date(on_board.end_date).getTime() - new Date(on_board.end_date).getTime()) / (1000 * 60 * 60 * 24))} days)</Badge>
      </CardContent>
    </Card>
  );
}

const Page = () => {
  const [staffs, setStaffs] = useState<
    {
      id: string;
      name: string;
      email: string;
      on_board: {
        is_on_board: boolean;
        start_date: string;
        end_date: string;
      };
    }[]
  >();
  const fetchStaffs = async () => {
    const response = await api.get("/staffs");
    if (response.status === 200 || response.status === 201) {
      console.log(response.data);
      setStaffs(response.data);
    } else {
      console.log("Error fetching staffs");
    }
  };
  useEffect(() => {
    fetchStaffs();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <div className="flex gap-4 items-center">
          <h3>All Staffs</h3>
          <Button variant="default">Add Staff</Button>
        </div>
        <div className="flex gap-4 items-center">
          <h3>SORT BY</h3>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Fruits</SelectLabel>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="blueberry">Blueberry</SelectItem>
                <SelectItem value="grapes">Grapes</SelectItem>
                <SelectItem value="pineapple">Pineapple</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      {staffs?.map((item) => {
        console.log("what here", item);
        return (
          <CardDemo
            key={item.id}
            email={item.email}
            name={item.name}
            on_board={item.on_board}
          />
        );
      })}
    </div>
  );
};

export default Page;
