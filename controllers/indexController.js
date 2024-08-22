const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

exports.getHomeContent = async (req, res) => {
  const brandsQuery = await db.getBrands();
  const vehicleTypesQuery = await db.getVehicleTypes();
  let brand_categories = [];
  let vehicleType_categories = [];
  brandsQuery.forEach((brand) => {
    brand_categories.push({
      brand_id: brand.id,
      brand_name: brand.brand_name,
    });
  });

  vehicleTypesQuery.forEach((type) => {
    vehicleType_categories.push({
      vehicle_type: type.vehicle_type,
    });
  });

  const partsQuery = await db.getAllParts();
  let items = [];
  partsQuery.forEach((item) => {
    items.push({
      id: item.id,
      part_name: item.part_name,
      part_imageUrl: item.part_imageurl,
      part_price: item.part_price,
      part_quantity: item.part_quantity,
    });
  });
  res.render("index", {
    title: "Eric's Garage",
    items,
    brand_categories,
    vehicleType_categories,
  });
};
