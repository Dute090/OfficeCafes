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
      // Lock userId to Google email — stable across all sessions
      if (profile?.email) {
        token.userId = profile.email;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        // Use email as stable userId, fallback to token.sub
        session.user.id = (token.userId as string) ?? token.sub ?? session.user.email ?? "";
      }
      return session;
    },
  },
});
