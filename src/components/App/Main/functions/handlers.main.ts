import Papa, { ParseResult } from "papaparse";
import { getFieldsFrom } from "@/utils/doc/loadFile";
import { Column, TFields } from "@/zustand/store";
import { toast } from "react-toastify";

interface TCsvUpload {
  event: React.ChangeEvent<HTMLInputElement>;
  setCsvData: (csvData: object[]) => void;
  setFileName: (fileName: string) => void;
}

export const csvUpload = ({ event, setCsvData, setFileName }: TCsvUpload) => {
  const inputFile = event.target.files?.[0];
  if (!inputFile) {
    return;
  }
  console.log(inputFile.type);
  
  Papa.parse(inputFile, {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    complete: (result: ParseResult<string[]>) => {
      const cols = result.data;
      setCsvData(cols);
    },
  });

  setFileName(inputFile.name);
};

interface TDocxUpload {
  event: React.ChangeEvent<HTMLInputElement>;
  columns: Column[];
  setDocFile: (docFile: File) => void;
}

export const docUpload = async ({ event, columns, setDocFile }: TDocxUpload): Promise<TFields> => {
  const inputFile = event.target.files?.[0];
  if (!inputFile) {
    toast.error("No se ha seleccionado un archivo");
    return { foundFields: [], missingFields: [] };
  }

  setDocFile(inputFile);

  const cols = columns.map((col) => col.value);
  const fields = await getFieldsFrom(inputFile, cols);

  return fields ? fields : { foundFields: [], missingFields: [] };
};
