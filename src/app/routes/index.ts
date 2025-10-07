import { Router } from "express";
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
];

moduleRoutes.forEach((module) => router.use(module.path, module.router));
