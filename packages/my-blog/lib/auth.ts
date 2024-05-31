import NextAuth,{NextAuthOptions} from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from '@/lib/prismaClientUtils'

const options: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.AUTH_GITHUB_ID as string,
      clientSecret: process.env.AUTH_GITHUB_SECRET as string,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  secret: process.env.AUTH_SECRET,
};

export const { handlers, auth, signIn, signOut } = NextAuth(options);

export { handlers as GET, handlers as POST };
