const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const dotenv = require('dotenv')
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product')

dotenv.config();

const app = express();

// Simple CORS configuration
app.use(cors());

// Add headers middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

app.get('/', (req,res)=>{
    res.send('Backend API running.....')
})

app.listen(5000, ()=> console.log('server is running at 5000'));