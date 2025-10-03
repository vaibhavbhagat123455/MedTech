const mongoose = require('mongoose')

const SubMedicineSchema = new mongoose.Schema({
    TextCode : {type:String,required:true},
    Status : {type:String,required:true,enum:['pending','stored','sold'],default:'pending'}
})

const MedicineSchema = new mongoose.Schema({
    TextCode: {type:String, required:true},
    BrandName: {type:String, required:true},
    Composition: {type:String, required:false},
    BatchNumber: {type:String, required:true},
    MDate: {type:Date, required:true},
    EDate: {type:Date, required:true},
    MRP: {type:String, required:true},
    Manufacturer: {type:String, required:true},
    StorageInstructions: {type:String, required:false},
    Precautions: {type:String, required:false},
    SubTextCode: [SubMedicineSchema]
}, { timestamps: true }); // ← enables createdAt

module.exports = mongoose.model('MedData',MedicineSchema);