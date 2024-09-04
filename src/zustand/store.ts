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
  docFile: File | null;
  csvData: object[];
  fileName: string;
  setCsvData: (csvData: object[]) => void;
  setFileName: (fileName: string) => void;
  setDocFile: (docFile: File) => void;
}

export const useDataStore = create<DataState>((set) => ({
  docFile: null,
  csvData: [],
  fileName: "",
  setCsvData: (csvData) => set((state) => ({ ...state, csvData })),
  setFileName: (fileName) => set((state) => ({ ...state, fileName })),
  setDocFile: (docFile) => set((state) => ({ ...state, docFile })),
}));

interface SessionState {
  selectedColumn: Column | null;
  setSelectedColumn: (selectedColumn: Column | null) => void;
}

export const useSessionStore = create<SessionState>((set) => ({
  selectedColumn: null,
  setSelectedColumn: (selectedColumn) => set((state) => ({ ...state, selectedColumn })),
}));