import React from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"



import Link from 'next/link'


const Page = () => {
  return (
    <div className='flex justify-center items-center h-dvh'>


    <Card className="w-[350px] ">
          <CardHeader>
            <CardTitle className='text-3xl font-bold'>Sign-Up</CardTitle>
            {/* <CardDescription>Deploy your new project in one-click.</CardDescription> */}
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                    <form action= " "  className='flex gap-3 flex-col'>
                    <Label htmlFor="name">Name</Label>
                    <Input type='text' placeholder="Name please" />
                  <Label htmlFor="name">Email</Label>
                  <Input type='email' placeholder="Enter your email id " />
                  <Label htmlFor="name">Password</Label>
                  <Input type='Password' placeholder="Enter your password " />
                    <Label htmlFor="name">Phone</Label>
                    <Input type='number' placeholder="Phone number" />
                    <Label htmlFor="name">Age</Label>
                    <Input type='number' placeholder="Age" />
    
                  </form>
                </div>
                <div className="flex flex-col space-y-1.5">
                
                  
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between flex-col gap-3">
            <Button>Register</Button>
    
            <Link href={'/login'}>Alredy have a account ?Login</Link>
          </CardFooter>
        </Card>
    
    
        </div>
  )
}

export default Page