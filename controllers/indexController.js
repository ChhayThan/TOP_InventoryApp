const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

async function getBrandCategories() {
  const brandsQuery = await db.getBrands();
  let brand_categories = [];
  brandsQuery.forEach((brand) => {
    brand_categories.push({
      brand_id: brand.id,
      brand_name: brand.brand_name,
    });
  });
  return brand_categories;
}
async function getVehicleTypesCategories() {
  const vehicleTypesQuery = await db.getVehicleTypes();
  let vehicleType_categories = [];
  vehicleTypesQuery.forEach((type) => {
    vehicleType_categories.push({
      vehicle_type: type.vehicle_type,
    });
  });
  return vehicleType_categories;
}

exports.getHomeContent = async (req, res) => {
  let brand_categories = await getBrandCategories();
  let vehicleType_categories = await getVehicleTypesCategories();

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

exports.getBrandCategory = async (req, res) => {
  let brand_categories = await getBrandCategories();
  let vehicleType_categories = await getVehicleTypesCategories();
  const brand_id = req.params.brand_id;
  const brand_names = await db.getBrandNameById(brand_id);

  const modelQuery = await db.getModelsByBrandId(brand_id);
  const models = [];

  modelQuery.forEach((model) => {
    models.push({
      id: model.id,
      model_name: model.model_name,
      model_imageUrl: model.model_imageurl,
      model_vehicle_type: model.vehicle_type,
    });
  });

  res.render("brandCategory", {
    models,
    title: `${brand_names[0].brand_name} Category`,
    brand_categories,
    vehicleType_categories,
  });
};
