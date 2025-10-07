import { Prisma, User } from "@prisma/client";
import { prisma } from "../../config/db";

const createUser = async (payload: Prisma.UserCreateInput): Promise<User> => {
  const result = await prisma.user.create({
    data: payload,
  });
  return result;
};

const getUsers = async () => {
  const users = await prisma.user.findMany({
    select: {
      user_id: true,
      name: true,
      email: true,
      phone: true,
      createdAt: true,
      role: true,
      picture: true,
      status: true,
      updatedAt: true,
      isVerified: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return users;
};

const getUserById = async (id: number) => {
  const users = await prisma.user.findUniqueOrThrow({
    where: { user_id: id },
    select: {
      user_id: true,
      name: true,
      email: true,
      phone: true,
      createdAt: true,
      role: true,
      picture: true,
      status: true,
      updatedAt: true,
      isVerified: true,
      Post: true,
    },
  });
  return users;
};

const updateUser = async (id: number, payload: Prisma.UserUpdateInput) => {
  const result = await prisma.user.update({
    where: { user_id: id },
    data: payload,
  });
  return result;
};
const deleteUser = async (id: number) => {
  const result = await prisma.user.delete({
    where: { user_id: id },
  });
  return result;
};

export const userService = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
