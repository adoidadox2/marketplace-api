import { Router } from "express";
import SaleController from "../controllers/SaleController";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const saleRouter = Router();

saleRouter.use(ensureAuthenticated);
saleRouter.get("/", SaleController.index);
saleRouter.post("/:purchaseId", SaleController.store);
// saleRouter.get("/:id", SaleController.show);

export default saleRouter;
