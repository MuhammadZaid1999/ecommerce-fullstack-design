import { ProductGrid } from "../components/ProductGrid";
import { SectionHeading } from "../components/SectionHeading";
import { categoryGroups, products } from "../data/catalog";
import type { Navigate } from "../types/types";
import { filterBySearch } from "../utils/catalog";

export function HomePage({
  addToCart,
  navigate,
  searchQuery,
}: {
  addToCart: (productId: string) => void;
  navigate: Navigate;
  searchQuery: string;
}) {
  const matchedProducts = filterBySearch(products, searchQuery);
  const featuredProducts = matchedProducts.filter(
    (product) => product.featured,
  );
  const newestProducts = matchedProducts.filter((product) => product.newest);

  return (
    <>
      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">Curated lifestyle goods</p>
          <h1>Everyday pieces for easier living.</h1>
          <p>
            Shop apparel, home objects, tech essentials, and wellness staples
            selected for modern routines.
          </p>
          <div className="hero-actions">
            <button type="button" onClick={() => navigate("/products")}>
              Shop all products
            </button>
          </div>
        </div>
        <img
          src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80"
          alt="Model wearing a curated lifestyle outfit"
        />
      </section>

      <section className="content-section">
        <SectionHeading eyebrow="Browse" title="Shop by category" />
        <div className="category-grid">
          {categoryGroups.map((group) => {
            const productCount = products.filter(
              (product) => product.parentCategory === group.name,
            ).length;
            return (
              <button
                key={group.name}
                type="button"
                onClick={() => navigate("/products")}
              >
                <span>{group.name}</span>
                <small>{group.children.join(" • ")}</small>
                <small>{productCount} products</small>
              </button>
            );
          })}
        </div>
      </section>

      <section className="content-section">
        <SectionHeading eyebrow="Featured" title="Customer favorites" />
        <ProductGrid
          products={featuredProducts}
          addToCart={addToCart}
          navigate={navigate}
        />
      </section>

      <section className="content-section">
        <SectionHeading eyebrow="New arrivals" title="Fresh on the shelves" />
        <ProductGrid
          products={newestProducts}
          addToCart={addToCart}
          navigate={navigate}
        />
      </section>
    </>
  );
}
