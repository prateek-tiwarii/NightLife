import { connectToDB } from "@/utils/connectToDB";

async function POST(req , res){

    await connectToDB();

    req.body 
}