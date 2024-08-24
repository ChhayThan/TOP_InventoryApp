const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

const validatePartEditForm = require("./validators/editItem");

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

exports.getModelsByBrandCategory = async (req, res) => {
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

  res.render("modelContent", {
    models,
    title: `${brand_names[0].brand_name} Category`,
    brand_categories,
    vehicleType_categories,
  });
};

exports.getModelsByVehicleType = async (req, res) => {
  let brand_categories = await getBrandCategories();
  let vehicleType_categories = await getVehicleTypesCategories();

  const vehicle_type = req.params.vehicle_type;
  const modelQuery = await db.getModelsByVehicleType(vehicle_type);
  const models = [];
  modelQuery.forEach((model) => {
    models.push({
      id: model.id,
      model_name: model.model_name,
      model_imageUrl: model.model_imageurl,
      model_vehicle_type: model.vehicle_type,
    });
  });
  res.render("modelContent", {
    models,
    title: `${vehicle_type} Category`,
    brand_categories,
    vehicleType_categories,
  });
};

exports.getPartsByModel = async (req, res) => {
  let brand_categories = await getBrandCategories();
  let vehicleType_categories = await getVehicleTypesCategories();

  const model_id = req.params.model_id;

  const partsQuery = await db.getPartsByModel(model_id);
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
  res.render("itemContent", {
    title: `Items for model: ${model_id}`,
    items,
    brand_categories,
    vehicleType_categories,
  });
};

exports.getPartById = async (req, res) => {
  let brand_categories = await getBrandCategories();
  let vehicleType_categories = await getVehicleTypesCategories();
  const itemQuery = await db.getPartById(req.params.part_id);
  const item = itemQuery[0];
  const brandQuery = await db.getBrandNameById(item.brand_id);

  res.render("item", {
    title: item.part_name,
    item,
    brand_name: brandQuery[0].brand_name,
    brand_categories,
    vehicleType_categories,
  });
};

exports.getEditForm = async (req, res) => {
  const part_id = req.params.part_id;
  const partQuery = await db.getPartById(part_id);
  const item_info = partQuery[0];

  let brand_categories = await getBrandCategories();
  let vehicleType_categories = await getVehicleTypesCategories();
  let modelQuery = await db.getModelsByBrandId(item_info.brand_id);
  let model_names = [];
  modelQuery.forEach((name) => {
    model_names.push(name);
  });

  res.render("form", {
    title: `Editing Item: ${part_id}`,
    brand_categories,
    vehicleType_categories,
    brand_info: null,
    item_info,
    model_names,
  });
};
exports.postPart = [
  validatePartEditForm,
  async (req, res) => {
    let brand_categories = await getBrandCategories();
    let vehicleType_categories = await getVehicleTypesCategories();
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("form", {
        part_id: req.params.part_id,
        errors: errors.array(),
        title: `Error editing Item: ${req.body.part_id}`,
        brand_categories,
        vehicleType_categories,
        brand_info: null,
        item_info: null,
        model_names: null,
      });
    }
    await db.updatePartById(req.body, req.params.part_id);
    res.redirect(`/item/${req.params.part_id}`);
  },
];
