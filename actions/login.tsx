"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import NextAuth from "next-auth";

export async function loginUser(user: { email: string; password: string }) {
  console.log(user);
}
