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
exports.getLoginAuth = async (req, res) => {
  const validation = new Validate();
  const values = req.body;
  const usersRecord = JSON.parse(usersData) || [];
  const passed = validation.check(userModule.UserLogin, values, usersRecord);
  if (passed === true) {
    if (usersRecord.length > 0) {
      const found = usersRecord.find((userdata) => userdata.email === values.email);
      if (typeof (found) !== 'undefined') {
        const validPass = await bcrypt.compare(values.password, found.password);
        if(validPass) {
          const token = jwt.sign({
            id: found.id,
          },'0123456789abcdfghjkmnpqrstvwxyzABCDEFGHIJKLMNOPQRE' , { expiresIn: '24d' });
          res.status(201).header('Authorization', token).send({
            status: 201,
            message: 'User logged in successfully!',
            data: {
              token: token,
              firstName: found.firstName,
              lastName: found.lastName,
              email: found.email,
            },
          });
        } else {
          res.status(401).send({
            status: 401,
            message: 'user password is incorrect',
          });
        }
      } else {
        res.status(401).send({
          status: 401,
          message: 'user is not exists',
        });
      }
    } else {
      res.status(401).send({
        status: 401,
        message: 'no user found',
      });
    }
  } else {
    res.status(200).send({
      message: passed,
    });
  }
};

exports.getRegisterAuth = async(req, res) => {
  const validation = new Validate();
  const values = req.body;
  let idUser;
  const usersRecord = JSON.parse(usersData) || [];
  const emailExists = usersRecord.find((userdata) => userdata.email === values.email);
  if(!emailExists){
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
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(values.password, salt);
      usersRecord.push({
        id: idUser,
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phoneNumber: values.phoneNumber,
        userName: values.userName,
        isAdmin: values.isAdmin,
        password: hashedPassword,
      });
      let rawData = JSON.stringify(usersRecord, null, 2); 
      fs.writeFile('data/usersData.json', rawData, (err) =>{
          if(err) throw err;
      });
      const token = jwt.sign({
        id: idUser,
      }, '0123456789abcdfghjkmnpqrstvwxyzABCDEFGHIJKLMNOPQRE', { expiresIn: '24h' });
      res.status(200).send({
        status: 200,
        message: 'User created successfully',
        data: {
          token: token,
          firstName: values.firstName,
          lastName: values.lastName,
          phoneNumber: values.phoneNumber,
          email: values.email,
        },
      });
    } else {
      res.status(401).send({
        status: 401,
        message: passed,
      });
    }
    }else{
    return res.status(401).send({
      status: 401,
      error: "email already exists",
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