const asyncHandler = require("express-async-handler");
const Asset = require("../../models/asset");

// @desc Get all assets
// @route GET /api/v1/asset
// @access Private
exports.getAsset = asyncHandler(async (req, res, next) => {
  const assets = await Asset.find({ user_id: req.user.id });

  res.status(200).json({
    success: true,
    message: "Assets retrieved successfully",
    data: assets,
  });
});

// @desc Get single asset
// @route GET /api/v1/asset/:id
// @access Private
exports.getAssetById = asyncHandler(async (req, res, next) => {
  const asset = await Asset.findById(req.params.id);
  if (!asset) {
    res.status(404);
    const error = new Error("Asset not found");
    return next(error);
  }
  if (asset.user_id.toString() !== req.user.id.toString()) {
    res.status(401);
    const error = new Error("Not authorized");
    return next(error);
  }
  res.status(200).json({
    success: true,
    message: "Asset retrieved successfully",
    data: asset,
  });
});

// @desc Create new asset
// @route POST /api/v1/asset
// @access Private
exports.createAsset = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  const { name, description, purchase_cost, purchase_date } = req.body;
  if (!name || !description || !purchase_cost || !purchase_date) {
    res.status(400);
    const error = new Error("Please add all fields");
    return next(error);
  }
  await Asset.create({
    name,
    description,
    purchase_cost,
    purchase_date,
    user_id: req.user.id,
  }).then((asset) => {
    res.status(201).json({
      success: true,
      message: "Asset created successfully",
      data: asset,
    });
  });
});

// @desc Update asset
// @route PUT /api/v1/asset/:id
// @access Private
exports.updateAsset = asyncHandler(async (req, res, next) => {
  const asset = await Asset.findById(req.params.id);
  if (!asset) {
    res.status(404);
    const error = new Error("Asset not found");
    return next(error);
  }

  if (asset.user_id.toString() !== req.user.id.toString()) {
    res.status(401);
    const error = new Error("Not authorized");
    return next(error);
  }

  const updatedAsset = await Asset.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json({
    success: true,
    message: "Asset updated successfully",
    data: updatedAsset,
  });
});

// @desc Delete asset
// @route DELETE /api/v1/asset/:id
// @access Private
exports.deleteAsset = asyncHandler(async (req, res, next) => {
  const asset = await Asset.findById(req.params.id);
  if (!asset) {
    res.status(404);
    const error = new Error("Asset not found");
    return next(error);
  }

  if (asset.user_id.toString() !== req.user.id.toString()) {
    res.status(401);
    const error = new Error("Not authorized");
    return next(error);
  }

  await Asset.deleteOne(asset);
  res.status(200).json({
    success: true,
    message: "Asset deleted successfully",
  });
});
