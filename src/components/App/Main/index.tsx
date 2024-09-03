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
import { getFileName } from "@/utils/getFileName";

interface Column {
  name: string;
  value: string;
}

const Main = () => {
  const { csvData, setCsvData } = useDataStore();
  const { fileName, setFileName } = useDataStore();
  const { setColumns } = useConfigStore();
  const { setSelectedColumn } = useSessionStore();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      
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
          <Button variant="outline" onClick={e => read(e)}>
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
