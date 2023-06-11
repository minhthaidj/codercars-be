const utilsHelper = {};

utilsHelper.sendResponse = (res, status, data, message, page, total) => {
  const response = {};
  if (message) response.message = message;
  if (data) response.data = data;
  if (page) response.page = page;
  if (total) response.total = total;
  return res.status(status).json(response);
};

class AppError extends Error {
  constructor(statusCode, message, errorType) {
    super(message);
    this.statusCode = statusCode;
    this.errorType = errorType;
    // all errors using this class are operational errors.
    this.isOperational = true;
    // create a stack trace for debugging (Error obj, void obj to avoid stack polution)
    Error.captureStackTrace(this, this.constructor);
  }
}

utilsHelper.AppError = AppError;
module.exports = utilsHelper;
