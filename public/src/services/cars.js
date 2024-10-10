const carsRepository = require("../repositories/cars");
const { imageUpload } = require("../utils/image-kit");
const { NotFoundError, InternalServerError } = require("../utils/request");

exports.getCars = (query) => {
    const data =  carsRepository.getCars(query);
    if (data.length === 0) {
      throw new NotFoundError();
    }
    return data;
}

exports.getCarById = (id) => {
    const car = carsRepository.getCarById(id);
    if(!car){
        throw new NotFoundError("Car is Not Found!");
    }

    return car;
}

exports.createCar = async(data, file) => {
  // upload file to image kit
  if(file.image){
    data.image = await imageUpload(file.image);
  }

    return carsRepository.createCar(data);
};

exports.updateCar = async(id, data, file) => {
  // cek apakah ada file yang diupload
  if(file.image){
    data.image = await imageUpload(file.image);
  }

  const existingCar = carsRepository.getCarById(id);
  if (!existingCar) {
    throw new NotFoundError("Car is Not Found!");
  }

  const updateCar = carsRepository.updateCar(id, data);
  if(!updateCar){
    throw new InternalServerError(["Failed to update car!"]);
  }

  return updateCar;
}

exports.deleteCarById = (id) => {
    const existingCar = carsRepository.getCarById(id);
    if (!existingCar) {
      throw new NotFoundError("Car is Not Found!");
    }

    const deletedCar = carsRepository.deleteCarById(id);
    if (!deletedCar) {
      throw new InternalServerError(["Failed to delete car!"]);
    }

    return deletedCar;
}