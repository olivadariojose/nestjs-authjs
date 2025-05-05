// middleware.ts
import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import { rolePermissions } from "./utils/rolesRoutes"

const secret = process.env.NEXTAUTH_SECRET

export async function middleware(req) {

  //!agregado
  const pathname = req.nextUrl.pathname


  //  Permitir acceso libre a la página de inicio
  if (pathname === "/") {
    return NextResponse.next()
  }

  console.log("Middleware ejecutado")
  const token = await getToken({ req, secret })

  // Ruta pública, permitir
  if (!token) {
    return NextResponse.redirect(new URL("/signin", req.url))
  }

  
  //!! quitado
  // const pathname = req.nextUrl.pathname
  const userRole = token.role as keyof typeof rolePermissions
  const allowedPaths = rolePermissions[userRole] || []

  // Permitir acceso si está autorizado
  if (allowedPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next()
  }

  // Redirigir si no tiene permiso
  return NextResponse.redirect(new URL("/unauthorized", req.url))
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}
