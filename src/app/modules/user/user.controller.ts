import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { userService } from "./user.service";

const createUser = catchAsync(async (req, res) => {
  const result = await userService.createUser(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "User created successfully",
    data: result,
  });
});

const getUsers = catchAsync(async (req, res) => {
  const result = await userService.getUsers();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Retrieve Users data successfully",
    data: result,
  });
});

const getUserById = catchAsync(async (req, res) => {
  const result = await userService.getUserById(Number(req.params.id));

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Retrieve Users data successfully",
    data: result,
  });
});

const updateUser = catchAsync(async (req, res) => {
  const result = await userService.updateUser(Number(req.params.id), req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Users updated successfully",
    data: result,
  });
});

const deleteUser = catchAsync(async (req, res) => {
  const result = await userService.deleteUser(Number(req.params.id));

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Users Deleted successfully",
    data: result,
  });
});

export const userController = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
