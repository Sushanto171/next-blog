import { User } from "@prisma/client";
import { prisma } from "../../config/db";

const createUser = async (payload: User) => {
  const result = await prisma.user.create({
    data: payload,
  });
  return result;
};

export const userService = {
  createUser,
};
