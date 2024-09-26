"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


const Page = () => {

  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    gender: '',
    age: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle input change
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,  
    });
  };

  const handleGenderChange = (value) => {
    setFormData({
      ...formData,
      gender: value, 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post("/api/register", formData);
      if (response.data.redirectTo) {
        router.push(response.data.redirectTo); 
        console.log(response);
      }
  }
     catch (e) {
      setError("Error submitting the form");
      console.error("Error in submitting the form", e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex justify-center items-center h-dvh'>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className='text-3xl font-bold'>Sign-Up</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                />

                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                />

                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                />

               <Label htmlFor="gender">Gender</Label>
               <Select
               value= {formData.gender}
               onValueChange = {handleGenderChange}

               >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Gender" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {/* <SelectLabel>Fruits</SelectLabel> */}
          <SelectItem value="male">Male</SelectItem>
          <SelectItem value="female">Female</SelectItem>
          <SelectItem value="others">Others</SelectItem>

        </SelectGroup>
      </SelectContent>
    </Select>


                <Label htmlFor="age">Age</Label>
                <Input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  placeholder="Enter your age"
                />

                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Registering..." : "Register"}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between flex-col gap-3">
          <Link href={'/login'}>Already have an account? Login</Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Page;
