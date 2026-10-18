import type { NextAuthConfig } from "next-auth";

export const authConfig = {
    pages: {
        signIn: "/login",
    },
    providers: [],
    callbacks: {
        authorized({ auth, request }) {
        const isLoggedIn = !!auth?.user;
        const isLoginPage = request.nextUrl.pathname === "/login";

        if (isLoginPage) {
            return true;
        }

        return isLoggedIn;
        },
    },
} satisfies NextAuthConfig;