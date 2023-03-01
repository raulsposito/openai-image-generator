const express = require("express");
const { generateImage, generateImageVariation } = require('../controllers/openaiController');
const router = express.Router();

router.post('/generateimage', generateImage);
router.post('/generatevariation', generateImageVariation);

module.exports = router;