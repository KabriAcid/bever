import { useState, useEffect } from "react";
import { Table, TableRow, TableCell } from "../ui/Table";
import { Badge } from "../ui/Badge";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";
import { Button } from "../ui/Button";
import { Eye, Edit, Lock, Unlock, Search, Download } from "lucide-react";
import { mockUsers } from "../data/mockData";
import { User, UserStatus, AccountStatus } from "../types";
import { UserDetailsModal } from "../modals/UserDetailsModal";
import { motion } from "framer-motion";

export function Users() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setUsers(mockUsers);
      setFilteredUsers(mockUsers);
      setLoading(false);
    }, 800);
  }, []);

  useEffect(() => {
    let filtered = users;

    if (searchTerm) {
      filtered = filtered.filter(
        (user) =>
          user.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((user) => user.userStatus === statusFilter);
    }

    setFilteredUsers(filtered);
  }, [searchTerm, statusFilter, users]);

  const exportToCSV = () => {
    console.log("Exporting users to CSV...");
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div className="flex-1 max-w-md relative">
            <Input
              placeholder="Search users by name, business, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none sm:left-3 sm:w-5 sm:h-5" />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              options={[
                { value: "all", label: "All Status" },
                { value: "active", label: "Active" },
                { value: "inactive", label: "Inactive" },
                { value: "suspended", label: "Suspended" },
                { value: "pending", label: "Pending" },
              ]}
              className="w-40"
            />
            <Button variant="secondary" onClick={exportToCSV}>
              <Download className="w-4 h-4" />
              Export
            </Button>
          </div>
        </div>

        <Table
          headers={[
            "Business",
            "Owner",
            "Contact",
            "Status",
            "Account",
            "Orders",
            "Total Spent",
            "Actions",
          ]}
          loading={loading}
        >
          {filteredUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <div>
                  <p className="font-medium text-gray-900">
                    {user.businessName}
                  </p>
                  <p className="text-xs text-gray-500">{user.ward}</p>
                </div>
              </TableCell>
              <TableCell>{user.ownerName}</TableCell>
              <TableCell>
                <div>
                  <p className="text-sm">{user.email}</p>
                  <p className="text-xs text-gray-500">{user.phone}</p>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={user.userStatus as any}>
                  {user.userStatus}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant={user.accountStatus as any}>
                  {user.accountStatus}
                </Badge>
              </TableCell>
              <TableCell>
                <span className="digit">{user.totalOrders}</span>
              </TableCell>
              <TableCell>
                <span className="digit font-medium">
                  ₦{user.totalSpent.toLocaleString()}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedUser(user)}
                    className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                    title="View Details"
                  >
                    <Eye className="w-4 h-4 text-gray-600" />
                  </button>
                  <button
                    className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Edit User"
                  >
                    <Edit className="w-4 h-4 text-gray-600" />
                  </button>
                  <button
                    className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                    title={
                      user.userStatus === "active"
                        ? "Suspend User"
                        : "Activate User"
                    }
                  >
                    {user.userStatus === "active" ? (
                      <Lock className="w-4 h-4 text-red-600" />
                    ) : (
                      <Unlock className="w-4 h-4 text-green-600" />
                    )}
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </Table>

        {!loading && filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              No users found matching your criteria
            </p>
          </div>
        )}
      </motion.div>

      {selectedUser && (
        <UserDetailsModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
}
