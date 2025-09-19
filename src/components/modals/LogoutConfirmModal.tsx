import React from "react";
import { LogOut, AlertTriangle } from "lucide-react";
import BaseModal from "./BaseModal";

interface LogoutConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const LogoutConfirmModal: React.FC<LogoutConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Confirm Logout">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
          <AlertTriangle className="w-8 h-8 text-red-600" />
        </div>

        <div>
          <h4 className="text-lg font-medium text-primary-950 mb-2">
            Are you sure you want to logout?
          </h4>
          <p className="text-primary-600 text-sm">
            You'll need to sign in again to access your account. Any unsaved
            changes will be lost.
          </p>
        </div>

        <div className="flex gap-3 pt-4">
          <button onClick={onClose} className="btn-primary flex-1">
            Stay Logged In
          </button>
          <button
            onClick={onConfirm}
            className="btn-secondary flex-1 text-red-600 hover:bg-red-50 hover:text-red-700"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </button>
        </div>
      </div>
    </BaseModal>
  );
};

export default LogoutConfirmModal;
