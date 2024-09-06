import { Button } from "@/components/ui/button";
import { getNewFile } from "@/utils/doc/newEditFile";
import { saveAs } from "file-saver";
import { useConfigStore, useDataStore } from "@/zustand/store";
import { FileTextIcon } from "lucide-react";
import { useEffect, useState } from "react";

const Footer = () => {
  const { docFields, docFile, csvData, docName } = useDataStore();
  const { columns } = useConfigStore();
  // TODO: download a ZIP with all files
  const [loading, setLoading] = useState(false);

  const downloadDocx = async () => {
    setLoading(true);
    try {
      const file = await getNewFile(docFile!, columns, csvData[0]);
      console.log(file);
      
      if (file) {
        const blob = await file.generateAsync({ type: "blob" });
        console.log("Blob size:", blob.size);
        saveAs(blob, docName);
      } else {
        console.error("No se pudo generar el archivo");
      }
    } catch (error) {
      console.error("Error al generar el archivo:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(docFields);
  }, [docFields]);
  return (
    <footer className="flex justify-end transition-all duration-300 ease-in-out">
      <Button disabled={!(docFields.foundFields.length > 0 || loading)} onClick={downloadDocx}>
        {loading ? (
          "Descargando..."
        ) : (
          <>
            <FileTextIcon className="mr-2 h-4 w-4" /> Generar Documentos
          </>
        )}
      </Button>
    </footer>
  );
};

export default Footer;