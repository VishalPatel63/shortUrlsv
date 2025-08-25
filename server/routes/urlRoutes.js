const express = require("express");
const router = express.Router();
const { shortenUrl, redirectUrl, getAllUrls ,deleteUrl} = require("../controllers/urlController");

router.post("/shorten", shortenUrl);
router.get("/all", getAllUrls);
router.get("/:shortcode", redirectUrl);
router.delete("/delete/:id", deleteUrl);


module.exports = router;
