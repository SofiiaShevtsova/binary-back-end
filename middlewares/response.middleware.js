const responseMiddleware = (req, res, next) => {
  console.log(res.data);
  if (res.data) {
    const { data, status, message } = res.data;
    res.status(status).json(data || message);
  }
  next();
};

export { responseMiddleware };
