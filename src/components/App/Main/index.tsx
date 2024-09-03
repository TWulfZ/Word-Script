import { UploadIcon, FileUpIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// App Main
import Info from "@components/App/Main/Info";
import AdvancedOptions from "@components/App/Main/AdvancedOptions";
import Summary from "@components/App/Main/Summary";

import { useEffect } from "react";
import { useConfigStore, useDataStore, useSessionStore } from "@/zustand/store";
// Utils

import { read } from 'xlsx';
import { dialog } from "electron";

interface Column {
  name: string;
  value: string;
}

const Main = () => {
  const { csvData, setCsvData } = useDataStore();
  const { fileName, setFileName } = useDataStore();
  const { setColumns } = useConfigStore();
  const { setSelectedColumn } = useSessionStore();

  const handleFileUpload = async () => {
    try {
      dialog.showOpenDialog({
        
        filters: [{ name: "CSV", extensions: ["csv"] }],
      })
      /*const filePath = await open({
        multiple: false,
        directory: false,
        filters: [{ name: "CSV", extensions: ["csv"] }],
      });

      if (filePath) {
        setFileName(getFileName(filePath));
        const data = await readFile(filePath);
        const workbook = read(data, { type: "binary" });
        console.log("Workbook:", workbook);
      }*/
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (csvData.length > 0) {
      const cols = csvData[0].map<Column>((col) => {
        return { name: col, value: `{{${col}}}` };
      });

      setColumns(cols);
      setSelectedColumn(cols[0]);
    }
  }, [csvData]);

  return (
    <main className="transition-all duration-300 ease-in-out">
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={handleFileUpload}>
            <UploadIcon className="mr-2 h-4 w-4" />
            Importar CSV
          </Button>
          {fileName && <span className="text-sm text-muted-foreground">{fileName}</span>}
        </div>

        {csvData.length > 0 && <Summary />}

        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={() => document.getElementById("template-upload")?.click()}>
            <FileUpIcon className="mr-2 h-4 w-4" />
            Importar Plantilla
          </Button>
          <Input id="template-upload" type="file" accept=".docx" className="hidden" />
        </div>
        <AdvancedOptions />
      </div>
    </main>
  );
};

export default Main;

export { AdvancedOptions, Info, Summary };
