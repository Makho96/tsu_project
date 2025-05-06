import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper, { PaperProps } from "@mui/material/Paper";
import { useCallback, useState } from "react";

const PaperComponent = (props: PaperProps) => {
  return <Paper {...props} sx={{ bgColor: "blue.800" }} />;
};

type ConfirmModalProps = {
  isOpen: boolean;
  title: string;
  modalBody?: React.ReactNode;
  onConfirm: () => void | Promise<void>;
  onCancel: () => void | Promise<void>;
  onClose: () => void;
  confirmButtonText: string;
  cancelButtonText: string;
  closeOnConfirm?: boolean;
  closeOnCancel?: boolean;
};

const ConfirmModal = ({
  title,
  modalBody,
  onConfirm,
  onCancel,
  onClose,
  isOpen,
  confirmButtonText,
  cancelButtonText,
  closeOnConfirm = true,
  closeOnCancel = true,
}: ConfirmModalProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = useCallback(async () => {
    try {
      setIsLoading(true);
      await onConfirm();
      if (closeOnConfirm) {
        onClose();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [onConfirm, closeOnConfirm, onClose]);

  const handleCancel = useCallback(async () => {
    try {
      setIsLoading(true);
      await onCancel();
      if (closeOnCancel) {
        onClose();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [onCancel, closeOnCancel, onClose]);

  return (
    <Dialog open={isOpen} onClose={onClose} PaperComponent={PaperComponent}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{modalBody}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleCancel}
          disabled={isLoading}
          loading={isLoading}
          loadingPosition="start"
        >
          {cancelButtonText}
        </Button>
        <Button
          onClick={handleConfirm}
          disabled={isLoading}
          loading={isLoading}
          loadingPosition="start"
        >
          {confirmButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmModal;
