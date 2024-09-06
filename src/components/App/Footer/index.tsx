import { Button } from "@/components/ui/button";
import { getNewFile } from "@/utils/doc/newEditFile";
import { saveAs } from "file-saver";
import { useConfigStore, useDataStore } from "@/zustand/store";
import { FileTextIcon } from "lucide-react";
import { useEffect, useState } from "react";
import JSZip from "jszip";

const Footer = () => {
  const { docFields, docFile, csvData, docName } = useDataStore();
  const { columns } = useConfigStore();
  const [loading, setLoading] = useState(false);

  const downloadDocx = async () => {
    const baseName = docName.split(".")[0];
    setLoading(true);
    try {
      const zip = new JSZip();

      for (let i = 0; i < csvData.length; i++) {
        const file = await getNewFile(docFile!, columns, csvData[i]);
        if (file) {
          const blob = await file.generateAsync({ type: "blob" });
          zip.file(`${baseName}_${i + 1}.docx`, blob);
        } else {
          console.error(`No se pudo generar el archivo para la fila ${i + 1}`);
        }
      }

      const zipBlob = await zip.generateAsync({ type: "blob" });
      saveAs(zipBlob, `${baseName}_documentos.zip`);
    } catch (error) {
      console.error("Error al generar los archivos:", error);
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
