import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { DialogProps } from "@toolpad/core/useDialogs";

export interface BasicDialogPayload {
  title: string;
  content: string;
  onConfirmation: () => Promise<void>;
}

export default function BasicDialog({
  payload,
  open,
  onClose,
}: DialogProps<BasicDialogPayload>) {
  const { title, content, onConfirmation } = payload;

  const handleConfirmation = async () => {
    onConfirmation();
    onClose();
  };

  return (
    <Dialog fullWidth open={open} onClose={() => onClose()}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleConfirmation}>
          Confirm
        </Button>
        <Button color="warning" onClick={() => onClose()}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
