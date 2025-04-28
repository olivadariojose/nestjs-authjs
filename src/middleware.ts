import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    console.log('El token del middleware-------------------------------------------------------------------------- : ', token)
    return
    const { pathname } = req.nextUrl;
    if (!token) {
        if (pathname !== "/signin") {
            return NextResponse.redirect(new URL("/signin", req.url));
        }
        return NextResponse.next(); // Dejar pasar al login
    }

    // Usuario autenticado y esPrimerLogin es true
    if (token.esPrimerLogin) {
        if (pathname !== "/changePassword") {
            return NextResponse.redirect(new URL("/changePassword", req.url));
        }
        return NextResponse.next(); // Permitir entrar a cambiar password
    }

    // Usuario autenticado y esPrimerLogin es false
    if (pathname === "/signin" || pathname === "/changePassword") {
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();

    return

    // const { pathname } = req.nextUrl;

    // Si no está autenticado, deja pasar (Auth.js maneja las rutas protegidas por sí solo)
    if (!token) return NextResponse.next();

    const mustChange = token.mustBeChangePassword;

    // const isOnChangePasswordPage = pathname === "/change-password";
    const isOnChangePasswordPage = pathname === "/test";

    if (mustChange && !isOnChangePasswordPage) {
        const url = req.nextUrl.clone();
        // url.pathname = "/change-password";
        url.pathname = "/test";
        return NextResponse.redirect(url);
    }

    if (!mustChange && isOnChangePasswordPage) {
        const url = req.nextUrl.clone();
        url.pathname = "/";
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

// export async function middleware(req: NextRequest) {
//     const url = req.nextUrl.clone();
//     url.pathname = "test"; // prueba de redirección
//     return NextResponse.redirect(url);
// }

// export const config = {
//     matcher: [
//         "/((?!api|_next/static|_next/image|favicon.ico).*)",
//     ],
// };

export const config = {
    // matcher: ["/dashboard/:path*", "/login", "/changePassword],
    matcher: ["/dashboard", "/signin", "/changePassword"],
};