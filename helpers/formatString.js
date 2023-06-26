const formatingString = (string) => {
  if (typeof string !== "string") {
    return null;
  }
  const newString = string.trim();
  if (newString.includes(" ") || newString.length > 15) {
    return null;
  }
  return newString;
};
export default formatingString;
