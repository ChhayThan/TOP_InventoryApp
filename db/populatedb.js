#! /usr/bin/env node
require("dotenv").config();
const { Client } = require("pg");

const sql = `
CREATE TABLE IF NOT EXISTS car_brands (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, 
    brand_name VARCHAR(255), 
    brand_imageUrl VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS car_models (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, 
    model_name VARCHAR(255), 
    model_imageUrl VARCHAR(255), 
    vehicle_type VARCHAR(255), 
    brand_id INTEGER, 
    FOREIGN KEY (brand_id) REFERENCES car_brands(id)
);

CREATE TABLE IF NOT EXISTS car_parts (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, 
    part_name VARCHAR(255), 
    part_imageUrl VARCHAR(255), 
    part_price FLOAT, 
    part_description TEXT,
    part_quantity INTEGER, 
    oem BOOLEAN, 
    model_id INTEGER, 
    brand_id INTEGER, 
    FOREIGN KEY (model_id) REFERENCES car_models(id), 
    FOREIGN KEY (brand_id) REFERENCES car_brands(id)
);

INSERT INTO car_brands (brand_name, brand_imageUrl) 
VALUES
  ('BMW', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/768px-BMW.svg.png'),
  ('Mercedes-Benz', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Logo.svg/2048px-Mercedes-Logo.svg.png');

INSERT INTO car_models (model_name, model_imageUrl, vehicle_type, brand_id)
VALUES 
  ('BMW M3 G80', 'https://media.autoexpress.co.uk/image/private/s--X-WVjvBW--/f_auto,t_content-image-full-desktop@1/v1600853911/evo/2020/09/2021%20BMW%20M3%20fresh-9.jpg', 'Sedan', 1),
  ('BMW X3 G01', 'https://www.premiumfelgi.pl/userdata/gfx/64001.jpg', 'SUV', 1),
  ('Mercedes C63', 'https://hips.hearstapps.com/hmg-prod/images/2023-mercedes-amg-c63-s-e-performance-114-65d79698b0e26.jpg?crop=0.553xw:0.621xh;0.418xw,0.329xh&resize=768:* ', 'Sedan', 2),
  ('Mercedes GLC 300', 'https://cdn.motor1.com/images/mgl/KbboO1/s3/2022-mercedes-glc.jpg', 'SUV', 2);

INSERT INTO car_parts (part_name, part_imageUrl, part_price, part_description, part_quantity, oem, model_id, brand_id) 
VALUES 
  ('BMW M3 G80 RH PASSENGER LASER HEADLIGHT', 'https://i.ebayimg.com/images/g/9zEAAOSwFFNjph-C/s-l1600.jpg', 2200, '21 22 23 BMW M3 COMPETITION G80 3.0L OEM RH PASSENGER LASER HEADLIGHT 9505120-03' , 1, true, 1, 1),
  ('Trim Front, 2-Piece, Chrome - Mercedes-Benz', 'https://s3.amazonaws.com/rp-part-images/assets/a2de7211fa553595bebee08d42b8b2a5.gif', 259, 'High-sheen chromed trim elements in the air intakes add a distinctive accent for an individual look. 2-piece set. This item is non-returnable.' , 1, true, 4, 2), 
  ('Mercedes Benz C63 AMG W205 2015+ Cat Less Downpipes With Heat Shield', 'https://eurobahndynamics.com/cdn/shop/files/Screenshot2024-04-01233134.png', 1299, 'Introducing the Mercedes Benz C63 AMG W205 2015+ Cat Less Downpipes With Heat Shield, a high-performance upgrade engineered to unleash the true potential of your AMG powerhouse. Designed for enthusiasts seeking uncompromising performance gains and an exhilarating exhaust note, these catless downpipes are meticulously crafted to deliver an unmatched driving experience.' , 1, false, 3, 2),
  ('BMW M Performance G01 X3 Pre-LCI Front Grille Set', 'https://ind-distribution.com/cdn/shop/products/g01_x3m_front_grille_set_in_gloss_black_4_fd15dec2-b929-4c13-9705-cc67a2888b80_1024x1024.jpg', 330.62, 'When you"re getting an OEM part from BMW, you know the fitment, style, and quality are all going to be top notch. Treat your BMW to the best of the best with the BMW M Performance G01 X3 Front Grille Set. A genuine part, this front grille set will make all the difference to your BMW. This part comes in a gloss black finish; looking for something a little different? Contact us with any custom paint inquiries. No matter where you drive, make a statement with OEM BMW M parts from IND. Product Details: Includes passenger and driver front grille. Contact us for custom paint options. Genuine BMW Parts 51138469959 and 51138469960. Fits G01 X3 + G02 X4 Pre-LCI ONLY. Optional: Ceramic Pro 9H Permanent Bond Nanoceramic Protective Coating - 2 layers are pre-applied before shipping', 5, false, 2, 1);

`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString:
      "postgresql://ericchhour:Chhaythan2308@localhost:5432/car_part_inventory",
    // ssl: {
    //   rejectUnauthorized: false, // This allows self-signed certificates. Set to true for strict SSL.
    // },
  });

  await client.connect();
  await client.query(sql);
  await client.end();
  console.log("Done");
}

main();
