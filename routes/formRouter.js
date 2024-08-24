const { Router } = require("express");

const formRouter = Router();
const formController = require("../controllers/formController");

formRouter.get("/edit/part/:part_id", formController.getEditForm);
formRouter.post("/edit/part/:part_id", formController.insertUpdatedItem);
formRouter.get("/add/car_brands", formController.getBrandForm);
formRouter.post("/add/car_brands", formController.postBrandCategory);

module.exports = formRouter;
