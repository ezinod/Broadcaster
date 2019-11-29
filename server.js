console.log('Server staring');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const dotenv = require('dotenv');
const fs = require('fs');
const readme = fs.readFileSync('README.md');
const readmeText = String(readme);

// Import Routes
const authRoute = require('./routes/authRoutes');
const postRoute = require('./routes/recordRoutes');

// Middlewares
app.use(express.json());

// Route Middlewares
app.use('/api/v1/auth', authRoute);
app.use('/api/v1', postRoute);

app.get('/', (req, res) =>{
    res.send('try some thing like /api/v1/...'
);
});
app.get('/api/doc', (req,res) =>{
    res.send(readmeText);
})

module.exports = app.listen(port, ()=> console.log(`Listening to ${port}`));