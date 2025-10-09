import { Router } from "express";
import { authRouter } from "../modules/auth/auth.routes";
import { postRoute } from "../modules/post/post.routes";
import { userRoute } from "../modules/user/user.routes";

interface IRoute {
  router: Router;
  path: string;
}

export const router = Router();

const moduleRoutes: IRoute[] = [
  {
    router: userRoute,
    path: "/users",
  },
  {
    router: postRoute,
    path: "/posts",
  },
  {
    router: authRouter,
    path: "/auth",
  },
];

moduleRoutes.forEach((module) => router.use(module.path, module.router));
