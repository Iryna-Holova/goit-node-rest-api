const handleSaveError = (error, data, next) => {
  error.status = 400;
  next();
};

const setUpdateSettings = function (next) {
  this.options.new = true;
  this.options.runValidators = true;
  next();
};

export default { handleSaveError, setUpdateSettings };
