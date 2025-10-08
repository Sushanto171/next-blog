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
  const result = await postService.getAllPosts();

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Posts retrieved successfully!",
    data: result,
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
