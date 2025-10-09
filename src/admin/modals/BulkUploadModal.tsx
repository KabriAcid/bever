import { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Upload, FileText, X, CheckCircle } from 'lucide-react';

interface BulkUploadModalProps {
  onClose: () => void;
}

export function BulkUploadModal({ onClose }: BulkUploadModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      onClose();
    }, 2000);
  };

  return (
    <Modal isOpen={true} onClose={onClose} title="Bulk Upload Products" size="md">
      <div className="space-y-6">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-700 font-medium mb-2">Upload CSV or Excel file</p>
          <p className="text-sm text-gray-500 mb-4">Maximum file size: 5MB</p>
          <label className="btn-primary inline-flex items-center gap-2 cursor-pointer">
            <Upload className="w-4 h-4" />
            Choose File
            <input
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>

        {file && (
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8 text-gray-600" />
              <div>
                <p className="font-medium text-gray-900">{file.name}</p>
                <p className="text-sm text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
              </div>
            </div>
            <button
              onClick={() => setFile(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">File format requirements:</p>
              <ul className="list-disc list-inside space-y-1 text-blue-700">
                <li>Include headers: name, brand, category, volume, packaging, price, stock</li>
                <li>Use CSV or Excel format</li>
                <li>Ensure all required fields are filled</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleUpload} disabled={!file} loading={uploading}>
            Upload Products
          </Button>
        </div>
      </div>
    </Modal>
  );
}
