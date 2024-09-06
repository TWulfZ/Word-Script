import { truncateText } from "@/utils/truncateText";
import { parseMarker } from "@/utils/parseMarker";
import { Column } from "@/zustand/store";

interface Parameters {
  csvData: object[];
  setColumns: (columns: Column[]) => void;
  setSelectedColumn: (selectedColumn: Column | null) => void;
}

export const colsUpdate = ( { csvData, setColumns, setSelectedColumn }: Parameters ) => {
  const cols = Object.keys(csvData[0]).map<Column>((col, index, array) => {
    const text = parseMarker(col);
    let truncated = truncateText(text, { maxWords: 2, ellipsis: "" });

    // Verificar si el truncado ya existe
    const duplicateCount = array.slice(0, index).filter((prevCol) => {
      const prevTruncated = truncateText(parseMarker(prevCol), { maxWords: 2, ellipsis: "" });
      return prevTruncated === truncated;
    }).length;

    // Si hay duplicados, agregar un número
    if (duplicateCount > 0) {
      truncated += `_${duplicateCount + 1}`;
    }

    return { name: col, value: `{{${truncated}}}` };
  });

  setColumns(cols);
  setSelectedColumn(cols[0]);
}