const pool = require("./pool");

async function getAllParts() {
  const { rows } = await pool.query("SELECT * FROM car_parts");
  return rows;
}

async function getModelsByBrandId(brand_id) {
  const { rows } = pool.query("SELECT * FROM car_models WHERE brand_id = $1");
  return rows;
}

async function getPartsByModel(model_id) {
  const { rows } = await pool.query(
    "SELECT * FROM car_parts WHERE brand_id = $1)",
    [model_name]
  );

  return rows;
}

async function getModelsByVehicleType(vehicle_type) {
  const { rows } = await pool.query(
    "SELECT * FROM car_models WHERE vehicle_type = '$1')",
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
}

module.exports = {
  getModelsByBrandId,
  getModelsByBrandId,
  getPartsByModel,
  getModelsByVehicleType,
  getBrands,
  getVehicleTypes,
};
