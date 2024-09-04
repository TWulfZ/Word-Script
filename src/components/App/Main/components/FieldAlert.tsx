import Alert from "@/components/AlertDialog";
import ColorBadge from "@/components/ColorBadge";
import { TFields } from "@/zustand/store";
import { toast } from "react-toastify";

interface Props {
  fields: TFields | null;
  setDocFields: (fields: TFields) => void;
  setAlertOpen: (open: boolean) => void;
}

const FieldAlert = ({ fields, setDocFields, setAlertOpen }: Props) => {
  const onConfirm = () => {
    if (fields?.foundFields && fields.foundFields.length > 0) {
      setDocFields(fields);
    } else {
      toast.error("No se encuentra ningun marcador en el documento");
    }
  };

  return (
    <Alert
      title="Campos faltantes en el documento"
      description={
        <div>
          Faltan los siguientes marcadores en el documento:
          {fields?.missingFields.map((field, index) => <ColorBadge className="" color="red" key={index}>{field}</ColorBadge>)}
        </div>
      }
      cancelText="Cancelar"
      confirmText="Continuar de Todas formas"
      onConfirm={() => onConfirm()}
      onCancel={() => setAlertOpen(false)}
    />
  );
};

export default FieldAlert;
