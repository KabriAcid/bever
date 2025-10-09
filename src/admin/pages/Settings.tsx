import { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Clock, DollarSign, Settings as SettingsIcon, ToggleLeft, ToggleRight } from 'lucide-react';
import { motion } from 'framer-motion';

export function Settings() {
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState({
    deliveryTimeMin: '2',
    deliveryTimeMax: '4',
    vat: '7.5',
    serviceFee: '5',
    orderingEnabled: true,
    paymentsEnabled: true,
    maintenanceMode: false,
  });

  const handleSave = async () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
            <Clock className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Delivery Times</h3>
            <p className="text-sm text-gray-600">Set default delivery windows</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Minimum (hours)"
            type="number"
            value={settings.deliveryTimeMin}
            onChange={(e) => setSettings({ ...settings, deliveryTimeMin: e.target.value })}
          />
          <Input
            label="Maximum (hours)"
            type="number"
            value={settings.deliveryTimeMax}
            onChange={(e) => setSettings({ ...settings, deliveryTimeMax: e.target.value })}
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
            <DollarSign className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Fees & Charges</h3>
            <p className="text-sm text-gray-600">Configure VAT and service fees</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="VAT (%)"
            type="number"
            value={settings.vat}
            onChange={(e) => setSettings({ ...settings, vat: e.target.value })}
          />
          <Input
            label="Service Fee (%)"
            type="number"
            value={settings.serviceFee}
            onChange={(e) => setSettings({ ...settings, serviceFee: e.target.value })}
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
            <SettingsIcon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Service Toggles</h3>
            <p className="text-sm text-gray-600">Enable or disable platform features</p>
          </div>
        </div>

        <div className="space-y-4">
          {[
            { key: 'orderingEnabled', label: 'Ordering System', description: 'Allow users to place new orders' },
            { key: 'paymentsEnabled', label: 'Payment Processing', description: 'Accept online payments' },
            { key: 'maintenanceMode', label: 'Maintenance Mode', description: 'Disable all user access' },
          ].map((item) => (
            <div
              key={item.key}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div>
                <p className="font-medium text-gray-900">{item.label}</p>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
              <button
                onClick={() => toggleSetting(item.key as keyof typeof settings)}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                {settings[item.key as keyof typeof settings] ? (
                  <ToggleRight className="w-12 h-12 text-green-600" />
                ) : (
                  <ToggleLeft className="w-12 h-12" />
                )}
              </button>
            </div>
          ))}
        </div>
      </motion.div>

      <Button onClick={handleSave} loading={loading} className="w-full">
        Save Settings
      </Button>
    </div>
  );
}
