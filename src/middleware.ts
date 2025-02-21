import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/dashboard"];

const publicRoutes = ["/"];

export function middleware(req: NextRequest) {
    const session = req.cookies.get("next-auth.session-token") || req.cookies.get("__Secure-next-auth.session-token");

    const pathname = req.nextUrl.pathname;

    if (protectedRoutes.some((route) => pathname.startsWith(route)) && !session) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    if (publicRoutes.includes(pathname) && session) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/"],
};
