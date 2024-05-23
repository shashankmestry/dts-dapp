import NextAuth from "next-auth"
import TwitterProvider from 'next-auth/providers/twitter';

const handler = NextAuth({
    providers: [
        TwitterProvider({
            clientId: process.env.TWITTER_CLIENT_ID || "",
            clientSecret: process.env.TWITTER_CLIENT_SECRET || "",
            version: '2.0',
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async session({ session, token, user }) {
            // Add the user's Twitter handle to the session object
            session.user.fullname = session.user.name
            session.user.name = token.username;
            return session;
        },
        async jwt({ token, account, profile }) {
            if (account?.provider === 'twitter') {
                token.username = profile.data.username; // Twitter handle is in profile.data.username
            }
            return token;
        },
    },
    // debug: true,
})

export { handler as GET, handler as POST }