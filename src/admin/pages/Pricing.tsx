import { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Percent, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';

export function Pricing() {
  const [globalMarkup, setGlobalMarkup] = useState('15');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card max-w-2xl"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
            <Percent className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Global Markup</h3>
            <p className="text-sm text-gray-600">Set percentage increase for all products</p>
          </div>
        </div>

        <div className="space-y-4">
          <Input
            label="Markup Percentage"
            type="number"
            value={globalMarkup}
            onChange={(e) => setGlobalMarkup(e.target.value)}
            placeholder="15"
          />
          <Button onClick={handleSave} loading={loading}>
            Apply Markup
          </Button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card max-w-2xl"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
            <DollarSign className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Service Plans</h3>
            <p className="text-sm text-gray-600">Manage subscription and service plans</p>
          </div>
        </div>

        <div className="space-y-3">
          {['Basic Plan', 'Premium Plan'].map((plan) => (
            <div key={plan} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{plan}</p>
                <p className="text-sm text-gray-500">30 days validity</p>
              </div>
              <Button variant="ghost">Edit</Button>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
