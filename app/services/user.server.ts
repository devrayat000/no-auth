import { db } from "~/modules/db.server";
import { unauthorized } from "./cookie.server";

export async function getFullUser(id: string) {
  try {
    return await db.account.findUniqueOrThrow({
      where: { id },
      select: {
        id: true,
        provider: true,
        providerAccountId: true,
        createdAt: true,
        updatedAt: true,
        user: {
          select: {
            id: true,
            email: true,
            username: true,
            image: true,
            emailVerified: true,
          },
        },
      },
    });
  } catch (error) {
    console.log(error);
    throw unauthorized();
  }
}
