import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials";
import axios from "axios"


export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials,) {

        let user = null
        try {
          const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
            emailUser: credentials?.email,
            password: credentials?.password
          })

          user = res.data

          if (!user) {
            throw new Error('Invalid credentials')
          }

          return user

        } catch (error) {
          console.log(error)
          return null
        }
      }
    })
  ],
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.lastName = token.lastName as string;
        session.user.email = token.email as string;
        session.user.rolId = token.rolId;
        session.user.accessToken = token.accessToken;
        session.user.refreshToken = token.refreshToken;
        session.user.expiresIn = token.expiresIn;
        session.user.mustBeChangepassword = token.mustBeChangepassword;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.lastName = user.lastName;
        token.email = user.email;
        token.rolId = user.rolId;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.expiresIn = user.expiresIn;
        token.mustBeChangepassword = user.mustBeChangepassword;
      }

      if (Date.now() < (token.expiresIn as number || 0)) {
        return token
      }

      try {
        const response = await axios.post(
          `http://localhost:4000/api/v1/auth/refresh`,
          {}, // No necesitas mandar el refreshToken en el body porque ya tienes al usuario desde el token
          {
            headers: {
              Authorization: `Bearer ${token.refreshToken}`
            }
          }
        )

        const data = response.data
        if (!data?.accessToken) throw new Error("No se recibió nuevo accessToken")
        token.accessToken = data.accessToken
        token.refreshToken = data.refreshToken ?? token.refreshToken
        token.expiresIn = data.expiresIn

        return token;

      } catch (error) {
        console.error("Error al refrescar token:", error)
        return token // Puede que redirijas al login después en otro lugar si deseas
      }
    },
    async authorized({ auth }) {
      // Solo usuarios autenticados pueden continuar
      return !!auth
    },
  },
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/signin" // Opcional: tu página de login personalizada
  },
  debug: process.env.NODE_ENV === "development"
})
