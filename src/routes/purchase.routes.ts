import { Router } from "express";
import PurchaseController from "../controllers/PurchaseController";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const purchaseRouter = Router();

purchaseRouter.use(ensureAuthenticated);
purchaseRouter.get("/", PurchaseController.index);
purchaseRouter.post("/", PurchaseController.store);
// purchaseRouter.get("/:id", PurchaseController.show);

export default purchaseRouter;
