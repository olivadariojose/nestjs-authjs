// import { NextRequest } from "next/server"
// import { auth } from "../../../libraries/authjs/auth"

// // Review if we need this, and why
// function stripContentEncoding(result: Response) {
//   const responseHeaders = new Headers(result.headers)
//   responseHeaders.delete("content-encoding")

//   return new Response(result.body, {
//     status: result.status,
//     statusText: result.statusText,
//     headers: responseHeaders,
//   })
// }

// async function handler(request: NextRequest) {
//   const session = await auth()

//   const headers = new Headers(request.headers)
//   headers.set("Authorization", `Bearer ${session?.accessToken}`)

//   let backendUrl =
//     process.env.NEXT_PUBLIC_BACKEND_URL ??
//     "http://localhost:4000/api/v1"

//   let url = request.nextUrl.href.replace(request.nextUrl.origin, backendUrl)
//   let result = await fetch(url, { headers, body: request.body })

//   return stripContentEncoding(result)
// }

// export const dynamic = "force-dynamic"

// export { handler as GET, handler as POST }