const mongoose = require('mongoose')

const ShopSchema = new mongoose.Schema({
    shopID: {
        type: String,
        required: true,
    },
    shopName: {
        type: String,
        required: true,
        trim: true,
    },
    ownerName: {
        type: String,
        required: true,
        trim: true,
    },
    shopType: {
        type: String,
        enum: ["Retail", "Wholesale", "Chain Store"],
        required: true,
    },
    contactNumber: {
        type: String,
        required: true,
        match: [/^\d{10}$/, "Please enter a valid 10-digit phone number"],
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    address: {
        type: String,
        required: true,
        trim: true,
    },
    city: {
        type: String,
        required: true,
        trim: true,
    },
    state: {
        type: String,
        required: true,
        trim: true,
    },
    pinCode: {
        type: String,
        required: true,
        match: [/^\d{6}$/, "Please enter a valid 6-digit Pin/Zip Code"],
    },
    latitude: {
        type: Number,
        required: false,
    },
    longitude: {
        type: Number,
        required: false,
    },
    openingTime: {
        type: String, // stored as "HH:mm"
        required: false,
    },
    closingTime: {
        type: String, // stored as "HH:mm"
        required: false,
    },
    daysOpen: {
        type: String, // e.g. "Mon-Sat"
        required: false,
    },
}, {
    timestamps: true, // auto adds createdAt & updatedAt
});

module.exports = mongoose.model("Shop",ShopSchema)
