import React, { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface AlertProps {
  title: string;
  description: React.ReactNode;
  cancelText?: string;
  confirmText?: string;
  onConfirm?: ( confirm: boolean) => void;
  onCancel?: ( cancel: boolean) => void;
}

const Alert: React.FC<AlertProps> = ({
  title,
  description,
  cancelText = "Cancelar",
  confirmText = "Continuar",
  onConfirm,
  onCancel,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleConfirm = () => {
    setIsOpen(false);
    onConfirm?.(true);
  };

  const handleCancel = () => {
    setIsOpen(false);
    onCancel?.(false);
  };

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel}>{cancelText}</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm} className='bg-destructive hover:bg-destructive/90'>{confirmText}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Alert;