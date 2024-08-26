const { Router } = require("express");

const formRouter = Router();
const formController = require("../controllers/formController");

formRouter.get("/edit/part/:part_id", formController.getEditForm);
formRouter.post("/edit/part/:part_id", formController.insertUpdatedItem);
formRouter.get("/add/car_brands", formController.getBrandForm);
formRouter.post("/add/car_brands", formController.postBrandCategory);

formRouter.get("/add/car_models", formController.getModelForm);
formRouter.post("/add/car_models", formController.postModel);

formRouter.get("/edit/car_models/:model_id", formController.editModelForm);
formRouter.post("/edit/car_models/:model_id", formController.updateModel);

formRouter.get("/add/car_parts/:model_id", formController.getItemForm);
formRouter.post("/:model_id/add/car_part", formController.addItemIntoModel);
module.exports = formRouter;
