"use server";

import { getProviders, signIn } from "next-auth/react";

export async function loginUser(user: { email: string; password: string }) {
  console.log("Logging in: ", user);
}
