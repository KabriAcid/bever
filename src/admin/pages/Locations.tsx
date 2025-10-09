import { useState, useEffect } from 'react';
import { Button } from '../ui/Button';
import { Plus, Edit } from 'lucide-react';
import { mockLocations, mockDeliveryCategories } from '../data/mockData';
import { Location, DeliveryCategoryData } from '../types';
import { motion } from 'framer-motion';

export function Locations() {
  const [loading, setLoading] = useState(true);
  const [locations, setLocations] = useState<Location[]>([]);
  const [deliveryCategories, setDeliveryCategories] = useState<DeliveryCategoryData[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setLocations(mockLocations);
      setDeliveryCategories(mockDeliveryCategories);
      setLoading(false);
    }, 800);
  }, []);

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Delivery Categories</h3>
            <p className="text-sm text-gray-600">Manage delivery types and options</p>
          </div>
          <Button>
            <Plus className="w-4 h-4" />
            Add Category
          </Button>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[...Array(3)].map((_, idx) => (
              <div key={idx} className="p-4 bg-gray-50 rounded-lg animate-pulse">
                <div className="h-5 bg-gray-200 rounded w-32 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-48"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {deliveryCategories.map((category) => (
              <div
                key={category.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-900">{category.name}</p>
                  <p className="text-sm text-gray-600 mt-0.5">{category.description}</p>
                  <p className="text-xs text-gray-500 mt-1">Estimated: {category.estimatedTime}</p>
                </div>
                <Button variant="ghost">
                  <Edit className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Locations & Wards</h3>
            <p className="text-sm text-gray-600">Manage cities, wards, and delivery areas</p>
          </div>
          <Button>
            <Plus className="w-4 h-4" />
            Add Location
          </Button>
        </div>

        {loading ? (
          <div className="space-y-4">
            <div className="p-6 bg-gray-50 rounded-lg animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-40 mb-4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-32"></div>
                <div className="h-4 bg-gray-200 rounded w-32"></div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {locations.map((location) => (
              <div key={location.id} className="p-6 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {location.city}, {location.state}
                    </h4>
                    <p className="text-sm text-gray-600">Prefix: {location.prefix}</p>
                  </div>
                  <Button variant="ghost">
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700">Wards:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {location.wards.map((ward) => (
                      <div key={ward.id} className="p-3 bg-white rounded-lg">
                        <p className="font-medium text-gray-900 text-sm">{ward.name}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {ward.subAreas.length} sub-areas
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
