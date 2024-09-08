import Place from "@/models/placesModel";
import { connectToDB } from "@/utils/connectToDB";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request :NextRequest ,  response : NextResponse){
    await connectToDB();

    const {title , date , description , address , photo , creator , Visting} = await request.json();

    const place =  new Place({
        title,
        date,
        description,
        address,
        photo,
        creator,
        Visting
    });


    try{
        await place.save();

        return Response.json({message : "places added sucessfully"});
    }

    catch(err){
        return Response.json({message : "failed to add places"});
    }
}