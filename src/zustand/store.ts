import { create } from "zustand";

export type Column = {
  name: string;
  value: string;
}

export type TFields = {
  foundFields: string[];
  missingFields: string[];
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
  docFields: TFields;
  fileName: string;
  docName: string;
  setDocFile: (docFile: File | null) => void;
  setCsvData: (csvData: object[]) => void;
  setDocFields: (docFields: TFields) => void;
  setFileName: (fileName: string) => void;
  setDocName: (docName: string) => void;
}

export const useDataStore = create<DataState>((set) => ({
  docFile: null,
  csvData: [],
  fileName: "",
  docName: "",
  docFields: { foundFields: [], missingFields: [] },
  setFileName: (fileName) => set((state) => ({ ...state, fileName })),
  setCsvData: (csvData) => set((state) => ({ ...state, csvData })),
  setDocFile: (docFile) => set((state) => ({ ...state, docFile })),
  setDocFields: (docFields) => set((state) => ({ ...state, docFields })),
  setDocName: (docName) => set((state) => ({ ...state, docName })),
}));

interface SessionState {
  selectedColumn: Column | null;
  setSelectedColumn: (selectedColumn: Column | null) => void;
}

export const useSessionStore = create<SessionState>((set) => ({
  selectedColumn: null,
  setSelectedColumn: (selectedColumn) => set((state) => ({ ...state, selectedColumn })),
}));
