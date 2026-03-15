import nextAuth, {DefaultSession} from "next-auth";
import Google from "next-auth/providers/google";
import { SupabaseAdapter } from "@auth/supabase-adapter";

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error("Missing SUPABASE_URL environment variable");
}
if (!process.env.SUPABASE_SERVICE_SECRET_KEY) {
  throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY environment variable");
}

export const { auth, handlers, signIn, signOut } = nextAuth({
  session: {
    strategy: "database",
  },

  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    secret: process.env.SUPABASE_SERVICE_SECRET_KEY!,
  }),

  providers: [Google],

  callbacks: {
    async session({ session, user }) {  // ← "user" not "token" for database strategy
      session.user.id = user.id        // attach the user id to the session
      return session;
    },
  },
});

declare module "next-auth" {
  interface Session {
    user: {
      id: string
    } & DefaultSession["user"]
  }
}