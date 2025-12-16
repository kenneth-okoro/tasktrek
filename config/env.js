const dotenv = require("dotenv");

dotenv.config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
});

module.exports = {
  PORT: process.env.PORT
};
