import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { postService } from "./post.service";

const createPost = catchAsync(async (req, res) => {
  const result = await postService.createPost(req.body);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Post created successfully!",
    data: result,
  });
});

const getAllPosts = catchAsync(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const search = (req.query.search as string) || "";
  const tags = (req.query.tags as string) || undefined;
  const isFeatured = req.query.isFeatured
    ? req.query.isFeatured === "true"
    : undefined;
  const sortby = (req.query.sortby as string) || "createdAt";
  const orderby = (req.query.orderby as string) || "desc";

  const result = await postService.getAllPosts({
    page,
    limit,
    search,
    tags,
    isFeatured,
    sortby,
    orderby,
  });

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Posts retrieved successfully!",
    ...result,
  });
});

const getPostsByUserId = catchAsync(async (req, res) => {
  const result = await postService.getPostsByUserId(Number(req.params.userId));

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Posts retrieved successfully!",
    data: result,
  });
});

const getPostsById = catchAsync(async (req, res) => {
  const result = await postService.getPostsById(Number(req.params.id));

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Posts retrieved successfully!",
    data: result,
  });
});

const updatePost = catchAsync(async (req, res) => {
  const result = await postService.updatePost(Number(req.params.id), req.body);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Posts updated successfully!",
    data: result,
  });
});

const deletePost = catchAsync(async (req, res) => {
  const result = await postService.deletePost(Number(req.params.id));

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Posts deleted successfully!",
    data: result,
  });
});

export const postController = {
  createPost,
  getAllPosts,
  getPostsByUserId,
  updatePost,
  deletePost,
  getPostsById,
};
