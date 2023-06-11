const fs = require("fs");
const csv = require("csvtojson");
const mongoose = require("mongoose");
const { Types } = require("mongoose");
const Car = require("./models/Car.js");
require("dotenv/config");

// Connect to MONGODB
mongoose.connect(process.env.MONGO_URI, () => {
  console.log("Connected to Database!");
});

const main = async () => {
  let newData = await csv().fromFile("cars.csv");
  newData = newData.map((e) => {
    const i = newData.indexOf(e);
    const newCar = new Car({
      _id: `000000000000000000000000${i}`.slice(-24),
      make: e.Make,
      model: e.Model,
      release_date: e.Year,
      transmission_type: e.Transmission_Type,
      size: e.Vehicle_Size,
      style: e.Vehicle_Style,
      price: e.MSRP,
      isDeleted: false,
    });
    newCar.save();
  });
  console.log("done");
};
main().catch((err) => console.log(err));
