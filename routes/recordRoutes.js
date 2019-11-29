const express = require('express');

const recordController = require('../controllers/recordControllers');
const isAuth = require('../middleware/isAuth');

const route = express.Router();

route.delete('/red-flags/:postId', isAuth, recordController.deleteRedFlag);
route.post('/records', isAuth, recordController.addRecord);
route.get('/red-flags',isAuth, recordController.getAllRedFlags);
route.get('/red-flags/:postId', isAuth, recordController.getOneRecord);
// route.patch('/entries/:storyId', isAuth, storyController.updateStory);

module.exports = route;