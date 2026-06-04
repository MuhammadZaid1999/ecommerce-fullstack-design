import { products } from "../data/catalog";
import type { Navigate } from "../types/types";
import { formatCategory } from "../utils/catalog";
import { NotFoundPage } from "./NotFoundPage";

export function ProductDetailsPage({
  addToCart,
  navigate,
  productId,
}: {
  addToCart: (productId: string) => void;
  navigate: Navigate;
  productId: string;
}) {
  const product = products.find((item) => item.id === productId);

  if (!product) {
    return <NotFoundPage navigate={navigate} />;
  }

  return (
    <section className="details-page">
      <img src={product.image} alt={product.name} />
      <div className="details-copy">
        <p className="eyebrow">{formatCategory(product)}</p>
        <h1>{product.name}</h1>
        <p className="rating">Rated {product.rating.toFixed(1)} out of 5</p>
        <p className="detail-price">${product.price.toFixed(2)}</p>
        <p>{product.description}</p>
        <ul>
          {product.details.map((detail) => (
            <li key={detail}>{detail}</li>
          ))}
        </ul>
        <div className="detail-actions">
          <button type="button" onClick={() => addToCart(product.id)}>
            Add to cart
          </button>
          <button
            className="secondary-action"
            type="button"
            onClick={() => navigate("/products")}
          >
            Back to products
          </button>
        </div>
      </div>
    </section>
  );
}
