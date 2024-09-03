import Papa, { ParseResult } from "papaparse";

interface Parameters {
  event: React.ChangeEvent<HTMLInputElement>;
  setCsvData: (csvData: object[]) => void;
  setFileName: (fileName: string) => void;
}

export const csvUpload = ({event, setCsvData, setFileName}: Parameters) => {
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

export const docUpload = ({event}: Parameters) => {
  
}