const express = require('express');

const recordController = require('../controllers/recordControllers');
const isAuth = require('../middleware/isAuth');

const route = express.Router();

route.delete('/red-flags/:postId', recordController.deleteRedFlag);
route.post('/records', recordController.addRecord);
route.get('/red-flags', recordController.getAllRedFlags);
route.get('/red-flags/:postId', recordController.getOneRecord);
// route.patch('/entries/:storyId', isAuth, storyController.updateStory);

module.exports = route;