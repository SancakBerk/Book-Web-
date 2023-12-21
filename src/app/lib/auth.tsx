import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
export const {
  auth,
  handlers: { GET, POST },
} = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
});
