const { Router } = require("express");

const indexRouter = Router();
const indexController = require("../controllers/indexController");

indexRouter.get("/", indexController.getHomeContent);
indexRouter.get("/category/:brand_id", indexController.getBrandCategory);

module.exports = indexRouter;
