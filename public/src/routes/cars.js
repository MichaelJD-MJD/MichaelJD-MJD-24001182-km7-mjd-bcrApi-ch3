const express = require("express");
const {
  validateGetCars,
  validateGetCarById,
  validateCreateCar,
  validateUpdateCar,
  validateDeleteCarById,
} = require("../middlewares/cars");
const { getCars, getCarById, createCar, updateStudent, deleteCarById } = require("../controllers/cars");

const router = express.Router();

router.get("/", validateGetCars, getCars);
router.post("/", validateCreateCar, createCar);
router.get("/:id", validateGetCarById, getCarById);
router.put("/:id", validateUpdateCar, updateStudent);
router.delete("/:id", validateDeleteCarById, deleteCarById);

module.exports = router;
