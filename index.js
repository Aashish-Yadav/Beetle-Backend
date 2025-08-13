const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors')

dotenv.config();

const app = express();
const PORT= process.env.PORT || 8080;

app.use(express.json());
app.use(cors())

app.get('/',(req,res) => {
    res.send("hello server is fine")
})

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("🔐 Database connected successfully");
    app.listen(PORT, () => {
    console.log(`📡 App is listening at port :`,PORT)
})
})
.catch((Error)=>{
    console.log("🛠️ Database connection error",error)
})

