import { Prisma } from "@prisma/client";
import { prisma } from "../../config/db";

const createPost = async (payload: Prisma.PostCreateInput) => {
  const result = await prisma.post.create({
    data: payload,
    include: {
      author: {
        select: {
          name: true,
          email: true,
          phone: true,
          role: true,
        },
      },
    },
  });
  return result;
};

const getAllPosts = async () => {
  const result = await prisma.post.findMany({
    include: {
      author: {
        select: {
          name: true,
          email: true,
          phone: true,
          role: true,
        },
      },
    },
  });
  return result;
};

const getPostsByUserId = async (userId: number) => {
  const result = await prisma.post.findMany({
    where: {
      authorId: userId,
    },
    include: {
      author: {
        select: {
          name: true,
          email: true,
          phone: true,
          role: true,
        },
      },
    },
  });
};

const updatePost = async (id: number, payload: Prisma.PostUpdateInput) => {
  const result = await prisma.post.update({
    where: {
      post_id: id,
    },
    data: payload,
  });
  return result;
};

const deletePost = async (id: number) => {
  const result = await prisma.post.delete({ where: { post_id: id } });
  return result;
};

export const postService = {
  createPost,
  getAllPosts,
  getPostsByUserId,
  updatePost,
  deletePost,
};
