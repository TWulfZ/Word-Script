import Alert from "@/components/AlertDialog";
import ColorBadge from "@/components/ColorBadge";
import { TFields } from "@/zustand/store";
import { toast } from "react-toastify";

interface Props {
  fields: TFields | null;
  docName: string
  setDocFields: (fields: TFields) => void;
  setDocName: (name: string) => void;
  setAlertOpen: (open: boolean) => void;
}

const FieldAlert = ({ fields, docName, setDocFields, setAlertOpen, setDocName }: Props) => {
  const onConfirm = () => {
    if (fields?.foundFields && fields.foundFields.length > 0) {
      setDocFields(fields);
      setDocName(docName);
      setAlertOpen(false);
    } else {
      toast.error("No se encuentra ningun marcador en el documento");
      setAlertOpen(false);
    }
  };

  return (
    <Alert
      title="Campos faltantes en el documento"
      description={
        <span>
          Faltan los siguientes marcadores en el documento:
          {fields?.missingFields.map((field, index) => <ColorBadge className="" color="red" key={index}>{field}</ColorBadge>)}
        </span>
      }
      cancelText="Cancelar"
      confirmText="Continuar de Todas formas"
      onConfirm={() => onConfirm()}
      onCancel={() => setAlertOpen(false)}
    />
  );
};

export default FieldAlert;
