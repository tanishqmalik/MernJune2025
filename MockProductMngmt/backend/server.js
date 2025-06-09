const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors') 
const dotenv = require('dotenv')
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product')

dotenv.config();

const app = express();
app.use(cors())
app.use(express.json());

mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser : true,
    useUnifiedTopology: true,
}).then(()=>console.log('MongoDB connected'))
.catch(err => console.log(err));

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

app.listen(5000, ()=> console.log('server is running at 5000'));