import {compare} from 'bcryptjs'
import { CredentialsSignin } from "next-auth"
import NextAuth from "next-auth"
import Credential from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import User from "./models/userModel"
import { connectToDB } from "./utils/connectToDB"
 
export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [Google({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
  }), Credential({
    name : 'Credentials',
    credentials:{
        email : {label : "Email" , type : "email"},
        password : {label : "password" , type : "password"}
    },  authorize : async (credentials) =>{

        const email  = credentials.email;
        const password = credentials.password;

        if(!email || !password) throw new CredentialsSignin({message : 'Please enter email and password'});

        console.log(email , password);

        if(typeof email !== 'string') throw new CredentialsSignin({message : 'Email must be a string'});

        await connectToDB();

        const user = await User.findOne({email })

        if(!user) throw new CredentialsSignin({message : 'invalid email or passcode'});
       
        const isMatch  =  await compare(password , user.password);

        if(!isMatch) throw new CredentialsSignin({message : 'incorrect password'});

        else return {user : {email : user.email , name : user.name , id : user._id}};


    }
  })],
})