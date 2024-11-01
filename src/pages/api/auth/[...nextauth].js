import NextAuth from 'next-auth'
import SpotifyProvider from 'next-auth/providers/spotify'

var scope = "user-library-read user-read-email user-read-private user-top-read user-read-playback-position user-read-recently-played playlist-read-private user-read-currently-playing"

async function refreshAccessToken(token) {
  try {
    const url = "https://accounts.spotify.com/api/token"
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64')}`,
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: token.refreshToken,
      }),
    })
    
    const refreshedTokens = await response.json()
    
    if (!response.ok) {
      throw refreshedTokens
    }
    
    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      expires_at: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
    }
  } catch (error) {
    console.error("Failed to refresh access token", error)
    return {
      ...token,
      error: "RefreshAccessTokenError",
    }
  }
}

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
        token.accessToken = account.access_token
        token.refreshToken = account.refresh_token
        token.expires_at = Date.now() + account.expires_in * 1000
      }
      
      if (Date.now() < token.expires_at) {
        return token
      }
      
      return await refreshAccessToken(token)
    },
    async session({ session, token }) {
      session.user = token
      return session
    },
  },
  pages: {
    signIn: "http://localhost:3000/api/auth/callback/spotify",
  },
})
