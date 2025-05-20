import bcrypt from "bcrypt";
import NextAuth, { NextAuthConfig } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/prisma";
import Credentials from "next-auth/providers/credentials";

export const authOptions: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: {
          type: "email",
          label: "Email",
          placeholder: "johndoe@gmail.com"
        },
        password: {
          type: "password",
          label: "Password",
          placeholder: "*****"
        }
      },
      authorize: async (credentials) => {
        const { email, password } = credentials;
        if (!email || !password) {
          return null;
        }
        const user = await prisma.user.findUnique({
          where: {
            email: email as string
          }
        });

        if (!user) return null;

        const isPasswordValid = await bcrypt.compare((password as string) || "", user.password as string);
        if (!isPasswordValid) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.email
        };
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.id && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    }
  }
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
