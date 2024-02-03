import { db } from "@/lib/db";
import { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import * as bcrypt from "bcrypt";
import NextAuth from "next-auth/next";


export const authOptions: AuthOptions = {
    providers: [
        Credentials({
        name: "Credentials",
        credentials: {
            email: { label: "E-mail", type: "text" },
            password: { label: "Password", type: "password" }
        },       
        async authorize(credentials) {
            const existingUser = await db.user.findUnique({
                where: { email: credentials?.email }
            });
            if (!existingUser) {
                throw new Error("Invalid credentials");
            }
            
            if (!credentials?.password) throw new Error("Password is required");
            
            // First argument WILL AUTOMATICALLY BE HASHED, the second ALREADY IS (from the database)
            const passwordMatched = await bcrypt.compare(credentials.password, existingUser.password);
            console.log(credentials)

            if (!passwordMatched) {
                throw new Error("Invalid credentials");
            }

            const {password, ...userWithoutPassword} = existingUser
            return userWithoutPassword
        }
        })
    ]
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST}