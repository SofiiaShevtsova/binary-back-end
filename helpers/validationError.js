const validationError = (message, res) => {
  return (res.data = { message: message, status: 400 });
};

export default validationError