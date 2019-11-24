console.log('Server staring');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const dotenv = require('dotenv');
const fs = require('fs');
const readme = fs.readFileSync('README.md');
const readmeText = String(readme);

// Import Routes
const outhRoute = require('./routes/outhUsers');
const postRoute = require('./routes/postRoutes');

// Middlewares
app.use(express.json());

// Route Middlewares
app.use('/api/v1', outhRoute);
app.use('/api/v2', postRoute);

app.get('/', (req, res) =>{
    res.send('try some thing like: /api/doc for the official documentation.'
);
});
app.get('/api/doc', (req,res) =>{
    res.send(readmeText);
})

app.listen(port, ()=> console.log("Listening..."+port));