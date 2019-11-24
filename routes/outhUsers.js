const router = require('express').Router();

const User = require('../models/User');

const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');

const  fs = require('fs');

const {singUpValidation, singInValidation} = require('../routes/useValidation')

// Import file
const usersData = fs.readFileSync('data/usersData.json');
const data = JSON.parse(usersData);

router.post('/signup', async (req, res) => {

    // Hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
 
    // Initializing arrays with data from file
    let userArrays = data;

    const {error} = singUpValidation(req.body);
    if(error) return res.status(400).send({
        status: 401,
        message: error.details[0].message
    });

    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword
    });

    // Check if email exists in memory
    data.forEach( async item => {
        if(item.email === req.body.email){
            return res.status(400).send({
                status: 401,
                message: "Email already exists!"
            });
        } else{
            try {
                userArrays.push(user);
                let rawData = JSON.stringify(userArrays, null, 2);
                let savedUser = await fs.writeFile('data/usersData.json', rawData, (err)=>{
                    if(err) throw err;
                });
                res.send({
                    status: 'success',
                    user: user._id,
                    data: {
                        "first name": user.firstName,
                        "last name": user.lastName,
                        email: user.email
                    },
                    message: 'user registered!'
                }); 
            } catch (error) {
                res.status(401).send(error);
            }
        }
        
    }); 
    
});

router.post('/signin', async(req, res) =>{
    const {error} = singInValidation(req.body);
    if(error) return res.status(400).send({
        status: 401,
        message: error.details[0].message
    });

    data.forEach( async user => {
        if(req.body.email !== user.email) return res.starus(400).send({
            status: 401,
            message: 'Invalid email!'
        });

        // Check password
        const validPass = await bcrypt.compare(req.body.password, user.password);
        if(!validPass) return res.status(400).send({
            status: 401,
            message: 'Invalid password'
        });

        const token = jwt.sign({_id: user._id}, 'process.env.TOKEN_SECRET');
        res.header('auth-token', token).send(token);
    });
});


module.exports = router;