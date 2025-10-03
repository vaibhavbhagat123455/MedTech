require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

// Middleware
app.use(cors());

app.use(express.json());

// Routes
app.use('/api/medicines', require('./routes/medicines'));

// Import initial data
app.get('/api/import-data', async (req, res) => {
    try {
        const Medicine = require('./models/Medicine');
        const initialData = require('./data.json'); // Your JSON data
        
        // Clear existing data
        await Medicine.deleteMany({});
        
        // Insert new data
        const medicines = await Medicine.insertMany(initialData);
        res.json({ message: 'Data imported successfully', count: medicines.length });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});