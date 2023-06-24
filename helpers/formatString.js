const formatingString = (string) => {
  if (typeof string !== "string") {
    return null;
  }
  const formatCase = string.trim().toLowerCase();
  if (formatCase.includes(" ")) {
    return null;
  }
  const newString = formatCase[0].toUpperCase() + formatCase.slice(1);
  return newString;
};
export default formatingString;
