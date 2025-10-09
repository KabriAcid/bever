import { Modal } from '../ui/Modal';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { User } from '../types';
import { Phone, Mail, MapPin, Calendar, ShoppingCart, DollarSign, UserPlus } from 'lucide-react';

interface UserDetailsModalProps {
  user: User;
  onClose: () => void;
}

export function UserDetailsModal({ user, onClose }: UserDetailsModalProps) {
  return (
    <Modal isOpen={true} onClose={onClose} title="User Details" size="lg">
      <div className="space-y-6">
        <div className="flex items-start gap-4 pb-6 border-b border-gray-200">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-2xl font-bold text-gray-700">
              {user.businessName.charAt(0)}
            </span>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900">{user.businessName}</h3>
            <p className="text-gray-600 mt-1">{user.ownerName}</p>
            <div className="flex items-center gap-3 mt-3">
              <Badge variant={user.userStatus as any}>{user.userStatus}</Badge>
              <Badge variant={user.accountStatus as any}>{user.accountStatus}</Badge>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">
              Contact Information
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-gray-900">{user.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="text-gray-900">{user.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="text-gray-900">{user.address}</p>
                  <p className="text-sm text-gray-500 mt-0.5">{user.ward}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">
              Account Details
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Registration Date</p>
                  <p className="text-gray-900">{user.registrationDate}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Last Login</p>
                  <p className="text-gray-900">{user.lastLogin}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <UserPlus className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Referral Code</p>
                  <p className="text-gray-900 font-mono">{user.referralCode}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-gray-700" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Orders</p>
              <p className="text-lg font-semibold text-gray-900 digit">{user.totalOrders}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-gray-700" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Spent</p>
              <p className="text-lg font-semibold text-gray-900 digit">₦{user.totalSpent.toLocaleString()}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <UserPlus className="w-5 h-5 text-gray-700" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Referrals</p>
              <p className="text-lg font-semibold text-gray-900 digit">0</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
          <Button variant="secondary">Reset PIN</Button>
          <Button>Edit User</Button>
        </div>
      </div>
    </Modal>
  );
}
