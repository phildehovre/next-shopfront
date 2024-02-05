import { db } from "@/lib/db";
import { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import * as bcrypt from "bcrypt";
import NextAuth from "next-auth/next";
import { getUserByEmail } from "@/data/user";
import { LoginSchema} from "@/schemas";

export const authOptions: AuthOptions = {
    pages: {
    },
    callbacks: {
        async jwt({token, user}) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({session, token}:{session: any, token: any}) {
                session.id = token.id;
            return session;
        },
        async signIn({user, account, profile, email, credentials}) {
            const isAllowedToSignIn = true;
            if (user && isAllowedToSignIn) {
                return true;
            }
            return false;
        }

    },
    providers: [
        Credentials({
        name: "Credentials",
        credentials: {
            email: { label: "E-mail", type: "text" },
            password: { label: "Password", type: "password" }
        },       
        async authorize(credentials) {
            const validatedFields = LoginSchema.safeParse(credentials);
    
            if (validatedFields.success) {
              const { email, password } = validatedFields.data;
              
              const user = await getUserByEmail(email);
              if (!user || !user.password) return null;
    
              const passwordsMatch = await bcrypt.compare(
                password,
                user.password,
              );
              if (passwordsMatch) return user;
            }
    
            return null;
          }
        })
    ]
}


const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };