const express = require('express');
const router = express.Router();
const SongController = require('../Controllers/SongController');
const upload = require('../Middlewares/Multer');

// route for song upload (audio + cover art)
router.post(
  '/upload',
  upload.fields([
    { name: 'audio', maxCount: 1 },      // audio file
    { name: 'image', maxCount: 1 }   // cover art image
  ]),
  SongController.uploadSong
);

module.exports = router;
