const { Router } = require("express");

const formRouter = Router();
const formController = require("../controllers/formController");

formRouter.get("/edit/part/:part_id", formController.getEditForm);
formRouter.post("/edit/part/:part_id", formController.postPart);

module.exports = formRouter;
