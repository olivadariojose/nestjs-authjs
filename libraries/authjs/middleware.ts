// ? SIN ROLES
// import { auth } from "./auth"

// export default auth((req) => {
//     if (!req.auth && req.nextUrl.pathname !== "/signin") {
//         const newUrl = new URL("/signin", req.nextUrl.origin)
//         return Response.redirect(newUrl)
//     }
// })


// export const config = {
//     matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
// }

//? PARA UN ROL
// import { auth } from "./auth";

// export default auth(async (req) => {
//   const session = req.auth;
//   const path = req.nextUrl.pathname;

//   // Redirigir si no está autenticado
//   if (!session && path !== "/signin") {
//     return Response.redirect(new URL("/signin", req.nextUrl.origin));
//   }

//   // Proteger rutas específicas por rol
//   if (path.startsWith("/admin") && session?.user?.role !== "Administrador") {
//     return Response.redirect(new URL("/unauthorized", req.nextUrl.origin));
//   }

//   return null;
// });

// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"]
// };

//? VARIOS ROLES
// import { auth } from "./auth";

// export default auth((req) => {
//     const { auth } = req

//     const userRole = auth?.user?.role
//     const pathname = req.nextUrl.pathname

//     // Si ya está autenticado y entra a /signin, redirigirlo al dashboard
//     if (auth && pathname === "/signin") {
//         return Response.redirect(new URL("/dashboard", req.nextUrl.origin))
//     }

//     if (!auth && pathname !== "/signin") {
//         return Response.redirect(new URL("/signin", req.nextUrl.origin))
//       }

//     // if (!auth) {
//     //     return Response.redirect(new URL("/signin", req.nextUrl.origin))
//     // }



//     // Reglas de acceso por rol y ruta
//     const accessRules: Record<string, RegExp[]> = {
//         Auditor: [/^\/auditor/],
//         Administrador: [/^\/admin/, /^\/dashboard/, /^\/usuarios/],
//         Supervisor: [/^\/supervisor/, /^\/dashboard/],
//         Director: [/^\/director/, /^\/dashboard/, /^\/reportes/],
//         Developer: [/^\/dev/, /^\/admin/, /^\/debug/],
//     }

//     const allowedPaths = accessRules[userRole as keyof typeof accessRules] || []

//     const hasAccess = allowedPaths.some((pattern) => pattern.test(pathname))

//     if (!hasAccess) {
//         return Response.redirect(new URL("/no-autorizado", req.nextUrl.origin))
//     }

//     return null
// })


// import { auth } from "./auth";

// export default auth((req) => {
//   const isLoggedIn = !!req.auth
//   const isSigninPage = req.nextUrl.pathname === "/signin"

//   if (!isLoggedIn && !isSigninPage) {
//     return Response.redirect(new URL("/signin", req.nextUrl.origin))
//   }

//   if (isLoggedIn && isSigninPage) {
//     const role = req.auth?.user?.role

//     // Redirección según rol
//     const roleRedirects: Record<string, string> = {
//       Administrador: "/admin",
//       Auditor: "/auditor",
//       Supervisor: "/supervisor",
//       Director: "/director",
//     }

//     const redirectUrl = roleRedirects[role] ?? "/dashboard"
//     return Response.redirect(new URL(redirectUrl, req.nextUrl.origin))
//   }

//   return null
// })

// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
// }


// import { NextResponse } from "next/server"
// import type { NextRequest } from "next/server"
// import { auth } from "./auth"

// export async function middleware(request: NextRequest) {
//   const session = await auth()

//   const protectedRoutes = ["/dashboard", "/admin"] // etc.

//   const isProtected = protectedRoutes.some((path) =>
//     request.nextUrl.pathname.startsWith(path)
//   )

//   if (isProtected && !session) {
//     const signInUrl = new URL("/signin", request.url)
//     signInUrl.searchParams.set("callbackUrl", request.nextUrl.pathname)
//     return NextResponse.redirect(signInUrl)
//   }

//   return NextResponse.next()
// }

// export const config = {
//   matcher: ["/dashboard/:path*", "/admin/:path*"], // rutas a proteger
// }


import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

const secret = process.env.NEXTAUTH_SECRET

export async function middleware(request: NextRequest) {

  console.log('------------------------------------------------------------------se ejecuto el middeware')
  const token = await getToken({ req: request, secret })

  const isProtected = ["/dashboard", "/admin"].some((path) =>
    request.nextUrl.pathname.startsWith(path)
  )

  if (isProtected && !token) {
    const signInUrl = new URL("/signin", request.url)
    signInUrl.searchParams.set("callbackUrl", request.nextUrl.pathname)
    return NextResponse.redirect(signInUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"]
}