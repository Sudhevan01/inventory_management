function ProductList({ products, onEdit, onDelete }) {
  const isLowStock = (product) => product.quantity <= product.minStock;

  if (products.length === 0) {
    return (
      <div className="empty-message">
        <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 7.5 12 3l9 4.5-9 4.5-9-4.5Z" strokeLinejoin="round" />
          <path d="M3 7.5v9L12 21l9-4.5v-9" strokeLinejoin="round" />
          <path d="M12 12v9" />
        </svg>
        <p>No products found.</p>
      </div>
    );
  }

  return (
    <table className="product-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Category</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Minimum Stock</th>
          <th>Created At</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product._id} className={isLowStock(product) ? "low-stock-row" : ""}>
            <td className="name-cell">{product.name}</td>
            <td>
              <span className="category-badge">{product.category}</span>
            </td>
            <td>₹{product.price.toLocaleString("en-IN")}</td>
            <td>
              <span className="quantity-cell">
                <span className={isLowStock(product) ? "low-stock-quantity" : ""}>
                  {product.quantity}
                </span>
                {isLowStock(product) && (
                  <span className="low-stock-badge">Low</span>
                )}
              </span>
            </td>
            <td>{product.minStock}</td>
            <td>{new Date(product.createdAt).toLocaleDateString()}</td>
            <td className="actions-cell">
              <button className="icon-button" onClick={() => onEdit(product)}>
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 20h9" strokeLinecap="round" />
                  <path
                    d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5Z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Edit
              </button>
              <button className="icon-button delete-btn" onClick={() => onDelete(product._id)}>
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 6h18" strokeLinecap="round" />
                  <path
                    d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ProductList;
