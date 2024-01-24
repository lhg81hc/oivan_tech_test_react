import { isAuthenticated } from "@/utils/auth_helpers";
import { NextResponse } from "next/server"

const protectedRoutes = ["/welcome"];
const loginRoute = "/login";
const homeRoute = "/";

export function middleware(req) {
  if (!isAuthenticated() && protectedRoutes.includes(req.nextUrl.pathname)) {
    const absoluteURL = new URL(loginRoute, req.nextUrl.origin)
    return NextResponse.redirect(absoluteURL.toString())
  }

  if (isAuthenticated() && req.nextUrl.pathname === loginRoute) {
    const absoluteURL = new URL(homeRoute, req.nextUrl.origin)
    return NextResponse.redirect(absoluteURL.toString())
  }
}
