
import { compare } from 'bcryptjs';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import User from './models/userModel';
import { connectToDB } from './utils/connectToDB';

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        const { email, password } = credentials;

        if (!email || !password) {
          throw new Error('Please enter email and password');
        }

        await connectToDB();

        const user = await User.findOne({ email });

        if (!user) {
          throw new Error('Invalid email or password');
        }

        const isMatch = await compare(password, user.password);

        if (!isMatch) {
          throw new Error('Incorrect password');
        }



        
        return {
          id: user._id,
          email: user.email,
          name: user.name
        };
      }
    })
  ],
  pages: {
    signIn: '/auth/signin', 
  },
 
});
