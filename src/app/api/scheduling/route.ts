import { connectToDB } from "@/utils/connectToDB";
import { NextResponse , NextRequest } from "next/server";
import { Event } from "@/models/eventModel";


export async function POST(req : NextRequest , res: NextResponse){

    const {title , place , time , date , description ,attendes , interests} = await req.json();

    await connectToDB();

    if(!title || !place || !time || !date || !description || !attendes || !interests){
        return NextResponse.json({message : 'Please fill all the fields'});
    }

    const exist = await Event.findOne({title});

    if(exist){
        return NextResponse.json({message : 'Event Already Exists'});
    }

    const event = new Event({
        title,
        place,
        time,
        date,
        description,
        attendes,
        interests,
    })

    try{
        await event.save();

        return NextResponse.json({message : 'Event Created Successfully'});
    }

    catch(err){
        return NextResponse.json({message : 'Event Creation Failed'});
    }

}