import { UploadIcon, FileUpIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// App Main
import Info from "@/components/App/Main/components/Info";
import AdvancedOptions from "@/components/App/Main/components/AdvancedOptions";
import Summary from "@/components/App/Main/components/Summary";

import { useEffect, useState } from "react";
import { TFields, useConfigStore, useDataStore, useSessionStore } from "@/zustand/store";
// Utils
import { csvUpload, docUpload, colsUpdate } from "../functions";
import FieldAlert from "./FieldAlert";

const Main = () => {
  // CSV
  const { fileName, setFileName } = useDataStore();
  const { csvData, setCsvData } = useDataStore();
  // Doc
  const { docName, setDocName } = useDataStore();
  const { docFile, setDocFile } = useDataStore();
  const { docFields, setDocFields } = useDataStore();
  // PageState
  const { columns, setColumns } = useConfigStore();
  const { setSelectedColumn } = useSessionStore();
  const [fields, setFields] = useState<TFields | null>(null);
  const [alertOpen, setAlertOpen] = useState(false);

  const handleCSVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    csvUpload({ event: e, setCsvData, setFileName });
  };


  const resetDocState = () => {
    setDocName("");
    setDocFile(null);
    setDocFields({ foundFields: [], missingFields: [] });
    setFields(null);
  };
  
  const handleMissingFields = (fields: TFields | undefined) => {
    if (fields?.missingFields && fields.missingFields.length > 0) {
      setFields(fields);
      setAlertOpen(true);
      return true;
    }
    return false;
  };
  
  const setFoundFields = (fields: TFields) => {
    if (fields && fields.foundFields.length === columns.length) {
      setDocFields(fields);
    }
  };
  
  const handleDocUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    resetDocState();
    const fields = await docUpload({event: e, columns, setDocFile});
    
    // Check if there are missing fields and ask for confirmation
    if (handleMissingFields(fields)) return;
    
    setFoundFields(fields);
  };

  useEffect(() => {
    if (csvData.length > 0) {
      colsUpdate({ csvData, setColumns, setSelectedColumn });
      console.log(csvData);
      
    }
  }, [csvData, setColumns, setSelectedColumn]);

  useEffect(() => {
    // update doc name
    if (docFile && docFields && docFields.foundFields.length === columns.length) {
      setDocName(docFile.name);
    }
  },[docFile, docFields, setDocName, columns, csvData]);

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
          {docName && <span className="text-sm text-muted-foreground">{docName}</span>}
        </div>
        <AdvancedOptions />
      </div>
      {alertOpen && (
        <FieldAlert fields={fields} setAlertOpen={setAlertOpen} setDocFields={setDocFields} setDocName={setDocName} docName={docFile!.name}/>
      )}
    </main>
  );
};

export default Main;

export { AdvancedOptions, Info, Summary };
