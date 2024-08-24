const { Router } = require("express");

const indexRouter = Router();
const indexController = require("../controllers/indexController");

indexRouter.get("/", indexController.getHomeContent);
indexRouter.get(
  "/category/:brand_id",
  indexController.getModelsByBrandCategory
);
indexRouter.get(
  "/category/type/:vehicle_type",
  indexController.getModelsByVehicleType
);

indexRouter.get("/model/:model_id", indexController.getPartsByModel);

indexRouter.get("/item/:part_id", indexController.getPartById);
// indexRouter.get("/edit/part/:part_id", indexController.getEditForm);
// indexRouter.post("/edit/part/:part_id", indexController.postPart);

module.exports = indexRouter;
