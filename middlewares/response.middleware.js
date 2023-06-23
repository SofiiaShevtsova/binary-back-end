const responseMiddleware = (req, res, next) => {
  console.log(res.data);
  res.json(res.data)
  // TODO: Implement middleware that returns result of the query
  next();
};

export { responseMiddleware };
