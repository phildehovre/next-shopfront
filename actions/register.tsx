"use server";

import { db } from "@/lib/db";
import { User } from "@prisma/client";
import * as bcrypt from "bcrypt";

export async function registerUser(user: Omit<User, "id">) {
  let error, success;
  const hashedPassword = await bcrypt.hash(user.password, 12);
  try {
    const result = await db.user.create({
      data: {
        ...user,
        password: hashedPassword,
      },
    });
    if (result) {
      return { user, success: "User created successfully" };
    }
  } catch (error) {
    return { error: "User already exists" };
  }

  return { user, error, success };
}
