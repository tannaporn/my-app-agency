import { NextResponse } from "next/server";

export const authConfig = {
    pages: {
      signIn: "/login",
    },
    providers: [],
    callbacks: {
      // FOR MORE DETAIL ABOUT CALLBACK FUNCTIONS CHECK https://next-auth.js.org/configuration/callbacks
       // If a user object is provided, it means this is a sign-in event
      async jwt({ token, user  }) {
        //console.log("jwt"+token,user)
        if (user) {
          token.id = user.id;
          token.isAdmin = user.isAdmin;
        }
        return token;
      },
      async session({ session, token }) {
       // console.log("session"+session,token)

        // Add user ID and isAdmin to the session if they exist in the token
        session.user = {
          ...session.user,
          id: token.id,
          isAdmin: token.isAdmin,
        };



        return session;
      },
      authorized({ auth, request }) {
        //console.log("authorized"+auth,"request"+request)

        const user = auth?.user;
        const isOnAdminPanel = request.nextUrl?.pathname.startsWith("/admin");
        const isOnBlogPage = request.nextUrl?.pathname.startsWith("/blog");
        const isOnLoginPage = request.nextUrl?.pathname.startsWith("/login");
  
        // ONLY ADMIN CAN REACH THE ADMIN DASHBOARD
  
        if (isOnAdminPanel && !user?.isAdmin) {
          return false;
        }
  
        // ONLY AUTHENTICATED USERS CAN REACH THE BLOG PAGE
  
        if (isOnBlogPage && !user) {
          return false;
        }
  
        // // ONLY UNAUTHENTICATED USERS CAN REACH THE LOGIN PAGE
        // // console.log("isOnLoginPage" + isOnLoginPage,user)
        // // console.log("nextUrl" + new URL("/", request.nextUrl))

        if (isOnLoginPage && user) {
          return Response.redirect(new URL("/", request.nextUrl));
         }
        
  
        return true
      },
    },
  };