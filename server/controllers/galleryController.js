const cloudinary = require("../cloudinary");

const getGallery = async (req, res) => {
  try {
    const result = await cloudinary.api.resources({
      type:        "upload",
      folder:      "gallery",  
      max_results: 60,
    });

    if (!result.resources || result.resources.length === 0) {
      return res.json({ success: true, data: [] });
    }

    const accents = ["#00f5c4", "#7b5fff"];
    const spans   = ["col", "normal", "normal", "row", "normal", "normal"];

    const data = result.resources.map((img, i) => ({
      id:     img.public_id,
      src:    img.secure_url,
      label:  img.public_id
                .replace("sankalan2026/gallery/", "")
                .replace(/[-_]/g, " ")
                .replace(/\.[^.]+$/, ""),
      accent: accents[i % accents.length],
      span:   spans[i % spans.length],
    }));

    res.json({ success: true, data });
  } catch (err) {
    console.error("Cloudinary gallery error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getGallery };