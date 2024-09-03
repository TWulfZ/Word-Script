import { create } from "zustand";

export interface Column {
  name: string;
  value: string;
}

export interface AdvancedOptions {
  savePDF: boolean;
  mergePDFs: boolean;
}

interface ConfigState {
  columns: Column[];
  options: AdvancedOptions;
  setColumns: (columns: Column[]) => void;
  setOptions: (options: AdvancedOptions) => void;
}

export const useConfigStore = create<ConfigState>((set) => ({
  columns: [],
  options: {
    savePDF: false,
    mergePDFs: false,
  },
  setColumns: (columns) => set((state) => ({ ...state, columns: columns })),
  setOptions: (options) => set((state) => ({ ...state, options: options })),
}));

interface DataState {
  csvData: string[][];
  fileName: string;
  setCsvData: (csvData: string[][]) => void;
  setFileName: (fileName: string) => void;
}

export const useDataStore = create<DataState>((set) => ({
  csvData: [],
  fileName: "",
  setCsvData: (csvData) => set((state) => ({ ...state, csvData })),
  setFileName: (fileName) => set((state) => ({ ...state, fileName })),
}));

interface SessionState {
  selectedColumn: Column | null;
  setSelectedColumn: (selectedColumn: Column | null) => void;
}

export const useSessionStore = create<SessionState>((set) => ({
  selectedColumn: null,
  setSelectedColumn: (selectedColumn) => set((state) => ({ ...state, selectedColumn })),
}));
