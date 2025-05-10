export const validateType = (value: string, type?: string): boolean => {
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

      case "Union[int, float, List[int], List[float], None, Dict]":
        if (value.trim() === "" || value === "null") return true;

        try {
          const parsed = JSON.parse(value);

          const isInt = Number.isInteger(parsed);
          const isFloat = typeof parsed === "number";
          const isListInt =
            Array.isArray(parsed) && parsed.every((v) => Number.isInteger(v));
          const isListFloat =
            Array.isArray(parsed) && parsed.every((v) => typeof v === "number");

          const isDict =
            typeof parsed === "object" &&
            !Array.isArray(parsed) &&
            parsed !== null &&
            Object.values(parsed).every((v) => {
              if (v === null) return true;
              if (typeof v === "number") return true;
              if (Array.isArray(v))
                return v.every((item) => typeof item === "number");
              return false;
            });

          return isInt || isFloat || isListInt || isListFloat || isDict;
        } catch {
          return false;
        }

      case "Literal['constant', 'edge', 'reflect', 'symmetric']":
        const allowedLiterals = ["constant", "edge", "reflect", "symmetric"];
        return allowedLiterals.includes(value.trim());

      case "Literal['nearest', 'linear', 'bilinear', 'bicubic', 'trilinear', 'area']":
        const allowedLietrals = [
          "nearest",
          "linear",
          "bilinear",
          "bicubic",
          "trilinear",
          "area",
        ];
        return allowedLietrals.includes(value.trim());

      default:
        return true;
    }
  } catch {
    return false; // JSON.parse 실패
  }
};
