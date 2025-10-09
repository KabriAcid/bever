import { useState, useEffect } from 'react';
import { Table, TableRow, TableCell } from '../ui/Table';
import { Badge } from '../ui/Badge';
import { mockReferrals } from '../data/mockData';
import { Referral } from '../types';
import { motion } from 'framer-motion';

export function Referrals() {
  const [loading, setLoading] = useState(true);
  const [referrals, setReferrals] = useState<Referral[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setReferrals(mockReferrals);
      setLoading(false);
    }, 800);
  }, []);

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl font-bold text-gray-900">Referral System</h2>
        <p className="text-gray-600 mt-1">Track and manage referral rewards</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Table
          headers={['Referrer', 'Referee', 'Date', 'Reward Type', 'Value', 'Status', 'Actions']}
          loading={loading}
        >
          {referrals.map((referral) => (
            <TableRow key={referral.id}>
              <TableCell>{referral.referrerName}</TableCell>
              <TableCell>{referral.refereeName}</TableCell>
              <TableCell>{referral.date}</TableCell>
              <TableCell>{referral.rewardType}</TableCell>
              <TableCell>
                <span className="digit font-semibold">₦{referral.rewardValue.toLocaleString()}</span>
              </TableCell>
              <TableCell>
                <Badge variant={referral.rewardStatus === 'claimed' ? 'success' : 'pending'}>
                  {referral.rewardStatus}
                </Badge>
              </TableCell>
              <TableCell>
                <button className="text-sm text-black hover:underline font-medium">
                  Approve
                </button>
              </TableCell>
            </TableRow>
          ))}
        </Table>
      </motion.div>
    </div>
  );
}
