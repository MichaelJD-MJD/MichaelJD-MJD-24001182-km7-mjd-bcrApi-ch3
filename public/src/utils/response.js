// function untuk handle response sukses
exports.successResponse = (res, data) => {
  res.status(200).json({
    success: true,
    data,
  });
};
