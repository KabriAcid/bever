import { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Send } from 'lucide-react';
import { motion } from 'framer-motion';

export function Notifications() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    type: 'info',
    target: 'all',
  });

  const handleSend = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setFormData({ title: '', message: '', type: 'info', target: 'all' });
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card max-w-2xl"
      >
        <h2 className="text-xl font-bold text-gray-900 mb-6">Send Notification</h2>

        <div className="space-y-4">
          <Input
            label="Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Notification title"
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Message</label>
            <textarea
              className="input-field min-h-32 resize-none"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Notification message"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Type"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              options={[
                { value: 'info', label: 'Info' },
                { value: 'success', label: 'Success' },
                { value: 'warning', label: 'Warning' },
                { value: 'error', label: 'Error' },
              ]}
            />

            <Select
              label="Target"
              value={formData.target}
              onChange={(e) => setFormData({ ...formData, target: e.target.value })}
              options={[
                { value: 'all', label: 'All Users' },
                { value: 'active', label: 'Active Users' },
                { value: 'inactive', label: 'Inactive Users' },
              ]}
            />
          </div>

          <Button onClick={handleSend} loading={loading} className="w-full">
            <Send className="w-4 h-4" />
            Send Notification
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
