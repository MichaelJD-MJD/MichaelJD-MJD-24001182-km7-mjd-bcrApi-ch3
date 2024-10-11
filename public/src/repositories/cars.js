const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const cars = require("../../data/cars.json");

exports.getCars = (query) => {
    let filteredCars = cars;

    if (Object.keys(query).length > 0){
        filteredCars = cars.filter((car) => {
          return Object.keys(query).every((key) => {
            if (query[key]) {
              return car[key]
                .toString()
                .toLowerCase()
                .includes(query[key].toString().toLowerCase());
            }
            return true;
          });
        });
    }
    return filteredCars;
}

exports.getCarById = (id) => {
  // search data mobil dengan id tsb
  const car = cars.find((car) => car.id == id);
  return car;
}

exports.createCar = (data) => {
  // menambahkan data
  const newCar = {
    id: uuidv4(),
    ...data,
  };

  cars.push(newCar);

  fs.writeFileSync(
    "./public/data/cars.json",
    JSON.stringify(cars, null, 2),
    "utf-8"
  );

  return newCar;
}

exports.updateCar = (id, data) => {
  // search data mobil dengan id tsb
  const carIndex = cars.findIndex((car) => car.id === id);
  if (carIndex !== -1) {
    const oldCar = cars[carIndex];

    const updateCar = {
      ...oldCar,
      id,
      ...data,
    };

    cars.splice(carIndex, 1, updateCar);

     fs.writeFileSync(
       "./public/data/cars.json",
       JSON.stringify(cars, null, 2),
       "utf-8"
     );
    return updateCar;
  }
}

exports.deleteCarById = (id) => {
  // search data mobil dengan id tsb
  const carIndex = cars.findIndex((car) => car.id === id);
  if (carIndex !== -1) {
    const deletedCar = cars.splice(carIndex, 1);

    fs.writeFileSync(
      "./public/data/cars.json",
      JSON.stringify(cars, null, 2),
      "utf-8"
    );
    return deletedCar;
  }
}