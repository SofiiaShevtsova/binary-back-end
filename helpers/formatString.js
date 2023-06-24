const formatingString = (string) => {
  const formatCase = string.trim().toLowerCase();
  const newString = formatCase[0].toUpperCase() + formatCase.slice(1);
  return newString;
};
export default formatingString;
