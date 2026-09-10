import { clerkMiddleware } from '@clerk/nextjs/server'

// Default clerkMiddleware() is permissive: it attaches auth state but does
// not block unauthenticated users. That is intentional here — /f/[fileId]
// share links must stay public. To lock down the dashboard later, use
// createRouteMatcher(['/upload(.*)', '/files(.*)', '/file-preview(.*)'])
// with auth.protect().
export default clerkMiddleware();

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)','/f/(.*)',
  ],
}