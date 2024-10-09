import { profile } from "@/models/profileModel";
import { connectToDB } from "@/utils/connectToDB";

export async function GET(request , response){
    await connectToDB();


    
}