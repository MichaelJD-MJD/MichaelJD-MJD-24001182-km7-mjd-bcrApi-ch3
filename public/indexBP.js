const express = require("express");
require("express-async-errors");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const { z } = require("zod");
const cars = require("./data/cars.json");

//  Inisiasi express
const app = express();
const port = 3000;

// function untuk handle response sukses
const successResponse = (res, data) => {
  res.status(200).json({
    success: true,
    data,
  });
};

// class error
class BadRequestError extends Error {
  constructor(errors) {
    super("Validation Failed!");
    this.errors = errors;
    this.status = 400;
  }
}

// class not found
class NotFoundError extends Error {
  constructor(errors) {
    super("Data Not Found!");
    this.status = 404;
  }
}

// activate body parser/reader
app.use(express.json());

// routing
app.get("/", (req, res) => {
  res.status(200).json({
    message: "ping successfully",
  });
});

app.get("/cars", (req, res, next) => {
  let filteredCars = cars;

  if (Object.keys(req.query).length > 0) {
    // validate the query ketika query nya ada
    const validateQuery = z.object({
      plate: z.string(),
    });

    const resultValidateQuery = validateQuery.safeParse(req.query);
    if (!resultValidateQuery.success) {
      throw new BadRequestError(resultValidateQuery.error.errors);
    }

    filteredCars = cars.filter((car) => {
      return Object.keys(req.query).every((key) => {
        if (req.query[key]) {
          return car[key]
            .toString()
            .toLowerCase()
            .includes(req.query[key].toString().toLowerCase());
        }
        return true;
      });
    });
  }
  if (filteredCars.length === 0) {
    throw new NotFoundError();
  }
  return successResponse(res, filteredCars);
});

app.get("/cars/:id", (req, res) => {
  // validate the query
  const validateID = z.object({
    id: z.string(),
  });

  const resultValidateID = validateID.safeParse(req.params);
  if (!resultValidateID.success) {
    throw new BadRequestError(resultValidateID.error.errors);
  }

  const { id } = req.params;

  // search data mobil dengan id tsb
  const car = cars.find((car) => car.id === id);
  if (car) {
    return successResponse(res, car);
  } else {
    throw new NotFoundError();
  }
});

app.post("/cars", (req, res, next) => {
  // Validaton schema
  const validateBody = z.object({
    plate: z.string(),
    manufacture: z.string(),
    model: z.string(),
    image: z.string(),
    rentPerDay: z.coerce.number(),
    capacity: z.coerce.number(),
    description: z.string(),
    availableAt: z.string(),
    transmission: z.string(),
    available: z.coerce.boolean(),
    type: z.string(),
    year: z.coerce.number(),
    options: z.array(z.string()),
    specs: z.array(z.string()),
  });

  // Validate
  const result = validateBody.safeParse(req.body);
  if (!result.success) {
    throw new BadRequestError(result.error.errors);
  }

  // menambahkan data
  const newCar = {
    id: uuidv4(),
    ...req.body,
  };

  cars.push(newCar);

  // save ke file cars.json
  const filePath = path.join(__dirname, "data", "cars.json");

  fs.writeFile(filePath, JSON.stringify(cars, null, 2), (err) => {
    if (err) {
      return next(err);
    }
    return successResponse(res, newCar);
  });
});

app.put("/cars/:id", (req, res, next) => {
  // Validaton schema
  const validateBody = z.object({
    plate: z.string(),
    manufacture: z.string(),
    model: z.string(),
    image: z.string(),
    rentPerDay: z.coerce.number(),
    capacity: z.coerce.number(),
    description: z.string(),
    availableAt: z.string(),
    transmission: z.string(),
    available: z.coerce.boolean(),
    type: z.string(),
    year: z.coerce.number(),
    options: z.array(z.string()),
    specs: z.array(z.string()),
  });

  // Validate
  const result = validateBody.safeParse(req.body);
  if (!result.success) {
    throw new BadRequestError(result.error.errors);
  }

  const { id } = req.params;

  // search data mobil dengan id tsb
  const carIndex = cars.findIndex((car) => car.id === id);
  if (carIndex !== -1) {
    const oldCar = cars[carIndex];

    const updateCar = {
      ...oldCar,
      id,
      ...req.body,
    };

    cars.splice(carIndex, 1, updateCar);

    // save ke file cars.json
    const filePath = path.join(__dirname, "data", "cars.json");

    fs.writeFile(filePath, JSON.stringify(cars, null, 2), (err) => {
      if (err) {
        return next(err);
      }
      return successResponse(res, updateCar);
    });
    return;
  } else {
    // not found
    throw new NotFoundError();
  }
});

app.delete("/cars/:id", (req, res, next) => {
  // do it here
  const validateSchema = z.object({
    id: z.string(),
  });

  const result = validateSchema.safeParse(req.params);
  if (!result.success) {
    throw new BadRequestError(result.error.errors);
  }

  const { id } = req.params;

  // search data mobil dengan id tsb
  const carIndex = cars.findIndex((car) => car.id === id);
  if (carIndex !== -1) {
    cars.splice(carIndex, 1);

    // save ke file cars.json
    const filePath = path.join(__dirname, "data", "cars.json");

    fs.writeFile(filePath, JSON.stringify(cars, null, 2), (err) => {
      if (err) {
        return next(err);
      }
      return successResponse(res, cars);
    });
    return;
  } else {
    throw new NotFoundError();
  }
});

// Function untuk handle error
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const errors = err.errors || [];
  let message = err.message;
  if (status == 500) {
    message = "Internal Server Error";
  }

  res.status(status).json({
    success: false,
    data: null,
    message,
    errors,
  });
});

// Run the express.js application
app.listen(port, () => {
  console.log(`The express.js app is runing on port ${port}`);
});
