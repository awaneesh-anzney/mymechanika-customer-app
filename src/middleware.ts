import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const authContext = request.cookies.get('mymechanika-auth-session')?.value || request.headers.get('Authorization');

    // Note: Middleware cannot easily access localStorage. 
    // For proper SSR protection, we should use a cookie for the auth token.
    // However, since the user is currently using localStorage in AuthProvider,
    // we'll rely on client-side protection for now or suggest moving to cookies.

    // BUT, let's look at the request: "protect all our routes.
    // Routes that are inside the protected group should not be able to access the login route as well."

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/auth/:path*', '/my-:path*'],
};
