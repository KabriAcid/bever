import { Button } from "../ui/Button";
import { Modal } from "../ui/Modal";

interface LogoutConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function LogoutConfirmModal({
  isOpen,
  onClose,
  onConfirm,
}: LogoutConfirmModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Confirm Logout" size="sm">
      <div className="space-y-4">
        <p className="text-sm text-gray-700">
          Are you sure you want to log out?
        </p>

        <div className="flex items-center justify-end gap-3">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onConfirm}>Log out</Button>
        </div>
      </div>
    </Modal>
  );
}
