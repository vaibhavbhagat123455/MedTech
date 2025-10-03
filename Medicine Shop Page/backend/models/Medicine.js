const mongoose = require('mongoose');

const SubTextCodeSchema = new mongoose.Schema({
    TextCode: { type: String, required: true },
    Status: { 
        type: String, 
        enum: ['pending', 'used', 'active', 'expired'],
        default: 'pending'
    },
    _id: { type: String, required: true }
});

const MedicineSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    TextCode: { type: String, required: true, unique: true },
    BrandName: { type: String, required: true },
    Composition: { type: String, required: true },
    BatchNumber: { type: String, required: true },
    MDate: { type: Date, required: true },
    EDate: { type: Date, required: true },
    MRP: { type: String, required: true },
    Manufacturer: { type: String, required: true },
    StorageInstructions: { type: String, required: true },
    Precautions: { type: String, required: true },
    SubTextCode: [SubTextCodeSchema]
}, {
    timestamps: true
});

module.exports = mongoose.model('meddatas', MedicineSchema);