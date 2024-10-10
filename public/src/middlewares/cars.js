const { z } = require("zod");
const { BadRequestError } = require("../utils/request");

exports.validateGetCars = (req, res, next) => {
  if (Object.keys(req.query).length > 0) {
    const validateQuery = z.object({
      plate: z.string(),
    });

    const resultValidateQuery = validateQuery.safeParse(req.query);
    if (!resultValidateQuery.success) {
      throw new BadRequestError(resultValidateQuery.error.errors);
    }

    next();
  }
  next();
};

exports.validateGetCarById = (req, res, next) => {
  // validate the query
  const validateID = z.object({
    id: z.string(),
  });

  const resultValidateID = validateID.safeParse(req.params);
  if (!resultValidateID.success) {
    throw new BadRequestError(resultValidateID.error.errors);
  }

  next();
};

exports.validateCreateCar = (req, res, next) => {
  // Validaton schema
  const validateBody = z.object({
    plate: z.string(),
    manufacture: z.string(),
    model: z.string(),
    rentPerDay: z.coerce.number(),
    capacity: z.coerce.number(),
    description: z.string(),
    availableAt: z.string(),
    transmission: z.string(),
    available: z.coerce.boolean(),
    type: z.string(),
    year: z.coerce.number(),
    options: z.array(z.string()).nullable().optional(),
    specs: z.array(z.string()).nullable().optional(),
  });

  // Validate File Body
  const validateFileBody = z.object({
    image: z.object({
      name: z.string(),
      data: z.any(),
    })
    .nullable()
    .optional(),
  })
  .nullable()
  .optional();

  // Validate
  const result = validateBody.safeParse(req.body);
  if (!result.success) {
    throw new BadRequestError(result.error.errors);
  }

  const resultValidateFiles = validateFileBody.safeParse(req.files);
  if(!resultValidateFiles.success){
    throw new BadRequestError(result.error.erros);
  }

  next();
};

exports.validateUpdateCar = (req, res, next) => {
  const validateParams = z.object({
    id: z.string(),
  });

  const resultValidateParams = validateParams.safeParse(req.params);
  if (!resultValidateParams.success) {
    // If validation fails, return error messages
    throw new BadRequestError(result.error.errors);
  }

  // Validate File Body
  const validateFileBody = z
    .object({
      image: z
        .object({
          name: z.string(),
          data: z.any(),
        })
        .nullable()
        .optional(),
    })
    .nullable()
    .optional();

    const resultValidateFiles = validateFileBody.safeParse(req.files);
    if (!resultValidateFiles.success) {
      throw new BadRequestError(result.error.erros);
    }

  // Validaton schema
  const validateBody = z.object({
    plate: z.string(),
    manufacture: z.string(),
    model: z.string(),
    rentPerDay: z.coerce.number(),
    capacity: z.coerce.number(),
    description: z.string(),
    availableAt: z.string(),
    transmission: z.string(),
    available: z.coerce.boolean(),
    type: z.string(),
    year: z.coerce.number(),
    options: z.array(z.string()).nullable().optional(),
    specs: z.array(z.string()).nullable().optional(),
  });

  // Validate
  const result = validateBody.safeParse(req.body);
  if (!result.success) {
    throw new BadRequestError(result.error.errors);
  }

  next();
};

exports.validateDeleteCarById = (req, res, next) => {
  const validateSchema = z.object({
    id: z.string(),
  });

  const result = validateSchema.safeParse(req.params);
  if (!result.success) {
    throw new BadRequestError(result.error.errors);
  }

  next();
};
