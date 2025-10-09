import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { AuthService } from "./auth.service";

const loginWithEmailPassword = catchAsync(async (req, res) => {
  const result = await AuthService.loginWithEmailPassword(req.body);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "You are login successfully",
    data: result,
  });
});

export const AuthController = {
  loginWithEmailPassword,
};
