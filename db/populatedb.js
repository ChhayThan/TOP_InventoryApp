#! /usr/bin/env node
require("dotenv").config();
const { Client } = require("pg");

const sql = `
QUERY TO CREATE TABLE HERE
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.CONNECTION_STRING,
    // ssl: {
    //   rejectUnauthorized: false, // This allows self-signed certificates. Set to true for strict SSL.
    // },
  });

  await client.connect();
  await client.query(sql);
  await client.end();
  console.log("Done");
}

// Uncomment below to use with node
// main();
