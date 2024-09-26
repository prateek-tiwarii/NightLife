import { connectToDB } from "@/utils/connectToDB";
import User from "@/models/userModel";
import { NextResponse , NextRequest } from "next/server";
import { redirect } from "next/navigation";
import {hash} from 'bcryptjs';

export  async function POST( request:NextRequest , res:NextResponse){

    const { name, email, password, phone, age, places = [] } = await request.json();

    await connectToDB();

    const exist = await User.findOne({email });

    if(exist){
        return NextResponse.json({message : 'User Already Exists'});
    }

    if(!name || !email || !password || !phone || !age){
        return NextResponse.json({message : 'Please fill all the fields'});
    }

    const hashedPass = await hash(password , 12);

      
    
    const user =  new User({
        name,
        email,
        password : hashedPass,
        phone,
        age,      
    });
    

    try{
        await user.save();
        return NextResponse.json({ message: "User created successfully", redirectTo: "/login" });

    }

    catch(err){
        return NextResponse.json({message : 'User Creation Failed'});
    }

}