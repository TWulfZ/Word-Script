import { parse, format, isValid } from "date-fns";
import { es } from "date-fns/locale";

export const isDateString = (value: string): boolean => {
  // Pattern to check if the string is in the format "yyyy/MM/dd" or "yyyy/MM/dd HH:mm:ss"
  const datePattern = /^\d{4}\/\d{2}\/\d{2}\s\d{1,2}:\d{2}:\d{2}\s[ap]\.\s?m\.\s?GMT[+-]\d{1,2}$/i;
  return datePattern.test(value);
};

export const parseAndFormatDate = (value: string): string => {
  // Posible date formats
  const normalizedValue = value
    .replace(/\s([ap])\.?\s?m\.?/i, (_match, p1) => ` ${p1.toLowerCase()}m`)
    .replace(/\s?GMT[+-]\d{1,2}$/, "");

  const date = parse(normalizedValue, "yyyy/MM/dd h:mm:ss a", new Date(), { locale: es });

  if (isValid(date)) {
    return format(date, "yyyy-MM-dd");
  }
  // If the date is not valid, return the original value
  return value;
};
