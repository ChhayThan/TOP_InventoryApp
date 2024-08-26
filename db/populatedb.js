#! /usr/bin/env node
require("dotenv").config();
const { Client } = require("pg");

const sql = `
CREATE TABLE IF NOT EXISTS Admin_info (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, 
    adminPassword VARCHAR(255)
);

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

INSERT INTO admin_info (adminPassword) VALUES ('BMWLOVER');

INSERT INTO car_brands (brand_name, brand_imageUrl) 
VALUES
  ('BMW', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/768px-BMW.svg.png'),
  ('Mercedes-Benz', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Logo.svg/2048px-Mercedes-Logo.svg.png');
  ('Ferrari', 'https://i.pinimg.com/originals/cd/36/19/cd3619f9e171f176bf0774017147170d.png');

INSERT INTO car_models (model_name, model_imageUrl, vehicle_type, brand_id)
VALUES 
  ('BMW M3 G80', 'https://www.bmw.com.kh/content/dam/bmw/common/all-models/m-series/m3-sedan/2020/overview/bmw-3-series-sedan-m-automobiles-gallery-impressions-m3-competition-02-mobile.jpg', 'Sedan', 1),
  ('BMW X3 G01', 'https://d2ivfcfbdvj3sm.cloudfront.net/7fc965ab77efe6e0fa62e4ca1ea7673bb65b4057091e3d8e88cb10/stills_0640_png/MY2023/51162/51162_st0640_116.png', 'SUV', 1),
  ('BMW M5 F90', 'https://www.bmw.co.za/content/dam/bmw/common/all-models/m-series/m5-sedan/2021/Overview/bmw-m5-cs-onepager-gallery-m5-core-02-wallpaper.jpg', 'Sedan', 1),
  ('Mercedes C63 S COUPE', 'https://www.mbusa.com/content/dam/mb-nafta/us/myco/my23/c/coupe/byo-options/2023-AMG-C-COUPE-MP-047.jpg', 'Sedan', 2),
  ('Mercedes GLC 300', 'https://www.mercedes-benz.com.au/content/dam/hq/passengercars/cars/glc/suv-x254/modeloverview/images/mercedes-benz-glc-suv-x254-modeloverview-696x392-05-2022.png', 'SUV', 2),
  ('Ferrari SF90', 'https://vrrb-fsb-prod-backend.s3.us-west-1.amazonaws.com/strapi/SF_90_Stradale_Thumb_500a464bf7.png', 'Sports', 2),
  ('Ferrari LaFerrari (2013)', 'https://cdn.ferrari.com/cms/network/media/img/resize/5d961f5c230eb47c19f12b89-ferrari-laferrari-2013-carbanner-mobile?width=800&height=600', 'Sports', 2);

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
