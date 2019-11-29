const express = require('express');

const authController = require('../controllers/userControllers');

const isAuth = require('../middleware/isAuth');

const route = express.Router();

route.patch('/profile',isAuth, authController.updateUser);
route.post('/signin', authController.getLoginAuth);
route.post('/signup', authController.getRegisterAuth);

module.exports = route;