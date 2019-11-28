const fs = require('fs');

const bcrypt = require('bcryptjs')

const nodemailer = require('nodemailer');

const jwt = require('jsonwebtoken');

const usersData = fs.readFileSync('data/usersData.json');

const userModule = require('../models/userModels');

const Validate = require('../helpers/validationHelper');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'broadcaster.reply@gmail.com',
    pass: 'niY123456',
  },
});
exports.getLoginAuth = (req, res) => {
  const validation = new Validate();
  const values = req.body;
  const usersRecord = JSON.parse(usersData) || [];
  const passed = validation.check(userModule.UserLogin, values, usersRecord);
  if (passed === true) {
    if (usersRecord.length > 0) {
      const found = usersRecord.find((userdata) => userdata.email === values.email);
      if (typeof (found) !== 'undefined') {
        if (bcrypt.compareSync(values.password, found.password)) {
          const tokenapi = jwt.sign({
            firstName: found.firstName,
            lastName: found.lastName,
            email: found.email,
            id: found.id,
          }, '0123456789abcdfghjkmnpqrstvwxyzABCDEFGHIJKLMNOPQRE', { expiresIn: '24d' });
          res.status(201).send({
            status: 201,
            message: 'User logged in successfully!',
            data: {
              token: tokenapi,
              firstName: found.firstName,
              lastName: found.lastName,
              email: found.email,
            },
          });
        } else {
          res.status(401).send({
            status: 401,
            message: 'user password incorrect',
          });
        }
      } else {
        res.status(404).send({
          status: 404,
          message: 'user not found',
        });
      }
    } else {
      res.status(404).send({
        status: 404,
        message: 'user not found',
      });
    }
  } else {
    res.status(400).send({
      message: passed,
    });
  }
};

exports.getRegisterAuth = (req, res) => {
  const validation = new Validate();
  const values = req.body;
  let idUser;
  const usersRecord = JSON.parse(usersData) || [];
  const passed = validation.check(userModule.UserRegitration, values, usersRecord);
  if (passed === true) {
    if (usersRecord.length === 0) {
      idUser = 1;
    } else {
      const maxId = (array, prop) => {
        let max;
        for (let i = 0; i < array.length; i += 1) {
          if (!max || parseInt(array[i][prop]) > parseInt(max[prop])) { max = array[i]; }
        }
        return max.id + 1;
      };

      idUser = maxId(usersRecord, 'id');
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(values.password, salt);
    usersRecord.push({
      id: idUser,
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phoneNumber: values.phoneNumber,
      userName: values.userName,
      isAdmin: values.isAdmin,
      password: hash,
    });
    let rawData = JSON.stringify(usersRecord, null, 2); 
    fs.writeFile('data/usersData.json', rawData, (err) =>{
        if(err) throw err;
    });
    const tokenapi = jwt.sign({
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      id: idUser,
    }, '0123456789abcdfghjkmnpqrstvwxyzABCDEFGHIJKLMNOPQRE', { expiresIn: '24h' });
    res.status(201).send({
      status: 201,
      message: 'User created successfully',
      data: {
        token: tokenapi,
        firstName: values.firstName,
        lastName: values.lastName,
        phoneNumber: values.phoneNumber,
        email: values.email,
      },
    });
  } else {
    res.status(400).send({
      status: 400,
      message: passed,
    });
  }
};

exports.updateUser = (req, res) => {
  const validation = new Validate();
  const values = req.body;
  req.body.id = req.id;
  const idUser = req.id;
  const usersRecord = JSON.parse(usersData) || [];
  const passed = validation.check(userModule.UserProfileUpdate, values, usersRecord, idUser);
  if (usersRecord.length > 0) {
    if (passed === true) {
      const found = usersRecord.find((userdata) => userdata.id === parseInt(idUser));
      if (typeof (found) !== 'undefined') {
        const key = usersRecord.indexOf(found);
        usersRecord[key].firstName = values.firstName;
        usersRecord[key].lastName = values.lastName;
        usersRecord[key].email = values.email;
        let rawData = JSON.stringify(userArrays, null, 2);
        fs.writeFile('data/usersData.json', rawData, (err) =>{
            if(err) throw err;
        });
        res.status(201).send({
          status: 201,
          message: 'User updated successfully',
          data: {
            firstname: usersRecord[key].firstName,
            lastname: usersRecord[key].lastName,
            email: usersRecord[key].email,
          },
        });
      } else {
        res.status(404).send({
          status: 404,
          message: 'user not found',
        });
      }
    } else {
      res.status(400).send({
        status: 400,
        message: passed,
      });
    }
  } else {
    res.status(404).send({
      status: 404,
      message: 'user not found',
    });
  }
};