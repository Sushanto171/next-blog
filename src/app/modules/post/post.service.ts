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

const getAllPosts = async ({
  page,
  limit,
  search,
  tags,
  isFeatured,
  sortby,
  orderby,
}: {
  page: number;
  limit: number;
  search?: string;
  tags?: string;
  isFeatured?: boolean;
  sortby: string;
  orderby: string;
}) => {
  const where: any = {
    AND: [
      search && {
        OR: [
          {
            title: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            content: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      },
      tags && {
        tags: {
          hasEvery: tags.split(","),
        },
      },
      ...[typeof isFeatured === "boolean" && { isFeatured }],
    ].filter(Boolean),
  };

  const result = await prisma.post.findMany({
    where,
    skip: limit * (page - 1),
    take: limit,
    orderBy: {
      [sortby]: orderby,
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

  const total = await prisma.post.count({ where });
  return {
    data: result,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
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
  return result;
};

const getPostsById = async (id: number) => {
  return prisma.$transaction(async (tx) => {
    const res = await tx.post.update({
      where: {
        post_id: id,
      },
      data: {
        views: { increment: 1 },
      },
    });

    return await tx.post.findUniqueOrThrow({
      where: {
        post_id: id,
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

const stats = async () => {
  return await prisma.$transaction(async (tx) => {
    const aggregates = await tx.post.aggregate({
      _count: true,
      _max: { views: true },
      _min: { views: true },
      _sum: { views: true },
      _avg: { views: true },
    });

    const isFeatured = await tx.post.count({ where: { isFeatured: true } });

    const topPost = await tx.post.findFirst({
      where: { isFeatured: true },
      orderBy: { views: "desc" },
    });

    return {
      totalPosts: aggregates._count,
      maxViews: aggregates._max.views,
      minViews: aggregates._min.views,
      totalViews: aggregates._sum.views,
      avgViews: aggregates._avg.views,
      featuredPosts: isFeatured,
      topPost,
    };
  });
};

export const postService = {
  createPost,
  getAllPosts,
  getPostsByUserId,
  updatePost,
  deletePost,
  getPostsById,
  stats,
};
