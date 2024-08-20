import NextAuth, { User } from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    GoogleProvider({
        name: 'google',
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        
      }),
    CredentialsProvider({
      id: 'sign-in',
      credentials: {
        email: {label: 'Email', type:'email'},
        password: { label: 'Password', type: 'password' },

      },
      authorize: async (credentials) => {
        const res = await fetch('https://akil-backend.onrender.com/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password
          }),
        });

        const user = await res.json();
        if (res.ok && user.data) {
          return user.data;
        } else {
          return null
        }
      },
    }),
    CredentialsProvider({
      id: 'verify',
      credentials: {
        email: {label: 'Email', type:'email'},
        OTP: { label: 'OTP', type: 'text' },

      },
      authorize: async (credentials) =>  {
        const res = await fetch('https://akil-backend.onrender.com/verify-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: credentials?.email,
            OTP: credentials?.OTP
          }),
        });

        const user  = await res.json();

        if (res.ok && user.data) {
          return user.data;
        } else {
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: "/signup",
    verifyRequest: "/verify-email"
    
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account?.provider === 'sign-in' || account?.provider === 'verify') {
        token.accessToken = user.accessToken;
      }

      if (account?.provider === 'google') {
        token.accessToken = account.id_token;
      }
      console.log("token", token,'user', user, 'account', account)
  
      return token;
    },
  
    async session({ session, token }) {
      session.user = {
        ...session.user,
        accessToken: token.accessToken as string
      };
      console.log("session", token, session)
      
      return session;
    }
  }
  
});

export { handler as GET, handler as POST };
