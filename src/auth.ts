import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  trustHost: true,
  callbacks: {
    jwt({ token, profile }) {
      // profile is only present on first sign-in; token.email is always present
      // Use email as stable userId — never changes across sessions
      if (!token.stableId) {
        token.stableId = (profile?.email as string) ?? (token.email as string) ?? token.sub;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = (token.stableId as string) ?? session.user.email ?? token.sub ?? "";
      }
      return session;
    },
  },
});
