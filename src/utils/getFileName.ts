export const getFileName = (path: string) => path.split("\\").pop() || path.split("/").pop() || ""
