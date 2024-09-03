import { Badge } from "@/components/ui/badge";
import ColorBadge from "@components/ColorBadge";
import { Label } from "@/components/ui/label";
import { ListIcon } from "lucide-react";
import { useConfigStore, useDataStore, useSessionStore } from "@/zustand/store";
import Info from "./Info";
import { Input } from "@/components/ui/input";

const Summary = () => {
  const { csvData} = useDataStore();
  const { columns, setColumns } = useConfigStore();
  const { selectedColumn, setSelectedColumn } = useSessionStore()

  const handleBadgeClick = (column: string) => {
    const selectedCol = columns.find((col) => col.name === column);
    setSelectedColumn(selectedCol!);
  };

  const handleColumnChange = (name: string, e: React.FormEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;

    const newCols = columns.map((col) => (col.name === name ? { ...col, value: newValue } : col));
    setColumns(newCols);

    if (selectedColumn?.name === name) {
      setSelectedColumn({ ...selectedColumn, value: newValue });
    }
  };

  return (
    <>
            <div className="rounded-md bg-muted p-4">
              <h3 className="mb-2 flex items-center text-lg font-semibold">
                <ListIcon className="mr-2 h-5 w-5" />
                Resumen del CSV
              </h3>
              <div className="mb-2 flex items-center justify-between">
                <span>
                  Número de filas: <Badge variant="secondary">{csvData.length - 1}</Badge>
                </span>
                <span>
                  Número de columnas: <Badge variant="secondary">{csvData[0].length}</Badge>
                </span>
              </div>
              <div>
                <span className="font-medium">Columnas:</span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {csvData[0].map((columnName) => (
                    <Badge
                      key={columnName}
                      variant="outline"
                      className={`cursor-pointer ${
                        selectedColumn && selectedColumn.name === columnName ? "bg-blue-100 text-blue-800" : ""
                      }`}
                      onClick={() => handleBadgeClick(columnName)}
                    >
                      {columnName}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                Marcador
                <Info title="Marcador de columna">
                  Este es el marcador que se utilizará en Word para buscar y reemplazar los valores de cada columna
                  donde se encuentre este texto. Por ejemplo:
                  <p className="mt-2">En tu plantilla de Word</p>
                  <p className="my-1 border border-gray-200 p-2">
                    A nombre de <ColorBadge>{`{{nombre}}`}</ColorBadge>, respondio{" "}
                    <ColorBadge color="emerald">{`{{Respuesta 1}}`}</ColorBadge>
                  </p>
                  Marcador procesado
                  <p className="my-1 border border-gray-200 p-2">
                    A nombre de <ColorBadge>{`John Doe`}</ColorBadge>, respondio{" "}
                    <ColorBadge color="emerald">{`Afirmativo`}</ColorBadge>
                  </p>
                </Info>
              </Label>

              {/* Markers Columns*/}
              {selectedColumn && (
                <div key={selectedColumn.name} className="flex items-center space-x-2">
                  <Input
                    value={selectedColumn.value}
                    className="flex-grow"
                    onChange={(e) => handleColumnChange(selectedColumn.name, e)}
                  />
                </div>
              )}
            </div>
          </>
  )
}

export default Summary
