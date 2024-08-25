const db = require("../db/queries");

exports.deleteBrandById = async (req, res) => {
  const adminQuery = await db.getAdminInfo();
  const adminPassword = adminQuery[0].adminpassword;
  if (req.body.adminPassword === adminPassword) {
    const brand_id = req.params.brand_id;
    await db.deleteBrandById(brand_id);
    return res.redirect("/");
  }
  res.status(400).send("Incorrect Admin Password");
};
