const express = require('express')

const Medicine = require('../../Models/Medicine')
const Shop = require('../../Models/Shop')
const router = express.Router()

function generateCode() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    let resultCode = "";
    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        resultCode += chars[randomIndex];
    }
    return resultCode;
}

function generateID() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    let resultID = "";
    for (let i = 0; i < 12; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        resultID += chars[randomIndex];
    }
    return resultID;
}

function generateSubCode() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    let resultCode = "";
    for (let i = 0; i < 5; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        resultCode += chars[randomIndex];
    }
    return resultCode;
}


// http://localhost:8080/api/admin/addmed
router.post('/addmed', async (req, res) => {
    try {
        const quantity = parseInt(req.body.Quantity);
        const subQuantity = parseInt(req.body.SubQuantity);

        let medsToInsert = [];

        for (let j = 0; j < quantity; j++) {
            const mainCode = generateCode();
            let SubTextCode = [];

            for (let i = 0; i < subQuantity; i++) {
                const subCode = generateSubCode();
                SubTextCode.push({
                    TextCode: subCode,
                    Status: 'pending'
                });
            }

            medsToInsert.push({
                TextCode: mainCode,
                BrandName: req.body.BrandName,
                Composition: req.body.Composition,
                BatchNumber: req.body.BatchNumber,
                MDate: req.body.MDate,
                EDate: req.body.EDate,
                MRP: req.body.MRP,
                Manufacturer: req.body.Manufacturer,
                StorageInstructions: req.body.StorageInstructions,
                Precautions: req.body.Precautions,
                SubTextCode
            });
        }

        await Medicine.insertMany(medsToInsert); // bulk insert all medicines at once
        res.json({ sts: 1 }); // only send response once, after all saves
    } catch (err) {
        console.log(`Error : ${err}`);
        res.status(500).json({ error: err.message });
    }
});



router.get('/getlatestmeds/:count', async (req, res) => {
    try {
        const count = parseInt(req.params.count);

        // Fetch latest N medicines sorted by creation time
        const meds = await Medicine.find()
            .sort({ createdAt: -1 })   // newest first
            .limit(count);

        res.json(meds);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});



// http://localhost:8080/api/admin/addshop
router.post('/addshop',async (req,res)=>{
    try{
        const shopID = generateID()

        const newShop = new Shop({
            shopID,
            shopName: req.body.shopName,
            ownerName: req.body.ownerName,
            shopType: req.body.shopType,
            contactNumber: req.body.contactNumber,
            email: req.body.email,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            pinCode: req.body.pinCode,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            openingTime: req.body.openingTime,
            closingTime: req.body.closingTime,
            daysOpen: req.body.daysOpen
        })

        await newShop.save()
    }catch(err){
        res.json(`Error : ${err}`);
    }
})

// http://localhost:8080/api/admin/shops
router.get('/shops',async (req,res)=>{
    try{
        const data = await Shop.find()
        res.json(data)
    }catch(err){
        res.json(`ERROR : ${err}`)
    }
})


//http://localhost:8080/api/admin/medicines
router.get('/medicines',async (req,res)=>{
    try{
        const data = await Medicine.find()
        res.json(data)
    }catch(err){
        res.json(`ERROR : ${err}`)
    }
})

module.exports = router