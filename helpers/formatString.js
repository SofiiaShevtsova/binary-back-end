const formatingString = (string) => {
  if (typeof string !== "string") {
    return null;
  }
  const newString = string.trim().toLowerCase();
  if (newString.includes(" ")) {
    return null;
  }
  return newString;
};
export default formatingString;
