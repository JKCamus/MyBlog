import NextAuth, { NextAuthOptions } from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from '@/lib/prismaClientUtils'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'

const options = {
  pages: {
    signIn: '/cms',
  },
  providers: [
    CredentialsProvider({
      authorize: async (credentials) => {
        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          })
          if (!user) {
            throw new Error('User not found.')
          }
          const isRight = await bcrypt.compare(credentials.password, user.password)
          if (isRight) {
            return user
          } else {
            throw new Error('Invalid email or password')
          }
        } catch (error) {
          console.log('error', error)
          return null
        }
      },
    }),
    GitHubProvider({
      clientId: process.env.AUTH_GITHUB_ID as string,
      clientSecret: process.env.AUTH_GITHUB_SECRET as string,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    jwt: async ({ token }) => {
      return token
    },
    session: async ({ session, token }) => {
      if (session.user && token?.sub) {
        session.user.id = token.sub
      }
      return session
    },
  },
}

export const { handlers, auth, signIn, signOut } = NextAuth(options as NextAuthOptions)

export { handlers as GET, handlers as POST }
