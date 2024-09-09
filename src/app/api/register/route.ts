import { connectToDB } from "@/utils/connectToDB";
import User from "@/models/userModel";
import { NextResponse , NextRequest } from "next/server";

export  async function POST( request:NextRequest , res:NextResponse){

    const { name, email, password, phone, age, places = [] } = await request.json();



    await connectToDB();


    const user =  new User({
        name,
        email,
        password,
        phone,
        age,      
    });

    try{
        await user.save();
         return Response.json({message : 'User Created Successfully'});
    }

    catch(err){
        return Response.json({message : 'User Creation Failed'});
    }

}