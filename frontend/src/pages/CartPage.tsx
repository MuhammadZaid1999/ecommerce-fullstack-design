import { EmptyState } from "../components/EmptyState";
import { products } from "../data/catalog";
import type { CartItem, Navigate, Product } from "../types/types";
import { formatCategory } from "../utils/catalog";

export function CartPage({
  cartItems,
  navigate,
  removeFromCart,
  updateQuantity,
}: {
  cartItems: CartItem[];
  navigate: Navigate;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
}) {
  const cartProducts = cartItems
    .map((item) => ({
      ...item,
      product: products.find((product) => product.id === item.productId),
    }))
    .filter((item): item is CartItem & { product: Product } =>
      Boolean(item.product),
    );
  const total = cartProducts.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  return (
    <section className="cart-page">
      <div className="page-heading">
        <p className="eyebrow">Cart</p>
        <h1>Your selected items</h1>
      </div>

      {cartProducts.length === 0 ? (
        <EmptyState
          title="Your cart is empty"
          text="Add products from the catalog and they will appear here."
        >
          <button type="button" onClick={() => navigate("/products")}>
            Browse products
          </button>
        </EmptyState>
      ) : (
        <div className="cart-layout">
          <div className="cart-items">
            {cartProducts.map((item) => (
              <article className="cart-row" key={item.productId}>
                <img src={item.product.image} alt={item.product.name} />
                <div>
                  <h2>{item.product.name}</h2>
                  <p>{formatCategory(item.product)}</p>
                  <strong>${item.product.price.toFixed(2)}</strong>
                </div>
                <label>
                  Qty
                  <input
                    min="1"
                    type="number"
                    value={item.quantity}
                    onChange={(event) =>
                      updateQuantity(item.productId, Number(event.target.value))
                    }
                  />
                </label>
                <button
                  className="remove-button"
                  type="button"
                  onClick={() => removeFromCart(item.productId)}
                >
                  Remove
                </button>
              </article>
            ))}
          </div>
          <aside className="cart-summary">
            <h2>Order summary</h2>
            <div>
              <span>Subtotal</span>
              <strong>${total.toFixed(2)}</strong>
            </div>
            <div>
              <span>Shipping</span>
              <strong>Free</strong>
            </div>
            <div className="summary-total">
              <span>Total</span>
              <strong>${total.toFixed(2)}</strong>
            </div>
            <button type="button">Checkout</button>
          </aside>
        </div>
      )}
    </section>
  );
}
