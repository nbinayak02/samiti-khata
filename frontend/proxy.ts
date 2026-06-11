import { NextRequest, NextResponse } from "next/server";

const publicRoutes = ["/login", "/request-access"];

export function proxy(request: NextRequest) {
  // console.log("proxy is running");
  // const { pathname } = request.nextUrl;
  // const token = request.cookies.get("access_token");

  // if (!token && !publicRoutes.includes(pathname))
  //   return NextResponse.redirect(new URL("/login", request.url));

  // if (token && publicRoutes.includes(pathname))
  //   return NextResponse.redirect(new URL("/dashboard/", request.url));

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
