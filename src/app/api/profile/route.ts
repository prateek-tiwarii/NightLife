import { profile } from "@/models/profileModel";
import { connectToDB } from "@/utils/connectToDB";
import User from "@/models/userModel";
import { auth } from "@/auth";

export async function POST(request , response){
    const {  bio , location , interests , education , work } = await request.json();
    await connectToDB();
    const session = await auth();

    if(!session.user){
        return response.json({message : 'User not authenticated'});
    }

    const user = session.user; 
     
    const updateProfile = new profile({
        user : user.id,
        bio,
        location,
        interests,
        education,
        work,
    });


    try{
        await updateProfile.save();
        return response.json({message : 'Profile Updated Successfully'});
    }
    catch(err){
        return response.json({message : 'Profile Update Failed'});
    }




}
