
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



        // Return user object directly
        return {
          id: user._id,
          email: user.email,
          name: user.name
        };
      }
    })
  ],
  pages: {
    signIn: '/auth/signin', // Custom sign-in page path if needed
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async session({ session, token }) {
      // Add user ID to the session token
      session.user.id = token.sub;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    }
  },
  secret: process.env.NEXTAUTH_SECRET // Make sure this is defined in your .env
});
