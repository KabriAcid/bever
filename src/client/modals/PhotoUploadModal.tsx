import React, { useState, useRef } from "react";
import { Camera, Upload, X } from "lucide-react";
import BaseModal from "./BaseModal";

interface PhotoUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  currentPhoto?: string;
  onSave: (photo: File) => void;
  aspectRatio?: "square" | "cover";
}

const PhotoUploadModal: React.FC<PhotoUploadModalProps> = ({
  isOpen,
  onClose,
  title,
  currentPhoto,
  onSave,
  aspectRatio = "square",
}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  const handleSave = async () => {
    if (!selectedFile) return;

    setLoading(true);
    try {
      await onSave(selectedFile);
      onClose();
      setPreview(null);
      setSelectedFile(null);
    } catch (error) {
      console.error("Failed to upload photo:", error);
    } finally {
      setLoading(false);
    }
  };

  const aspectRatioClass =
    aspectRatio === "cover" ? "aspect-video" : "aspect-square";

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="space-y-4">
        <div
          className={`${aspectRatioClass} border-2 border-dashed border-primary-200 rounded-xl overflow-hidden bg-primary-50 relative`}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          {preview || currentPhoto ? (
            <img
              src={preview || currentPhoto}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-primary-600">
              <Camera className="w-12 h-12 mb-2" />
              <p className="text-sm font-medium">
                Drop image here or click to upload
              </p>
              <p className="text-xs text-primary-400 mt-1">
                JPG, PNG up to 5MB
              </p>
            </div>
          )}

          {(preview || currentPhoto) && (
            <button
              onClick={() => {
                setPreview(null);
                setSelectedFile(null);
              }}
              className="absolute top-2 right-2 p-1 bg-black/50 text-white rounded-full hover:bg-black/70"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <button
          onClick={() => fileInputRef.current?.click()}
          className="w-full flex items-center justify-center gap-2 p-3 border-2 border-primary-200 text-primary-700 rounded-xl hover:bg-primary-50 transition-colors"
        >
          <Upload className="w-5 h-5" />
          Choose Photo
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFileSelect(file);
          }}
        />

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="btn-secondary flex-1"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="btn-primary flex-1"
            disabled={!selectedFile || loading}
          >
            {loading ? "Uploading..." : "Save Photo"}
          </button>
        </div>
      </div>
    </BaseModal>
  );
};

export default PhotoUploadModal;
