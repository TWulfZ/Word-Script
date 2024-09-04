import JSZip from "jszip";

export const getContentFromFile = async (file: File) => {
  const data = await JSZip.loadAsync(file);
  const content = await data.files["word/document.xml"].async("string");

  return content;
};

const getContentFields = (content: string, list: string[]) => {
  const fields = list.filter(text => content.includes(text));
  return fields
};

export const getFieldsFrom = async (file: File, list: string[]) => {
  if (!file) return;

  console.log(list);
  
  const string = await getContentFromFile(file);
  const foundFields = await getContentFields(string, list);
  const missingFields = list.filter(field => !foundFields.includes(field));
  
  return { foundFields, missingFields };
};