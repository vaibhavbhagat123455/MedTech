const express = require('express');
const router = express.Router();
const Medicine = require('../models/Medicine');
const Shop = require('../models/Shop')
const fs = require('fs');
const path = require('path');

// Get all medicines
router.get('/', async (req, res) => {
    try {
        const medicines = await Medicine.find();
        res.json(medicines);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Search medicines
router.get('/search', async (req, res) => {
    try {
        const { query } = req.query;
        const medicines = await Medicine.find({
            $or: [
                { BrandName: { $regex: query, $options: 'i' } },
                { Composition: { $regex: query, $options: 'i' } },
                { Manufacturer: { $regex: query, $options: 'i' } },
                { TextCode: { $regex: query, $options: 'i' } }
            ]
        });
        res.json(medicines);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add new medicine
router.post('/', async (req, res) => {
    try {
        const medicine = new Medicine(req.body);
        const savedMedicine = await medicine.save();
        res.status(201).json(savedMedicine);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update medicine status
router.patch('/:id', async (req, res) => {
    try {
        const medicine = await Medicine.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(medicine);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// 🔹 Import data.json into MongoDB
router.get('/import-data', async (req, res) => {
    try {
        const dataPath = path.join(__dirname, '..', 'data.json');
        const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

        await Medicine.deleteMany(); // clear old records
        await Medicine.insertMany(data);

        res.json({ message: "Data imported successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to import data" });
    }
});

// http://localhost:5000/api/medicines/login
router.post('/login',async (req,res)=>{
    try{
        const email = req.body.email;
        const password = req.body.password;

        const login = await Shop.findOne({email});
        if(login){
            if(password == login.contactNumber){
                res.json({"sts":1,email})
            }else{
                res.json("Wrong password")
            }
        }else{
            res.json("User not exist")
        }
    }catch(err){
        json.res(`Error : ${err}`);
    }
})


// http://localhost:5000/api/medicines/getMed
router.get('/getMed',async (req,res)=>{
    try{
        const email = req.body.email;
        const data = await Medicine.find({email})
        res.json(data)
    }catch(err){
        res.json(`Error : ${err}`)
    }
})

module.exports = router;
