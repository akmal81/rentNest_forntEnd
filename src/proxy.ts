import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { JwtPayload } from "jsonwebtoken"


import { cookies } from 'next/headers'
import { jwtUtils } from './utils/jwt'
import { getNewAccessTokenByRefreshToken } from './service/refreshToken'

const AUTH_ROUTES = [
    "/login",
    "/register"
]

const PUBLIC_ROUTES = [
    "/",
    "/properties",
]


export async function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname

    const cookieStore = await cookies()


    const refreshToken = request.cookies.get("refreshToken")?.value
    //* decode refresh token useing jwt.decode
    const decodedRefreshToken = refreshToken ? jwtUtils.verifiedToken(refreshToken, process.env.JWT_REFRESH_SECRET as string) : null

    //* declare accessToken with let
    let accessToken = request.cookies.get("accessToken")?.value;

    //* decodedAccessTOken using jwt variable should be let
    let decodedAccessToken = accessToken ? jwtUtils.verifiedToken(accessToken, process.env.JWT_ACCESS_SECRET as string) : null;

    if (!decodedAccessToken?.success && decodedRefreshToken?.success) {
        const result = await getNewAccessTokenByRefreshToken()
        if (result.success) {
            const newAccessToken = result.data.accessToken;
            cookieStore.set("accessToken", newAccessToken, {
                httpOnly: true,
                maxAge: 60 * 60 * 24,
                sameSite: 'lax'
            })

            accessToken = newAccessToken;
            decodedAccessToken = jwtUtils.verifiedToken(accessToken!, process.env.JWT_ACCESS_SECRET as string)

        }
    }

    let userRole = null;

    if (!decodedAccessToken?.success) {
        cookieStore.delete("accessToken")
    }

    if (decodedAccessToken?.success && decodedAccessToken.data) {
        userRole = (decodedAccessToken.data as JwtPayload).role;
    }



    if (decodedAccessToken && AUTH_ROUTES.includes(pathname)) {
        if (userRole === "TENANT") {
            return NextResponse.redirect(new URL('/dashboard/tenant', request.url))
        }
        else if (userRole === "LANDLORD") {
            return NextResponse.redirect(new URL('/dashboard/landlord', request.url))
        }
        else if (userRole === "ADMIN") {
            return NextResponse.redirect(new URL('/dashboard/admin', request.url))
        } else {
            return NextResponse.redirect(new URL('/', request.url))
        }
    }


    const isPublic = PUBLIC_ROUTES.some((route) => pathname === route || pathname.startsWith(route + "/"));
    const isAuthRoute = AUTH_ROUTES.some((route) => pathname === route || pathname.startsWith(route + "/"));


    if (!accessToken && !isPublic && !isAuthRoute) {

        const loginUrl = new URL('/login', request.url)
        loginUrl.searchParams.set("RedirectTo", pathname)
        return NextResponse.redirect(loginUrl)

    }



    if (pathname.startsWith("/dashboard/tenant") && userRole !== "TENANT") {
        return NextResponse.redirect(new URL('/not-found', request.url))
    }
    else if (pathname.startsWith("/dashboard/landlord") && userRole !== "LANDLORD") {
        return NextResponse.redirect(new URL('/not-found', request.url))
    }
    else if (pathname.startsWith("/dashboard/admin") && userRole !== "ADMIN") {
        return NextResponse.redirect(new URL('/not-found', request.url))
    }




    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!api|_next/static|favicon.ico|_next/image|.*\\.png$).*)'],
}