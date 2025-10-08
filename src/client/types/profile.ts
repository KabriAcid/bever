export interface ProfileSettings {
  notifications: {
    orderUpdates: boolean;
    promotions: boolean;
    deliveryAlerts: boolean;
  };
  app: {
    theme: 'light' | 'dark';
    language: string;
    defaultDeliveryTime: string;
  };
  privacy: {
    profileVisibility: 'public' | 'private';
    dataSharing: boolean;
  };
  delivery: {
    defaultAddress: string;
    specialInstructions: string;
  };
}

export interface ProfileCompletion {
  percentage: number;
  missingFields: string[];
  completedSections: string[];
}