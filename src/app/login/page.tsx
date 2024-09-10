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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Link from 'next/link'

const Page = () => {
  return (
    <div className='flex justify-center items-center h-dvh'>


<Card className="w-[350px] ">
      <CardHeader>
        <CardTitle className='text-3xl font-bold'>Login</CardTitle>
        {/* <CardDescription>Deploy your new project in one-click.</CardDescription> */}
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
                <form action= " "  className='flex gap-3 flex-col'>
              <Label htmlFor="name">Email</Label>
              <Input type='email' placeholder="Enter your email id " />
              <Label htmlFor="name">Password</Label>
              <Input type='Password' placeholder="Enter your password " />

              </form>
            </div>
            <div className="flex flex-col space-y-1.5">
            
              
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between flex-col gap-3">
        <Button>Login</Button>

        <Link href={'/signup'}>Dont have an account? Signup</Link>
      </CardFooter>
    </Card>


    </div>
  )
}

export default Page