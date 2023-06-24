const validationError = (message, res) => {
  return (res.err = { message: message});
};

export default validationError