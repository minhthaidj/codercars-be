const mongoose = require("mongoose");
const Car = require("../models/Car");
const carController = {};
const { sendResponse, AppError } = require("../helpers/utils.js");

// Post a car
carController.createCar = async (req, res, next) => {
  const info = req.body;
  try {
    if (!info) throw new AppError(402, "Bad Request", "Create Car Error");
    const created = await Car.create(info);
    sendResponse(res, 200, { data: created }, "Create Car Success");
  } catch (err) {
    next(err);
  }
};

// Get cars
carController.getCars = async (req, res, next) => {
  const { query } = req;

  const page = req.query.page ? req.query.page : 1;
  const limit = req.query.limit ? req.query.limit : 10;

  const filter = {};
  try {
    const listOfOriginal = await Car.find();
    const listOfFound = await Car.find(filter)
      .limit(limit)
      .skip(limit * (page - 1));
    sendResponse(
      res,
      200,
      { cars: listOfFound },
      "Get Car List Successfully!",
      page,
      Math.ceil(listOfOriginal.length / limit)
    );
  } catch (err) {
    next(err);
  }
};

// Edit a car
carController.editCar = async (req, res, next) => {
  const targetId = req.params.id;
  const updateInfo = req.body;
  const options = { new: true };
  try {
    const updated = await Car.findByIdAndUpdate(targetId, updateInfo, options);
    sendResponse(res, 200, { data: updated }, "Update car success");
  } catch (err) {
    next(err);
  }
};

// Hard delete a car
carController.deleteCar = async (req, res, next) => {
  const targetId = req.params.id;
  const options = { new: true };
  try {
    const updated = await Car.findByIdAndDelete(targetId, options);
    sendResponse(res, 200, { data: updated }, "Delete car success");
  } catch (err) {
    next(err);
  }
};

module.exports = carController;
