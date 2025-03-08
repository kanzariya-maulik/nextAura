const mongoose = require("mongoose");
const config = require("config");

module.exports = async function main() {
    await mongoose.connect(`${config.get("MONGO_URL")}/nextAura`);
}