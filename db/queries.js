const pool = require("./pool");

async function getAdminInfo() {
  const { rows } = await pool.query("SELECT * FROM admin_info");
  return rows;
}

async function getAllParts() {
  const { rows } = await pool.query("SELECT * FROM car_parts");
  return rows;
}

async function getAllModels() {
  const { rows } = await pool.query("SELECT * FROM car_models");
  return rows;
}

async function getModelsByBrandId(brand_id) {
  const { rows } = await pool.query(
    "SELECT * FROM car_models WHERE brand_id = $1",
    [brand_id]
  );
  return rows;
}

async function getPartsByModel(model_id) {
  const { rows } = await pool.query(
    "SELECT * FROM car_parts WHERE model_id = $1",
    [model_id]
  );

  return rows;
}

async function getModelsByVehicleType(vehicle_type) {
  const { rows } = await pool.query(
    "SELECT * FROM car_models WHERE vehicle_type = $1",
    [vehicle_type]
  );

  return rows;
}

async function getBrands() {
  const { rows } = await pool.query(
    "SELECT * FROM car_brands ORDER BY brand_name;"
  );
  return rows;
}

async function getVehicleTypes() {
  const { rows } = await pool.query(
    "SELECT DISTINCT vehicle_type FROM car_models ORDER BY vehicle_type"
  );
  return rows;
}

async function getBrandNameById(brand_id) {
  const { rows } = await pool.query(
    "SELECT DISTINCT brand_name FROM car_brands WHERE id = $1",
    [brand_id]
  );
  return rows;
}

async function getModelById(model_id) {
  const { rows } = await pool.query("SELECT * FROM car_models WHERE id = $1", [
    model_id,
  ]);
  return rows;
}

async function getModelNameById(model_id) {
  const { rows } = await pool.query(
    "SELECT DISTINCT model_name FROM car_models WHERE id = $1",
    [model_id]
  );
  return rows;
}

async function getModelsByBrandId(brand_id) {
  const { rows } = await pool.query(
    "SELECT * FROM car_models WHERE brand_id = $1",
    [brand_id]
  );
  return rows;
}

async function getModelNamesByBrandId(brand_id) {
  const { rows } = await pool.query(
    "SELECT DISTINCT model_name FROM car_models WHERE brand_id = $1",
    [brand_id]
  );
  return rows;
}

async function getPartById(part_id) {
  const { rows } = await pool.query("SELECT * FROM car_parts WHERE id = $1", [
    part_id,
  ]);
  return rows;
}

async function updatePartById(reqbody, part_id) {
  const oem = reqbody.part_oem ? true : false;
  await pool.query(
    "UPDATE car_parts SET part_name = $1, part_imageurl = $2, part_price = $3, part_description = $4, part_quantity = $5, oem = $6, model_id = $7, brand_id = $8 WHERE id = $9",
    [
      reqbody.part_name,
      reqbody.part_imageUrl,
      reqbody.part_price,
      reqbody.part_description,
      reqbody.part_quantity,
      oem,
      reqbody.model_id,
      reqbody.brand_id,
      part_id,
    ]
  );
}
async function updateModelById(model_id, reqbody) {
  await pool.query(
    "UPDATE car_models SET model_name = $1, model_imageurl = $2, vehicle_type = $3, brand_id = $4 WHERE id = $5",
    [
      reqbody.model_name,
      reqbody.model_imageurl,
      reqbody.vehicle_type,
      reqbody.brand_id,
      model_id,
    ]
  );
}

async function addNewCarBrand(reqbody) {
  const { brand_name, brand_imageurl } = reqbody;
  const insertResult = await pool.query(
    "INSERT INTO car_brands (brand_name, brand_imageurl) VALUES ($1, $2)",
    [brand_name, brand_imageurl]
  );

  return insertResult;
}

async function addNewCarModel(reqbody) {
  const { model_name, model_imageurl, vehicle_type, brand_id } = reqbody;
  const insertResult = await pool.query(
    "INSERT INTO car_models (model_name, model_imageurl, vehicle_type, brand_id) VALUES ($1, $2, $3, $4)",
    [model_name, model_imageurl, vehicle_type, brand_id]
  );

  return insertResult;
}

async function deleteBrandById(brand_id) {
  const deleteResult = await pool.query(
    "DELETE FROM car_brands WHERE id = $1",
    [brand_id]
  );
  return deleteResult;
}

async function deleteModelById(model_id) {
  const deleteResult = await pool.query(
    "DELETE FROM car_models WHERE id = $1",
    [model_id]
  );
  return deleteResult;
}

module.exports = {
  getAdminInfo,
  getAllParts,
  getAllModels,
  getModelById,
  getModelsByBrandId,
  getModelNamesByBrandId,
  getPartsByModel,
  getModelsByVehicleType,
  getBrands,
  getVehicleTypes,
  getBrandNameById,
  getModelNameById,
  getPartById,
  updatePartById,
  updateModelById,
  addNewCarBrand,
  addNewCarModel,
  deleteBrandById,
  deleteModelById,
};
