const carService = require("../services/cars");
const { successResponse } = require("../utils/response");

exports.getCars = (req, res, next) => {
      const data = carService.getCars(req.query);
       
      successResponse(res, data);
}

exports.getCarById = (req, res, next) => {
    const { id } = req.params;
    const data = carService.getCarById(id);
    successResponse(res, data);
}

exports.createCar = async (req, res, next) => {
  req.body.year = Number(req.body.year);
  req.body.capacity = Number(req.body.capacity);
  req.body.rentPerDay = Number(req.body.rentPerDay);
  req.body.available = Boolean(req.body.available);
  const data = await carService.createCar(req.body, req.files);
  successResponse(res, data);
};

exports.updateStudent = async(req, res, next) => {
    req.body.year = Number(req.body.year);
    req.body.capacity = Number(req.body.capacity);
    req.body.rentPerDay = Number(req.body.rentPerDay);
    req.body.available = Boolean(req.body.available);
    const { id } = req.params;
    const data = await carService.updateCar(id, req.body, req.files);
    successResponse(res, data);
}

exports.deleteCarById = (req, res, next) => {
    const { id } = req.params;
    const data = carService.deleteCarById(id);
    successResponse(res, data);
}