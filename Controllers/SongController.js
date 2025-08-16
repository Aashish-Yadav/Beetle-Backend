const Song = require('../Models/SongModel');
const { UploadOnCloudinary } = require('../Utils/Cloudinary');

exports.uploadSong = async (req, res) => {
  try {
    // 1. Validate fields
    if (!req.files || !req.files.audio) {
      return res.status(400).json({ message: "Audio file is required" });
    }

    const { title, artist, genre, uploadedBy } = req.body;

    // 2. Upload audio
    const audioFile = req.files.audio[0];
    const audioUrl = await UploadOnCloudinary(audioFile.path, "songs");

    // 3. Upload image (optional)
    let imageUrl = null;
    if (req.files.image) {
      const imageFile = req.files.image[0];
      imageUrl = await UploadOnCloudinary(imageFile.path, "coverArt");
    }

    // 4. Save in DB
    const song = new Song({
      title,
      artist,
      genre,
      duration: 0, // you can later calculate with ffmpeg
      file: audioUrl,
      coverart: imageUrl,
      uploadedBy
    });

    await song.save();

    res.status(201).json({
      message: "✅ Song uploaded successfully",
      song
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "❌ Upload failed", error: error.message });
  }
};
