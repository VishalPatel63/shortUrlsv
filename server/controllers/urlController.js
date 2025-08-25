const Url = require("../models/Url");
const shortid = require("shortid");

//  short url controller
exports.shortenUrl = async (req, res) => {
  const { longUrl } = req.body;
  if (!longUrl) return res.status(400).json({ error: "URL is required" });

  try {
    let url = await Url.findOne({ longUrl });
    if (url) return res.json(url);

    const shortCode = shortid.generate();
    const newUrl = new Url({ longUrl, shortCode });
    await newUrl.save();
    res.json(newUrl);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};


//  url redirect controller
exports.redirectUrl = async (req, res) => {
  try {
    const url = await Url.findOne({ shortCode: req.params.shortcode });
    if (!url) return res.status(404).json({ error: "URL not found" });

    url.clicks++;
    await url.save();
    res.redirect(url.longUrl);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.getAllUrls = async (req, res) => {
  try {
    const urls = await Url.find();
    res.json(urls);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

//  Delete url controller
exports.deleteUrl = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUrl = await Url.findByIdAndDelete(id);

    if (!deletedUrl) {
      return res.status(404).json({
        success: false,
        message: "URL not found",
      });
    }

    res.json({
      success: true,
      message: "URL deleted successfully",
      deletedUrl,
    });
  } catch (error) {
    console.error("Error deleting URL:", error);
    res.status(500).json({
      success: false,
      message: "Server error while deleting URL",
    });
  }
};
