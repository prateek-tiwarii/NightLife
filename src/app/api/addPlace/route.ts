import Place from "@/models/placesModel";
import { connectToDB } from "@/utils/connectToDB";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request :NextRequest ,  response : NextResponse){
    await connectToDB();

    const {title , date , description , address , photo  , Visting , creator } = await request.json();

    const place =  new Place({
        title,
        date,
        description,
        address,
        photo,
        creator , 
        Visting
    });


    try{
        await place.save();
        console.log(place)

        return NextResponse.json({message : "places added sucessfully"});
    }

    catch(err){
        return NextResponse.json({message : "failed to add places"});
    }
}