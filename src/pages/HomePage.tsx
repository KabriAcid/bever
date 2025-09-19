import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Plus, Minus } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import { products, categories, brands, volumes } from "../data/products";

const HomePage: React.FC = () => {
  const { user } = useAuth();
  const { addItem, updateQuantity, getCartItemsWithDetails } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedVolumes, setSelectedVolumes] = useState<string[]>([]);
  const [selectedPackaging, setSelectedPackaging] = useState<string[]>([]);
  const [selectedUnits, setSelectedUnits] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const cartItems = getCartItemsWithDetails();

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        !selectedCategory || product.category === selectedCategory;
      const matchesBrand =
        selectedBrands.length === 0 || selectedBrands.includes(product.brand);
      const matchesVolume =
        selectedVolumes.length === 0 ||
        selectedVolumes.includes(product.volume);
      const matchesPackaging =
        selectedPackaging.length === 0 ||
        selectedPackaging.includes(product.packaging);
      const matchesUnit =
        selectedUnits.length === 0 || selectedUnits.includes(product.unit);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesBrand &&
        matchesVolume &&
        matchesPackaging &&
        matchesUnit
      );
    });
  }, [
    searchQuery,
    selectedCategory,
    selectedBrands,
    selectedVolumes,
    selectedPackaging,
    selectedUnits,
  ]);

  const getCartQuantity = (productId: string) => {
    const cartItem = cartItems.find((item) => item.productId === productId);
    return cartItem?.quantity || 0;
  };

  const handleQuantityChange = (productId: string, change: number) => {
    const currentQuantity = getCartQuantity(productId);
    const newQuantity = currentQuantity + change;

    if (newQuantity <= 0) {
      updateQuantity(productId, 0);
    } else {
      if (currentQuantity === 0) {
        addItem(productId, change);
      } else {
        updateQuantity(productId, newQuantity);
      }
    }
  };

  const clearFilters = () => {
    setSelectedCategory("");
    setSelectedBrands([]);
    setSelectedVolumes([]);
    setSelectedPackaging([]);
    setSelectedUnits([]);
  };

  const activeFiltersCount = [
    selectedCategory,
    ...selectedBrands,
    ...selectedVolumes,
    ...selectedPackaging,
    ...selectedUnits,
  ].filter(Boolean).length;

  const availableBrands = selectedCategory
    ? brands[selectedCategory as keyof typeof brands] || []
    : [];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-primary-100 px-6 py-4 z-10">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-primary-950">
            Welcome back, {user?.businessName}
          </h1>
          <p className="text-primary-600">
            What would you like to order today?
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search beverages..."
            className="input-field pl-12 pr-16"
          />
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-colors ${
              showFilters
                ? "bg-primary-950 text-white"
                : "text-primary-400 hover:bg-primary-100"
            }`}
          >
            <Filter className="w-4 h-4" />
            {activeFiltersCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>

        {/* Filters */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4 pb-4"
          >
            {/* Category Filter */}
            <div>
              <h3 className="text-sm font-medium text-primary-700 mb-2">
                Category
              </h3>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(
                        selectedCategory === category ? "" : category
                      );
                      setSelectedBrands([]); // Reset brands when category changes
                    }}
                    className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                      selectedCategory === category
                        ? "bg-primary-950 text-white"
                        : "bg-primary-100 text-primary-700 hover:bg-primary-200"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Brand Filter */}
            {availableBrands.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-primary-700 mb-2">
                  Brand
                </h3>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {availableBrands.map((brand) => (
                    <button
                      key={brand}
                      onClick={() => {
                        setSelectedBrands((prev) =>
                          prev.includes(brand)
                            ? prev.filter((b) => b !== brand)
                            : [...prev, brand]
                        );
                      }}
                      className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                        selectedBrands.includes(brand)
                          ? "bg-primary-950 text-white"
                          : "bg-primary-100 text-primary-700 hover:bg-primary-200"
                      }`}
                    >
                      {brand}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Volume Filter */}
            <div>
              <h3 className="text-sm font-medium text-primary-700 mb-2">
                Volume
              </h3>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {volumes.map((volume) => (
                  <button
                    key={volume}
                    onClick={() => {
                      setSelectedVolumes((prev) =>
                        prev.includes(volume)
                          ? prev.filter((v) => v !== volume)
                          : [...prev, volume]
                      );
                    }}
                    className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                      selectedVolumes.includes(volume)
                        ? "bg-primary-950 text-white"
                        : "bg-primary-100 text-primary-700 hover:bg-primary-200"
                    }`}
                  >
                    {volume}
                  </button>
                ))}
              </div>
            </div>

            {/* Clear Filters */}
            {activeFiltersCount > 0 && (
              <button
                onClick={clearFilters}
                className="text-sm text-primary-600 hover:text-primary-950 font-medium"
              >
                Clear all filters ({activeFiltersCount})
              </button>
            )}
          </motion.div>
        )}
      </div>

      {/* Products Grid */}
      <div className="px-6 py-6">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-primary-600">
            {filteredProducts.length} product
            {filteredProducts.length !== 1 ? "s" : ""} found
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {filteredProducts.map((product) => {
            const quantity = getCartQuantity(product.id);

            return (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="card p-4"
              >
                <div className="aspect-square bg-primary-50 rounded-xl mb-3 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-2">
                  <div>
                    <h3 className="font-medium text-primary-950 text-sm leading-tight">
                      {product.name}
                    </h3>
                    <p className="text-xs text-primary-600">
                      {product.volume} • {product.packaging}
                      {product.packSize && ` • ${product.packSize}pcs`}
                    </p>
                  </div>

                  {/* Desktop/Tablet Layout */}
                  <div className="hidden sm:flex items-center justify-between">
                    <span className="font-bold text-primary-950">
                      ₦{product.price.toLocaleString()}
                    </span>

                    {quantity > 0 ? (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleQuantityChange(product.id, -1)}
                          className="w-8 h-8 bg-primary-100 hover:bg-primary-200 rounded-lg flex items-center justify-center transition-colors"
                        >
                          <Minus className="w-4 h-4 text-primary-700" />
                        </button>
                        <span className="font-medium text-primary-950 min-w-[20px] text-center">
                          {quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(product.id, 1)}
                          className="w-8 h-8 bg-accent-500 hover:bg-accent-600 text-white rounded-lg flex items-center justify-center transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleQuantityChange(product.id, 1)}
                        className="w-8 h-8 bg-accent-500 hover:bg-accent-600 text-white rounded-lg flex items-center justify-center transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {/* Mobile Layout */}
                  <div className="sm:hidden space-y-2">
                    <div className="text-center">
                      <span className="font-bold text-primary-950">
                        ₦{product.price.toLocaleString()}
                      </span>
                    </div>

                    {quantity > 0 ? (
                      <div className="flex items-center gap-3 w-full">
                        <button
                          onClick={() => handleQuantityChange(product.id, -1)}
                          className="flex-1 h-10 bg-primary-100 hover:bg-primary-200 rounded-lg flex items-center justify-center transition-colors"
                        >
                          <Minus className="w-4 h-4 text-primary-700" />
                        </button>
                        <span className="font-medium text-primary-950 min-w-[40px] text-center text-lg">
                          {quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(product.id, 1)}
                          className="flex-1 h-10 bg-accent-500 hover:bg-accent-600 text-white rounded-lg flex items-center justify-center transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleQuantityChange(product.id, 1)}
                        className="w-full h-10 bg-accent-500 hover:bg-accent-600 text-white rounded-lg flex items-center justify-center gap-2 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        <span className="text-sm font-medium">Add to Cart</span>
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-primary-400" />
            </div>
            <h3 className="text-lg font-medium text-primary-950 mb-2">
              No products found
            </h3>
            <p className="text-primary-600 mb-4">
              Try adjusting your search or filters
            </p>
            {activeFiltersCount > 0 && (
              <button onClick={clearFilters} className="btn-secondary">
                Clear Filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
