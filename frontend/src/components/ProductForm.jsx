import { useState, useEffect } from "react";

const emptyForm = {
  name: "",
  category: "",
  price: "",
  quantity: "",
  minStock: "",
};

function ProductForm({ editingProduct, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(emptyForm);
  const [error, setError] = useState("");

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name,
        category: editingProduct.category,
        price: editingProduct.price,
        quantity: editingProduct.quantity,
        minStock: editingProduct.minStock,
      });
    } else {
      setFormData(emptyForm);
    }
  }, [editingProduct]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!formData.name.trim() || !formData.category.trim()) {
      setError("Name and category are required");
      return;
    }

    if (formData.price === "" || Number(formData.price) < 0) {
      setError("Please enter a valid price");
      return;
    }

    if (formData.quantity === "" || Number(formData.quantity) < 0) {
      setError("Please enter a valid quantity");
      return;
    }

    if (formData.minStock === "" || Number(formData.minStock) < 0) {
      setError("Please enter a valid minimum stock");
      return;
    }

    onSubmit({
      name: formData.name.trim(),
      category: formData.category.trim(),
      price: Number(formData.price),
      quantity: Number(formData.quantity),
      minStock: Number(formData.minStock),
    });

    setFormData(emptyForm);
  };

  const handleCancel = () => {
    setFormData(emptyForm);
    setError("");
    onCancel();
  };

  return (
    <form className="card product-form" onSubmit={handleSubmit}>
      <h2>{editingProduct ? "Edit Product" : "Add Product"}</h2>

      {error && <p className="form-error">{error}</p>}

      <div className="form-row">
        <label>
          Name
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>

        <label>
          Category
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />
        </label>
      </div>

      <div className="form-row">
        <label>
          Price
          <input
            type="number"
            name="price"
            min="0"
            value={formData.price}
            onChange={handleChange}
          />
        </label>

        <label>
          Quantity
          <input
            type="number"
            name="quantity"
            min="0"
            value={formData.quantity}
            onChange={handleChange}
          />
        </label>

        <label>
          Minimum Stock
          <input
            type="number"
            name="minStock"
            min="0"
            value={formData.minStock}
            onChange={handleChange}
          />
        </label>
      </div>

      <div className="form-actions">
        <button type="submit">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5">
            {editingProduct ? (
              <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
            ) : (
              <path d="M12 5v14M5 12h14" strokeLinecap="round" />
            )}
          </svg>
          {editingProduct ? "Update Product" : "Add Product"}
        </button>
        {editingProduct && (
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default ProductForm;
