const responseMiddleware = (req, res, next) => {
  if (res.data) {
    const { data, status, message } = res.data;
    res.status(status).json(data || message);
  }
  next();
};

export { responseMiddleware };
