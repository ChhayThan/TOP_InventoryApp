const { Router } = require("express");

const deleteRouter = Router();
const deleteController = require("../controllers/deleteController");

deleteRouter.get("/brand/:brand_id", deleteController.deleteBrandById);

module.exports = deleteRouter;
