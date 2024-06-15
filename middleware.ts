import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/organization(.*)",
  "/board(.*)",
]);

export default clerkMiddleware(
  (auth, req) => {
    if (isProtectedRoute(req)) {
      auth().protect();
    } else if (auth().userId && !isProtectedRoute(req)) {
      let path = "/select-org";

      if (auth().orgId) {
        path = `/organization/${auth().orgId}`;
      }

      // Check if we're not already on the redirect target
      if (req.nextUrl.pathname !== path) {
        const orgSelection = new URL(path, req.url);
        return NextResponse.redirect(orgSelection);
      }
    }

    // if (!auth().userId && !isProtectedRoute(req)) {
    //   return auth().redirectToSignIn({ returnBackUrl: req.url });
    // }

    // if (
    //   auth().userId &&
    //   !auth().orgId &&
    //   req.nextUrl.pathname !== "/select-org"
    // ) {
    //   const orgSelection = new URL("/select-org", req.url);
    //   return NextResponse.redirect(orgSelection);
    // }
  }
  // { debug: true }
);

// export default clerkMiddleware();

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
