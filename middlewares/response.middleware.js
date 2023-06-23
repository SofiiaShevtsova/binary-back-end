const responseMiddleware = (req, res, next) => {
  if (res.data) {
    const { data, status, message } = res.data;
    res.status(status).json(data || message);
  }
  // TODO: Implement middleware that returns result of the query
  next();
};

export { responseMiddleware };
