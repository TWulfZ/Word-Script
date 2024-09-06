import JSZip from "jszip";
import { getContentFromFile } from "./loadFile";
import { Column } from "@/zustand/store";
import { isDateString, parseAndFormatDate } from "../parseDate";

const createNewXmlContent = (originalContent: string, configColumns: Column[], csvRow: object) => {
  let newContent = originalContent;

  configColumns.forEach((col) => {
    // @ts-expect-error csvRows has any object from CSV 
    let value = csvRow[col.name];

    if (isDateString(value)) {
      value = parseAndFormatDate(value);
    }

    newContent = newContent.replaceAll(col.value, value);
  });

  return newContent;
};

const newZipFile = async (originalFile: File, newContent: string) => {
  const zip = new JSZip();
  const newFile = originalFile;

  await zip.loadAsync(newFile).then(newFile => {
    newFile.file('word/document.xml', newContent);
  });
  
  return zip;
}

export const getNewFile = async (originalFile: File, configColumns: Column[], csvRow: object) => {
  if(!originalFile || !configColumns || !csvRow) return;

  const originalContent = await getContentFromFile(originalFile);
  const newContent = await createNewXmlContent(originalContent, configColumns, csvRow);

  const newFile = await newZipFile(originalFile, newContent);

  return newFile;
}