const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const tripRoutes = require('./routes/tripRoutes');

dotenv.config()
//loadsd env vairiables

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/trips', tripRoutes);
//any request with api trips has to be handled using tripRoutes -> it handles this effective part left is / only for the other file 

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch(e => console.error('MongoDB connection error:', e.message))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})