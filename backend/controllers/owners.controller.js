const owner = require("../models/owner.model");


module.exports.getAllOwners = async (_req,res) => {
    try{
        let result = await owner.find({});
        return res.status(200).json(result);
    }catch(e){
        return res.status(500).json({error:"Not able to fetch Owners Data"});
    }    
}

module.exports.createOwner = async (req,res) => {
    try{
        let owners =await owner.find({});
        if(owners.length < 1){
        let result = await owner.create({
            fullname:"Maulik Kanzariya",
            email:"mkanzariya566@rku.ac.in",
            password:"mkanzariya566",
            gstin:"LOLOLO13or18",
        });
        return res.status(200).json(result);
        }else{
            return res.status(400).json({error:"Owner already exists"});
        }
    }catch(e){
        return res.status(500).json({error:"Not able to create Owner Data"});
    }
}