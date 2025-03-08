const products = require("../models/product.model");
module.exports.getAllProducts = async (_req,res)=>{
    let result = await products.find({});
    res.json(result);
}

module.exports.deleteProduct = async (req,res)=>{
    let result = await products.findByIdAndDelete(req.params.id);
    res.json(result);
}