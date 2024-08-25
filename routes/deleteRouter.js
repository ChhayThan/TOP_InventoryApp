const { Router } = require("express");

const deleteRouter = Router();
const deleteController = require("../controllers/deleteController");

deleteRouter.post("/brand/:brand_id", deleteController.deleteBrandById);
deleteRouter.post("/model/:model_id", deleteController.deleteModelById);

module.exports = deleteRouter;
