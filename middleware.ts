import { NextRequest, NextResponse } from "next/server";

const PUBLIC_PATHS = ["/", "/login", "/api"];

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Public paths - allow always
    if (PUBLIC_PATHS.some((p) => pathname.startsWith(p))) {
        return NextResponse.next();
    }

    // Check auth token
    const token = request.cookies.get("bayzo_session")?.value;

    if (!token) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/home/:path*", "/cart/:path*", "/payment/:path*", "/orders/:path*", "/area/:path*", "/basic-details/:path*"],
};