import NextAuth from 'next-auth'
import SpotifyProvider from 'next-auth/providers/spotify'

var scope = "user-library-read user-read-email user-read-private user-top-read user-read-playback-position user-read-recently-played playlist-read-private user-read-currently-playing"

export default NextAuth({
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      authorization: {
        params: { scope },
      },
    }),
  ],
  secret: process.env.SECRET,
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.id = account.id;
        token.expires_at = account.expires_at * 10000;
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token;
      session.user.refreshToken = token.refreshToken;
      session.user.username = token.username;
      return session;
    },
    async signIn({ user, account, profile, email, credentials }) {
      return true
    },
  },
  pages: {
    signIn: "http://localhost:3000/api/auth/callback/spotify",
  },
})
