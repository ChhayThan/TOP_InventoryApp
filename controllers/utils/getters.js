const db = require("../../db/queries");

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

module.exports = { getBrandCategories, getVehicleTypesCategories };
