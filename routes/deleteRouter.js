const { Router } = require("express");

const deleteRouter = Router();
const deleteController = require("../controllers/deleteController");

deleteRouter.post("/brand/:brand_id", deleteController.deleteBrandById);

module.exports = deleteRouter;
