import { Router } from "express";
import AdController from "../controllers/AdController";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const adRouter = Router();

adRouter.use(ensureAuthenticated);
adRouter.post("/", AdController.store);
adRouter.get("/", AdController.index);

export default adRouter;
