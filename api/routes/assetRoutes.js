const express = require("express");
const {
  getAsset,
  getAssetById,
  createAsset,
  updateAsset,
  deleteAsset,
} = require("../controllers/assetController");
const validateToken = require("../../middleware/validateTokenHandler");
const router = express.Router();

router.use(validateToken);
router.route("/").get(getAsset).post(createAsset);
router.route("/:id").get(getAssetById).put(updateAsset).delete(deleteAsset);

module.exports = router;
