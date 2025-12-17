const dotenv = require("dotenv");

dotenv.config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
});

module.exports = {
  PORT: process.env.PORT,
  DB_URI: process.env.DB_URI,
  NODE_ENV: process.env.NODE_ENV
};
