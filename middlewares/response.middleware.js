const responseMiddleware = (req, res, next) => {
  if (res.data) {
    const { data, status, message, error } = res.data;
    const response = error ? { message: message, error: error } : data || message;
    res.status(status).json(response);
  }
  next();
};

export { responseMiddleware };
