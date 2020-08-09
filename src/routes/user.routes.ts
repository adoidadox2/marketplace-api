import { Router } from "express";
import UserController from "../controllers/UserController";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const userRouter = Router();

userRouter.post("/", UserController.store);

userRouter.use(ensureAuthenticated);
userRouter.get("/", UserController.index);
userRouter.put("/:id", UserController.update);
userRouter.get("/:id", UserController.show);
userRouter.delete("/:id", UserController.delete);

export default userRouter;
