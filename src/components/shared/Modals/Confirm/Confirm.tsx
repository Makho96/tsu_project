import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Paper, { PaperProps } from "@mui/material/Paper";
import { useCallback, useState } from "react";

const PaperComponent = (props: PaperProps) => {
  return <Paper {...props} sx={{ bgColor: "blue.800" }} />;
};

type ConfirmModalProps = {
  title: string;
  modalBody?: React.ReactNode;
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void | Promise<void>;
  onClose: () => void;
  confirmButtonText?: string;
  cancelButtonText?: string;
  closeOnConfirm?: boolean;
  closeOnCancel?: boolean;
  showButtons?: boolean;
};

const ConfirmModal = ({
  title,
  modalBody,
  onConfirm,
  onCancel,
  onClose,
  confirmButtonText,
  cancelButtonText,
  closeOnConfirm = true,
  closeOnCancel = true,
  showButtons = true,
}: ConfirmModalProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = useCallback(async () => {
    try {
      setIsLoading(true);
      await onConfirm?.();
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
      await onCancel?.();
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
    <Dialog open onClose={onClose} PaperComponent={PaperComponent}>
      <DialogTitle
        sx={{
          borderBottom: "1px solid",
          borderColor: "white.100",
          textAlign: "left",
        }}
      >
        {title}
      </DialogTitle>
      <DialogContent>
        <Box paddingBlock={2}>{modalBody}</Box>
      </DialogContent>
      {showButtons && (
        <DialogActions>
          <Button
            onClick={handleCancel}
            disabled={isLoading}
            loading={isLoading}
            loadingPosition="start"
            sx={{ padding: "8px 12px", minWidth: "110px" }}
            variant="outlined"
            startIcon={<ClearOutlinedIcon sx={{ color: "common.white" }} />}
          >
            {cancelButtonText}
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={isLoading}
            loading={isLoading}
            loadingPosition="start"
            sx={{
              bgcolor: "green.1000",
              padding: "8px 12px",
              minWidth: "110px",
            }}
            startIcon={<CheckOutlinedIcon sx={{ color: "common.white" }} />}
          >
            {confirmButtonText}
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default ConfirmModal;
