require('dotenv').config()
const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors')

const app = express()

const PORT = process.env.PORT;
const AdminApi = require('./Routes/Admin/adminapi')

app.use(bodyparser.json())
app.use(cors())

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT} ...`);
})

require('./db')

app.use("/api/admin",AdminApi)

module.exports = app

