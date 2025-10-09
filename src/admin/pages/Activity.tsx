import { useState, useEffect } from 'react';
import { Table, TableRow, TableCell } from '../ui/Table';
import { Button } from '../ui/Button';
import { Download } from 'lucide-react';
import { mockActivityLogs } from '../data/mockData';
import { ActivityLog } from '../types';
import { motion } from 'framer-motion';

export function Activity() {
  const [loading, setLoading] = useState(true);
  const [logs, setLogs] = useState<ActivityLog[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setLogs(mockActivityLogs);
      setLoading(false);
    }, 800);
  }, []);

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Activity Log</h2>
          <p className="text-gray-600 mt-1">Audit trail of all system activities</p>
        </div>
        <Button variant="secondary">
          <Download className="w-4 h-4" />
          Export
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Table
          headers={['Timestamp', 'User', 'Action', 'Entity', 'Details']}
          loading={loading}
        >
          {logs.map((log) => (
            <TableRow key={log.id}>
              <TableCell>
                <span className="text-sm font-mono">{log.timestamp}</span>
              </TableCell>
              <TableCell>{log.userName}</TableCell>
              <TableCell>
                <span className="font-medium">{log.action}</span>
              </TableCell>
              <TableCell>{log.entity}</TableCell>
              <TableCell>
                <span className="text-sm text-gray-600">{log.details}</span>
              </TableCell>
            </TableRow>
          ))}
        </Table>
      </motion.div>
    </div>
  );
}
