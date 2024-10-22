const sendDevError = function (err, req, res) {
  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }
};

const globalErrorHandler = function (err, req, res, next) {
  err.status = err.status || 'error';
  err.statusCode = err.statusCode || 500;
  if (process.env.NODE_ENV === 'development') {
    sendDevError(err, req, res);
  }
  next();
};

module.exports = { globalErrorHandler };
