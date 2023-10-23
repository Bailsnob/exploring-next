import { NextResponse } from "next/server";
import * as jose from "jose";
import CONSTANTS from "./app/constants";

// not default because we want to export other things
export async function middleware(req) {
  // we need async for this to happen first
  const token = req.cookies.get("next-jwt")?.value;

  if (req.nextUrl.pathname.startsWith("/api")) {
    // api guard
    if (!token) {
      return NextResponse.json(
        {
          errorMessage: "not authenticated",
        },
        { status: 401 }
      );
    }

    // api processor
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    try {
      const result = await jose.jwtVerify(token, secret);
      if (req.nextUrl.pathname.startsWith("/api/admin") && result.payload.role !== CONSTANTS.USER_ROLE.ADMIN) {
        return NextResponse.json(
          { status: CONSTANTS.RESPONSE_STATUS.ERROR, data: "forbidden" },
          { status: 403 }
        );
      } 
    } catch (err) {
      return NextResponse.json(
        { errorMessage: "not authenticated" },
        { status: 401 }
      );
    }
  } else {
    // page guard
    const url =
      req.nextUrl.origin +
      "/login?callbackUrl=" +
      encodeURIComponent(req.nextUrl.pathname);
    if (!token) return NextResponse.redirect(url);

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    try {
      const result = await jose.jwtVerify(token, secret);
      if (req.nextUrl.pathname.startsWith("/admin") && result.payload.role !== CONSTANTS.USER_ROLE.ADMIN) {
        return NextResponse.redirect(req.nextUrl.origin + "/403");
      }
    } catch (err) {
      return NextResponse.redirect(url);
    }
  }
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/user/:path*",
    "/api/admin/:path*",
    "/api/user/:path*",
  ], // using array for multiple paths; regex can make it more sophisticated
};
