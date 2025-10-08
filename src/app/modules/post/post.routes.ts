import { Router } from "express";
import { postController } from "./post.controller";

const router = Router();

router.get("/", postController.getAllPosts);
router.get("/my-posts/:userId", postController.getPostsByUserId);
router.get("/:id", postController.getPostsById);
router.post("/", postController.createPost);
router.patch("/:id", postController.updatePost);
router.delete("/:id", postController.deletePost);

export const postRoute = router;
