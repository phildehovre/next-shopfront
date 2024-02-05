import { db } from "@/lib/db";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({ where: { email } });
    
    console.log("getUserByEmail", email, user)
    return user;
  } catch (err: any){
    console.log("getUserByEmail error", err)
    throw new Error(err)
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({ where: { id } });

    return user;
  } catch {
    return null;
  }
};


export const getAccountByUserId = async (id: string) => {
  try {
      const user = await db.user.findUnique({
          where: {id}
       })
      return user
} catch {
   return null
}
}