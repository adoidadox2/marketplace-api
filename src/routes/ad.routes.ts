import { Router } from "express";
import AdController from "../controllers/AdController";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const adRouter = Router();

adRouter.use(ensureAuthenticated);
adRouter.post("/", AdController.store);
adRouter.get("/", AdController.index);
adRouter.get("/:id", AdController.show);
adRouter.put("/:id", AdController.update);
adRouter.delete("/:id", AdController.delete);

export default adRouter;
