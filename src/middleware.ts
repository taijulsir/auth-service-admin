import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// This is a simplified middleware for route protection
// In a real production app, you would verify the JWT here
export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // Define public paths
    const publicPaths = ["/login", "/register", "/forgot-password", "/reset-password"]
    const isPublicPath = publicPaths.some(path => pathname.startsWith(path))

    // For mock purposes: we use a cookie to check auth status in middleware
    const isAuthenticated = request.cookies.get("auth_session")

    // If the path is protected and user is not authenticated, redirect to login
    if (pathname.startsWith("/dashboard") && !isAuthenticated) {
        return NextResponse.redirect(new URL("/login", request.url))
    }

    // If user is authenticated and tries to access public paths, redirect to dashboard
    if (isPublicPath && isAuthenticated) {
        return NextResponse.redirect(new URL("/dashboard", request.url))
    }

    return NextResponse.next()
}

// Routes that middleware should run on
export const config = {
    matcher: ["/dashboard/:path*", "/login", "/register", "/reset-password", "/forgot-password"],
}
