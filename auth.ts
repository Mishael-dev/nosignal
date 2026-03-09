import nextAuth from "next-auth";
import Google from "next-auth/providers/google";

import { JWT } from "next-auth/jwt";
import { SupabaseAdapter } from "@auth/supabase-adapter";

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error("Missing SUPABASE_URL environment variable");
}
if (!process.env.SUPABASE_SERVICE_SECRET_KEY) {
  throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY environment variable");
}

interface SalesforceRefreshResponse {
  access_token: string;
  instance_url: string;
  id: string;
  token_type: string;
  issued_at: string;
  signature: string;
  refresh_token?: string;
  expires_in?: number;
}

async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    const url = "https://login.salesforce.com/services/oauth2/token";

    const params = new URLSearchParams({
      grant_type: "refresh_token",
      client_id: process.env.AUTH_SALESFORCE_ID!,
      client_secret: process.env.AUTH_SALESFORCE_SECRET!,
      refresh_token: token.refreshToken as string,
    });

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params,
    });

    const refreshed = (await response.json()) as SalesforceRefreshResponse;

    if (!response.ok) throw refreshed;

    return {
      ...token,
      accessToken: refreshed.access_token,
      accessTokenExpires: Date.now() + (refreshed.expires_in ?? 3600) * 1000,
      refreshToken: refreshed.refresh_token ?? token.refreshToken,
      instanceUrl: refreshed.instance_url,
    };
  } catch (err) {
    console.error("Failed to refresh Salesforce token:", err);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
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
    authorized({ request, auth }) {
      return true;
    },

    jwt({ token, trigger, session, account }) {
      if (account) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          userId: account.id,
          accessTokenExpires:
            Date.now() +
            (account.expires_in ? account.expires_in * 1000 : 3600 * 1000),
        };
      }

      if (Date.now() < (token.accessTokenExpires as number)) {
        return token;
      }

      return refreshAccessToken(token);
    },

    async session({ session, token }) {
      return session;
    },
  },
});

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpires?: number;
    instanceUrl?: string;
    error?: string;
  }

  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpires?: number;
    instanceUrl?: string;
    error?: string;
  }
}