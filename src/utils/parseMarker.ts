export const parseMarker = (marker: string) => {
  return marker
    .normalize("NFD") // Break down accented characters (e.g. ""á" -> "a" + "́ ")
    .replace(/^[A-Za-z]\.\s*/, "") // Remove initial punctuation
    .replace(/[\u0300-\u036f]/g, "") // Remove accents
    .replace(/[^\p{L}\s]/gu, "") // Remove all characters
    .trim() // Remove whitespace
    .toLowerCase()
}