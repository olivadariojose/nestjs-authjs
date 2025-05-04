import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import axios from "axios"

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log('authroize')
        console.log('authroize-credentials: ', credentials)
        try {
          const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
            emailUser: credentials?.email,
            password: credentials?.password
          })

          const data = res.data

          if (data?.user && data?.backendTokens?.accessToken) {
            return {
              ...data.user,
              accessToken: data.backendTokens.accessToken,
              refreshToken: data.backendTokens.refreshToken,
              expiresIn: data.backendTokens.expiresIn
            }
          }

          return null
        } catch (error) {
          console.error("Login failed:", error.response?.data || error)
          return null
        }
      }
    })
  ],

  session: {
    strategy: "jwt"
  },
  callbacks: {
    async jwt({ token, user }) {
      console.log('callbacks-jwt-token: ', token)
      console.log('callbacks-jwt-user: ', user)
      // Primera vez que se crea el token (inicio de sesión)
      // if (user) {
      //   token.accessToken = user.accessToken
      //   token.refreshToken = user.refreshToken
      //   token.expiresIn = user.expiresIn
      //   token.user = user
      //   token.role = user.rolId?.nameRole || 'user'
      //   return token
      // }

      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.expiresIn = user.expiresIn;
        token.user = user;
        token.role = user.rolId?.nameRole || "user";
        token.mustBeChangePassword = user.mustBeChangePassword; // <-- Agregar esto
        console.log('callbacks-jwt-if(user) return token: ', token)
        return token;
      }

      // Si el token aún es válido, regresarlo sin cambios
      if (Date.now() < (token.expiresIn as number || 0)) {
        return token
      }

      // Si expiró, intentar renovarlo con refreshToken
      try {
        // const response = await axios.post(`http://localhost:4000/api/v1/auth/refresh`, {
        //   refreshToken: token.refreshToken
        // })

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

        // Guardar nuevos valores en el token
        token.accessToken = data.accessToken
        token.refreshToken = data.refreshToken ?? token.refreshToken
        token.expiresIn = data.expiresIn
        console.log('callbacks-jwt- data=response.data- return token: ', token)
        return token
      } catch (error) {
        console.error("Error al refrescar token:", error)
        return token // Puede que redirijas al login después en otro lugar si deseas
      }
    },

    // async session({ session, token }) {
    //   session.accessToken = token.accessToken as string
    //   session.user = token.user
    //   session.user.role = token.role
    //   return session
    // },
    async session({ session, token }) {
      console.log('callbacks-session-session: ', session)
      console.log('callbacks-session-token: ', token)
      session.accessToken = token.accessToken as string;
      session.user = token.user;
      session.user.role = token.role;
      session.user.mustBeChangePassword = token.mustBeChangePassword; // <-- Agregar esto
      console.log('callbacks-session-session- return session: ', session)
      return session;
    },

    authorized: async ({ auth }) => !!auth
  },
  pages: {
    signIn: "/signin" // Opcional: tu página de login personalizada
  },
  // debug: process.env.NODE_ENV === "development"
})

declare module "next-auth" {

  interface Session {
    accessToken?: string
    user?: any
  }

  interface Rol {
    nameRole?: string
  }

  interface User {
    accessToken?: string
    refreshToken?: string
    expiresIn?: number
    rolId?: Rol
    mustBeChangePassword?: boolean
  }
}

declare module "next-auth" {
  interface JWT {
    accessToken?: string
    refreshToken?: string
    expiresIn?: number
    user?: any
  }
}
