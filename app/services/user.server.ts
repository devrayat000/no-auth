import { db } from "~/modules/db.server";

export function getFullUser(id: string) {
  return db.user.findUnique({
    where: { id },
    select: {
      id: true,
      createdAt: true,
      provider: true,
      localUser: {
        select: {
          email: true,
          username: true,
          user: {
            select: {
              id: true,
              createdAt: true,
              provider: true,
            },
          },
        },
      },
    },
  });
}
