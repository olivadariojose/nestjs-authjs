// app/[...proxy]/route.tsx
import { NextRequest } from "next/server";
import { auth } from "../../../libraries/authjs/auth-original";

function stripContentEncoding(result: Response) {
  const responseHeaders = new Headers(result.headers);
  responseHeaders.delete("content-encoding");

  return new Response(result.body, {
    status: result.status,
    statusText: result.statusText,
    headers: responseHeaders,
  });
}

async function handler(request: NextRequest) {
  const session = await auth(); // ← obtiene la sesión actual

  if (!session || !session.accessToken) {
    return new Response("Unauthorized", { status: 401 });
  }

  // Clonar los headers originales
  const headers = new Headers(request.headers);
  headers.set("Authorization", `Bearer ${session.accessToken}`);

  // Cambiar la URL al backend real
  const backendBase = process.env.BACKEND_URL ?? "https://api.mi-backend.com";
  const newUrl = request.nextUrl.href.replace(request.nextUrl.origin, backendBase);

  const result = await fetch(newUrl, {
    method: request.method,
    headers,
    body: request.method !== "GET" && request.method !== "HEAD" ? request.body : undefined,
    redirect: "manual",
  });

  return stripContentEncoding(result);
}

// Exportamos para todos los métodos HTTP necesarios
export const dynamic = "force-dynamic";
export { handler as GET, handler as POST, handler as PUT, handler as DELETE };
