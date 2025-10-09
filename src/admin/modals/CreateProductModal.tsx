import { useState } from "react";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";
import { categories, brands, volumes } from "../../client/data/products";

interface CreateProductModalProps {
  onClose: () => void;
  onCreate: (product: any) => void;
}

export function CreateProductModal({
  onClose,
  onCreate,
}: CreateProductModalProps) {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [volume, setVolume] = useState("");
  const [packaging, setPackaging] = useState("");
  const [price, setPrice] = useState("");
  const [stockLevel, setStockLevel] = useState("");
  const [image, setImage] = useState("");

  const availableBrands = category
    ? brands[category as keyof typeof brands] || []
    : [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate({
      name,
      brand,
      category,
      volume,
      packaging,
      price: Number(price),
      stockLevel: Number(stockLevel),
      image,
    });
    onClose();
  };

  return (
    <Modal isOpen={true} onClose={onClose} title="Add New Product" size="md">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="input-field w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="input-field w-full"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Brand
            </label>
            <select
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              required
              className="input-field w-full"
            >
              <option value="">Select Brand</option>
              {availableBrands.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Volume
            </label>
            <select
              value={volume}
              onChange={(e) => setVolume(e.target.value)}
              required
              className="input-field w-full"
            >
              <option value="">Select Volume</option>
              {volumes.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Packaging
            </label>
            <input
              type="text"
              value={packaging}
              onChange={(e) => setPackaging(e.target.value)}
              required
              className="input-field w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price (₦)
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              min={0}
              className="input-field w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Stock Level
            </label>
            <input
              type="number"
              value={stockLevel}
              onChange={(e) => setStockLevel(e.target.value)}
              required
              min={0}
              className="input-field w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image URL
            </label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="input-field w-full"
            />
          </div>
        </div>
        <div className="flex items-center justify-end gap-3">
          <Button variant="ghost" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button type="submit">Add Product</Button>
        </div>
      </form>
    </Modal>
  );
}
