const express = require('express');

const router = express.Router();
const Product= require('../models/product');

router.post('/createproduct',async (req,res)=>{
    try{
        data= req.body;
        prod= new Product(data);

       savedProd= await prod.save();
        res.status(200).send(savedProd)
    }catch(error){
        res.status(400).send(error)
    }
})


router.post('/allProduct',async (req,res)=>{
    try{
        prod= await Product.find();
        res.status(200).send(prod);
    }catch(error){
        res.status(400).send(error)
    }
})


module.exports = router;