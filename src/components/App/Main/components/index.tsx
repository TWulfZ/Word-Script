import { UploadIcon, FileUpIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// App Main
import Info from "@/components/App/Main/components/Info";
import AdvancedOptions from "@/components/App/Main/components/AdvancedOptions";
import Summary from "@/components/App/Main/components/Summary";

import { useEffect, useState } from "react";
import { useConfigStore, useDataStore, useSessionStore } from "@/zustand/store";
// Utils
import { csvUpload, docUpload, colsUpdate } from "../functions";

const Main = () => {
  const { csvData, setCsvData } = useDataStore();
  const { fileName, setFileName } = useDataStore();
  const { docFile, setDocFile } = useDataStore();
  const { columns, setColumns } = useConfigStore();
  const { setSelectedColumn } = useSessionStore();

  const handleCSVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    csvUpload({ event: e, setCsvData, setFileName });
  };

  const handleDocUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fields = await docUpload({event: e, columns, setDocFile});

    console.log(fields);
    
  };

  useEffect(() => {
    if (csvData.length > 0) {
      colsUpdate({ csvData, setColumns, setSelectedColumn });
    }
  }, [csvData, setColumns, setSelectedColumn]);

  return (
    <main className="transition-all duration-300 ease-in-out">
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={() => document.getElementById("csv-upload")?.click()}>
            <UploadIcon className="mr-2 h-4 w-4" />
            Importar CSV
          </Button>
          <Input id="csv-upload" type="file" accept=".csv" className="hidden" onChange={handleCSVUpload} />
          {fileName && <span className="text-sm text-muted-foreground">{fileName}</span>}
        </div>

        {csvData.length > 0 && <Summary />}

        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={() => document.getElementById("template-upload")?.click()}>
            <FileUpIcon className="mr-2 h-4 w-4" />
            Importar Plantilla
          </Button>
          <Input id="template-upload" type="file" accept=".docx" className="hidden" onChange={handleDocUpload}/>
        </div>
        <AdvancedOptions />
      </div>
    </main>
  );
};

export default Main;

export { AdvancedOptions, Info, Summary };
