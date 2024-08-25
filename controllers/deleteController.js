const db = require("../db/queries");

exports.deleteBrandById = async (req, res) => {
  const brand_id = req.params.brand_id;
  await db.deleteBrandById(brand_id);
  res.redirect("/");
};
