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
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn, auth } from '@/auth'; 
import { useSession } from "next-auth/react"

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession()

  console.log("Session:", session);
  
  

  const router = useRouter();

  

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
  
    console.log("Attempting login with email:", email);
  
    try {
      const response = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
  
      console.log("SignIn response:", response);
  
      if (response?.error) {
        console.error("Login error:", response.error);
        setError("Invalid username or password");
      } else if (response?.ok) {
        console.log("Login successful, redirecting...");
        router.push('/');
      } else {
        console.warn("Unexpected response:", response);
        setError("An unexpected error occurred");
      }
    } catch (e) {
      console.error("Exception during login:", e);
      setError("Error submitting the form");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex justify-center items-center h-dvh'>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className='text-3xl font-bold'>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={submitHandler}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            {error && <p className="text-red-500">{error}</p>}

            <CardFooter className="flex justify-between flex-col ">
              <Button type="submit" disabled={loading} className='mt-4'>
                {loading ? "Logging in..." : "Login"}
              </Button>

              <Link href={'/signup'}>Don't have an account? Sign up</Link>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
