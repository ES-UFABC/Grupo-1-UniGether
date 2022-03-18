const { resolve } = require("path");
const { config } = require("dotenv");

config({ path: resolve(__dirname, "../../.env") });