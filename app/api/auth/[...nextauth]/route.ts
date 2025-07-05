import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: 'ID', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        //@ts-expect-error
                        username: credentials.username,
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        //@ts-expect-error
                        password: credentials.password
                    }),
                })

                if (!res.ok) return null
                const { id, accessToken, refreshToken } = await res.json()

                return {
                    id,
                    accessToken,
                    refreshToken
                }
            },
        }),
    ],
    session: { strategy: 'jwt' },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-expect-error
                token.accessToken = user.accessToken
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-expect-error
                token.refreshToken = user.refreshToken
            }
            return token
        },
        async session({ session, token }) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-expect-error
            session.accessToken = token.accessToken
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-expect-error
            session.refreshToken = token.refreshToken
            return session
        }
    },
})
export { handler as GET, handler as POST }