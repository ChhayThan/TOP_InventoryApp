const { Pool } = require("pg");
require("dotenv").config();

module.exports = new Pool({
  connectionString:
    "postgresql://ericchhour:Chhaythan2308@localhost:5432/car_part_inventory",
  //   ssl: {
  //     rejectUnauthorized: false, // Use true for strict SSL.
  //   },
});
