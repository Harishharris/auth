import CredentialsProvider from "next-auth/providers/credentials"
import NextAuth, { type NextAuthOptions } from "next-auth"
import { prisma } from "@/prisma/db"
import { hash, compare } from "bcrypt"

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Sign In",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "hello@example.com",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: {
            // @ts-ignore
            email: credentials.email,
          },
        })

        if (!user) {
          return null
        }

        const isPassword = await compare(credentials.password, user.password)

        if (!isPassword) {
          return null
        }

        return {
          id: user.id + "",
          email: user.email,
          name: user.name,
          randonKey: "hey Cool",
        }
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      console.log("Session", session)
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          randomKey: token.randomKey,
        },
      }
    },
    jwt: ({ token, user }) => {
      console.log("JWT Callback", { token, user })
      if (user) {
        const u = user as unknown as any
        return {
          ...token,
          id: user.id,
          randomKey: u.randomKey,
        }
      }
      return token
    },
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
