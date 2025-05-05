// middleware.ts
import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import { rolePermissions } from "./utils/rolesRoutes"

const secret = process.env.NEXTAUTH_SECRET

export async function middleware(req) {
  console.log("Middleware ejecutado")

  //!agregado
  const pathname = req.nextUrl.pathname


  //  Permitir acceso libre a la página de inicio
  if (pathname === "/") {
    return NextResponse.next()
  }

  const token = await getToken({ req, secret })

  // console.log("Token desde middleware", token)

  // Ruta pública, permitir
  if (!token) {
    console.log("Token no existe, redirigiendo a /signin")
    if (pathname === "/signin") {
      console.log("Token no existe, permitiendo acceso a /signin")
      return NextResponse.next();
    }
    console.log("Token no existe, redirigiendo a /signin")
    return NextResponse.redirect(new URL("/signin", req.url))
  }



  //? si llega a este punto significa que ya esta autenticado
  const mustChangePassword = token.mustBeChangepassword;

  //  Si debe cambiar la contraseña, solo permitir acceso a /changepassword
  if (mustChangePassword) {
    console.log("Token existe, pero debe cambiar la contraseña")
    if (pathname !== "/changePassword") {
      console.log("Token existe, pero no puede acceder a /changepassword")
      return NextResponse.redirect(new URL("/changePassword", req.url));
    }
    console.log("Token existe, permitiendo acceso a /changepassword")
    return NextResponse.next(); // permitir /changepassword
  }

  // Si ya cambió la contraseña, no permitir acceder a /signin ni /changepassword
  if (pathname === "/signin" || pathname === "/changepassword") {
    console.log("Token existe, pero no puede acceder a /signin o /changepassword")
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }


  //!! quitado
  // const pathname = req.nextUrl.pathname
  // const userRole = token.role as keyof typeof rolePermissions
  const userRole = token.rolId?.nameRole as keyof typeof rolePermissions  
  // console.log("token antes de userRole", token)
  // console.log("userRole desde middleware", userRole)
  const allowedPaths = rolePermissions[userRole] || []

  // Permitir acceso si está autorizado
  if (allowedPaths.some(path => pathname.startsWith(path))) {
    console.log("Token existe, y tiene permiso para acceder a la ruta")
    return NextResponse.next()
  }

  // Redirigir si no tiene permiso o podriamos redirigir a una pagina con un mensaje que diga que no tiene permiso
  return NextResponse.redirect(new URL("/dashboard", req.url))
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}
