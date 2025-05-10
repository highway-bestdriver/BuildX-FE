export const useValidateType = (value: string, type?: string): boolean => {
  if (!type) return true;

  try {
    const parsed = JSON.parse(value);

    switch (type) {
      case "int":
        return Number.isInteger(parsed);
      case "float":
        return typeof parsed === "number";
      case "str":
        return typeof value === "string";
      case "bool":
        return parsed === true || parsed === false;
      case "List[int]":
        return Array.isArray(parsed) && parsed.every(Number.isInteger);
      case "List[float]":
        return (
          Array.isArray(parsed) && parsed.every((n) => typeof n === "number")
        );
      case "Union[int, List[int]]":
        return (
          Number.isInteger(parsed) ||
          (Array.isArray(parsed) && parsed.every(Number.isInteger))
        );
      case "Union[float, List[float]]":
        return (
          typeof parsed === "number" ||
          (Array.isArray(parsed) && parsed.every((n) => typeof n === "number"))
        );
      case "Union[int, str]":
        return Number.isInteger(parsed) || typeof value === "string";
      default:
        return true;
    }
  } catch {
    return false; // JSON.parse 실패
  }
};
