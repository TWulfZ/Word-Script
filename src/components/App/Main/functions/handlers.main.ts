import Papa, { ParseResult } from "papaparse";
import { getFieldsFrom } from "@/utils/loadFile";
import { Column, TFields } from "@/zustand/store";

interface TCsvUpload {
  event: React.ChangeEvent<HTMLInputElement>;
  setCsvData: (csvData: object[]) => void;
  setFileName: (fileName: string) => void;
}

export const csvUpload = ({event, setCsvData, setFileName}: TCsvUpload) => {
  const inputFile = event.target.files?.[0];
    if (!inputFile) {
      return;
    }
    Papa.parse(inputFile, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (result: ParseResult<string[]>) => {
        const cols = result.data;
        console.log(cols); // TODO: Remove debug cols
        setCsvData(cols);
      },
    });

    setFileName(inputFile.name);
}

interface TDocxUpload {
  event: React.ChangeEvent<HTMLInputElement>;
  columns: Column[]
  setDocFile: (docFile: File) => void
}

export const docUpload = async ({event, columns, setDocFile}: TDocxUpload): Promise<TFields | undefined> => {
  const inputFile = event.target.files?.[0];
  if (!inputFile) {
    return;
  }
  setDocFile(inputFile);
  console.log("-- Setted Doc File --");
  
  const cols = columns.map(col => col.value);
  const fields = await getFieldsFrom(inputFile, cols);
  /*if (fields && fields.missingFields.length > 0) {
    return confirm(`Faltan las siguientes columnas: ${fields.missingFields.join(", ")}`) ? null : fields;
  }*/

  return fields;
}