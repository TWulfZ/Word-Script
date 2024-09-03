interface TruncateTextOptions {
  maxWords?: number;
  maxChars?: number;
  ellipsis?: string;
}

export const truncateText = (text: string, options: TruncateTextOptions): string => {
  const { maxWords, maxChars, ellipsis = "..." } = options;

  if (!maxWords && !maxChars) {
    throw new Error("Debe especificar maxWords o maxChars");
  }

  if (maxChars && text.length <= maxChars) {
    return text;
  }

  if (maxWords) {
    const words = text.split(" ");
    if (words.length <= maxWords) {
      return text;
    }
    const truncated = words.slice(0, maxWords).join(" ");
    return maxChars
      ? truncated.slice(0, maxChars - ellipsis.length) + ellipsis
      : truncated + ellipsis;
  }

  if (maxChars) {
    return text.slice(0, maxChars - ellipsis.length) + ellipsis;
  }

  return text;
};