import JSZip from "jszip";
import { getContentFromFile } from "./loadFile";
import { Column } from "@/zustand/store";

const createNewXmlContent = (originalContent: string, newData: Column[]) => {
    let newContent = originalContent;

    newData.forEach((col) => {
        newContent = newContent.replaceAll(`[${col.name}]`, col.value);
    })

    return newContent;
};

const newZipFile = (originalFile: File, newContent: string) => {
  const zip = new JSZip();
  const newFile = originalFile;

  zip.loadAsync(newFile).then(newFile => {
    newFile.file('word/document.xml', newContent);
  });
  
  return zip;
}

export const getNewFile = async (originalFile: File, newData: Column[]) => {
  if(!originalFile || !newData) return;

  const originalContent = await getContentFromFile(originalFile);
  const newContent = createNewXmlContent(originalContent, newData);

  const newFile = await newZipFile(originalFile, newContent);

  return newFile;
}