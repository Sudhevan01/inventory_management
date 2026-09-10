import { useState, useEffect, useCallback } from "react";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";
import {
  getProducts,
  getLowStockProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "./services/productService";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [showLowStockOnly, setShowLowStockOnly] = useState(false);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const response = showLowStockOnly
        ? await getLowStockProducts()
        : await getProducts();
      setProducts(response.data);
    } catch (err) {
      setError("Failed to load products. Please check that the backend is running.");
    } finally {
      setLoading(false);
    }
  }, [showLowStockOnly]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleAddOrUpdate = async (productData) => {
    try {
      setError("");
      if (editingProduct) {
        await updateProduct(editingProduct._id, productData);
        setEditingProduct(null);
      } else {
        await createProduct(productData);
      }
      fetchProducts();
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong while saving the product.");
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this product?");
    if (!confirmed) return;

    try {
      setError("");
      await deleteProduct(id);
      fetchProducts();
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong while deleting the product.");
    }
  };

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "All" || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="app">
      <header className="app-header">
        <h1>Inventory Management System</h1>
        <p>Track stock levels, manage products, and stay ahead of shortages.</p>
      </header>

      {error && <p className="app-error">{error}</p>}

      <ProductForm
        editingProduct={editingProduct}
        onSubmit={handleAddOrUpdate}
        onCancel={handleCancelEdit}
      />

      <div className="controls card">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category === "All" ? "All Categories" : category}
            </option>
          ))}
        </select>

        <label className="low-stock-toggle">
          <input
            type="checkbox"
            checked={showLowStockOnly}
            onChange={(e) => setShowLowStockOnly(e.target.checked)}
          />
          Show Low Stock Only
        </label>
      </div>

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="card table-wrapper">
          <ProductList
            products={filteredProducts}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      )}

      <footer className="app-footer">
        Thanks to Dev Creations for this opportunity.
      </footer>
    </div>
  );
}

export default App;
