const express = require('express');
const router = express.Router();
const weatherController = require('../Controllers/WeatherController');
const { checkAuth } = require('../Middleware/checkAuth');

router.get('/getWeather', weatherController.getWeather);

module.exports = router;
