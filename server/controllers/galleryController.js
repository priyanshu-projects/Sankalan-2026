const cloudinary = require("../cloudinary");

const getGallery = async (req, res) => {
  try {
    const result = await cloudinary.api.resources({
      type:        "upload",
      max_results: 50,
    });

    const images = result.resources.map((r, i) => ({
      id:     i + 1,
      src:    r.secure_url,
      label:  r.display_name || r.public_id.split("/").pop(),
      accent: i % 2 === 0 ? "#00f5c4" : "#7b5fff",
      span:   i === 0 ? "col" : i === 3 ? "row" : i === 4 ? "col" : i === 7 ? "row" : "",
    }));

    res.json({ success: true, data: images });
  } catch (err) {
    console.error("Gallery error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getGallery };