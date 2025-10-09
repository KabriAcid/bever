import { useState, useEffect } from "react";
import { Table, TableRow, TableCell } from "../ui/Table";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { Plus, Upload, Edit, Trash2 } from "lucide-react";
import { mockProducts } from "../data/mockData";
import { Product } from "../types";
import { BulkUploadModal } from "../modals/BulkUploadModal";
import { CreateProductModal } from "../modals/CreateProductModal";
import { motion } from "framer-motion";

export function Products() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [showBulkUpload, setShowBulkUpload] = useState(false);
  const [showCreateProduct, setShowCreateProduct] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 800);
  }, []);

  const handleCreateProduct = (product: Product) => {
    setProducts((prev) => [
      { ...product, id: `new-${Date.now()}`, inStock: product.stockLevel > 0 },
      ...prev,
    ]);
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Product Catalog</h2>
          <p className="text-gray-600 mt-1">Manage your beverage inventory</p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" onClick={() => setShowBulkUpload(true)}>
            <Upload className="w-4 h-4" />
            Bulk Upload
          </Button>
          <Button onClick={() => setShowCreateProduct(true)}>
            <Plus className="w-4 h-4" />
            Add Product
          </Button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Table
          headers={[
            "Product",
            "Brand",
            "Category",
            "Volume",
            "Price",
            "Stock",
            "Status",
            "Actions",
          ]}
          loading={loading}
        >
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <p className="font-medium text-gray-900">{product.name}</p>
              </TableCell>
              <TableCell>{product.brand}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>{product.volume}</TableCell>
              <TableCell>
                <span className="font-semibold digit">₦{product.price}</span>
              </TableCell>
              <TableCell>
                <span className="digit">{product.stockLevel}</span>
              </TableCell>
              <TableCell>
                <Badge variant={product.inStock ? "success" : "error"}>
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <button
                    className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Edit className="w-4 h-4 text-gray-600" />
                  </button>
                  <button
                    className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </Table>
      </motion.div>

      {showBulkUpload && (
        <BulkUploadModal onClose={() => setShowBulkUpload(false)} />
      )}
      {showCreateProduct && (
        <CreateProductModal
          onClose={() => setShowCreateProduct(false)}
          onCreate={handleCreateProduct}
        />
      )}
    </div>
  );
}
