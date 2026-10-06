import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { compare } from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/infrastructure/db/prisma";

const credentialsSchema = z.object({
    email: z.string().trim().regex(/^[^\s@]+@[^\s@]+$/),
    password: z.string().min(1),
    });

    export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    providers: [
        Credentials({
        credentials: {
            email: { label: "Email", type: "email" },
            password: { label: "Password", type: "password" },
        },
        authorize: async (credentials) => {
            const parsed = credentialsSchema.safeParse(credentials);

            if (!parsed.success) {
            return null;
            }

            const { email, password } = parsed.data;

            const user = await prisma.user.findUnique({
            where: { email },
            });

            if (!user?.passwordHash) {
            return null;
            }

            const passwordOk = await compare(password, user.passwordHash);

            if (!passwordOk) {
            return null;
            }

            return {
            id: user.id,
            email: user.email,
            name: user.name,
            };
        },
        }),
    ],
});