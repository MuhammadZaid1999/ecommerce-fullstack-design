import type { Navigate, Product } from "../types/types";
import { StarRating } from "./StarRating";
import { formatCategory } from "../utils/catalog";
import { EmptyState } from "./EmptyState";

export function ProductGrid({
  addToCart,
  navigate,
  products,
}: {
  addToCart: (productId: string) => void;
  navigate: Navigate;
  products: Product[];
}) {
  if (products.length === 0) {
    return (
      <EmptyState
        title="No matching products"
        text="Try a different search term."
      />
    );
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <article className="product-card" key={product.id}>
          <button
            className="product-image-button"
            type="button"
            onClick={() => navigate(`/products/${product.id}`)}
          >
            <img src={product.image} alt={product.name} />
          </button>
          <div className="product-card-body">
            <p>{formatCategory(product)}</p>
            <h2>{product.name}</h2>
            <div className="product-meta">
              <strong>${product.price.toFixed(2)}</strong>
              <span className="rating-meta">
                <StarRating rating={product.rating} />
                <span>{product.rating.toFixed(1)}</span>
              </span>
            </div>
            <div className="product-actions">
              <button type="button" onClick={() => addToCart(product.id)}>
                Add
              </button>
              <button
                className="secondary-action"
                type="button"
                onClick={() => navigate(`/products/${product.id}`)}
              >
                Details
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
