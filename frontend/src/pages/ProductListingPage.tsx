import { useState } from "react";
import { EmptyState } from "../components/EmptyState";
import { ProductGrid } from "../components/ProductGrid";
import {
  brandOptions,
  categoryGroups,
  parentCategories,
  products,
} from "../data/catalog";
import type { Navigate } from "../types/types";
import { filterBySearch } from "../utils/catalog";

const minCatalogPrice = Math.floor(
  Math.min(...products.map((product) => product.price)),
);
const maxCatalogPrice = Math.ceil(
  Math.max(...products.map((product) => product.price)),
);
export function ProductListingPage({
  addToCart,
  navigate,
  searchQuery,
}: {
  addToCart: (productId: string) => void;
  navigate: Navigate;
  searchQuery: string;
}) {
  const [selectedParentCategory, setSelectedParentCategory] = useState("All");
  const [selectedChildCategory, setSelectedChildCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState(maxCatalogPrice);
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [minRating, setMinRating] = useState(0);
  const selectedGroup = categoryGroups.find(
    (group) => group.name === selectedParentCategory,
  );
  const childCategories = selectedGroup
    ? selectedGroup.children
    : Array.from(new Set(products.map((product) => product.category)));
  const priceLabel = `$${minCatalogPrice} - $${maxPrice}`;
  const ratingLabel =
    minRating === 0 ? "All ratings" : `${minRating.toFixed(1)} stars and up`;
  const filteredProducts = filterBySearch(products, searchQuery).filter(
    (product) => {
      const matchesParent =
        selectedParentCategory === "All" ||
        product.parentCategory === selectedParentCategory;
      const matchesChild =
        selectedChildCategory === "All" ||
        product.category === selectedChildCategory;
      const matchesPrice = product.price <= maxPrice;
      const matchesBrand =
        selectedBrand === "All" || product.brand === selectedBrand;
      const matchesRating = product.rating >= minRating;
      return (
        matchesParent &&
        matchesChild &&
        matchesPrice &&
        matchesBrand &&
        matchesRating
      );
    },
  );

  return (
    <section className="listing-page">
      <div className="page-heading">
        <p className="eyebrow">Catalog</p>
        <h1>All products</h1>
        <p>
          Use category, price, and header search filters to narrow the lifestyle
          catalog.
        </p>
      </div>

      <div className="listing-layout">
        <aside className="filters" aria-label="Product filters">
          <label>
            Category
            <select
              value={selectedParentCategory}
              onChange={(event) => {
                setSelectedParentCategory(event.target.value);
                setSelectedChildCategory("All");
              }}
            >
              <option>All</option>
              {parentCategories.map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>
          </label>
          <label>
            Sub category
            <select
              value={selectedChildCategory}
              onChange={(event) => setSelectedChildCategory(event.target.value)}
            >
              <option>All</option>
              {childCategories.map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>
          </label>
          <label className="range-filter">
            <span>Price range</span>
            <input
              min={minCatalogPrice}
              max={maxCatalogPrice}
              step="1"
              type="range"
              value={maxPrice}
              onChange={(event) => setMaxPrice(Number(event.target.value))}
            />
            <small>{priceLabel}</small>
          </label>
          <label className="range-filter">
            <span>Rating</span>
            <input
              min="0"
              max="5"
              step="0.1"
              type="range"
              value={minRating}
              onChange={(event) => setMinRating(Number(event.target.value))}
            />
            <small>{ratingLabel}</small>
          </label>
          <label>
            Brand
            <select
              value={selectedBrand}
              onChange={(event) => setSelectedBrand(event.target.value)}
            >
              <option>All</option>
              {brandOptions.map((brand) => (
                <option key={brand}>{brand}</option>
              ))}
            </select>
          </label>
          <p>{filteredProducts.length} products found</p>
        </aside>

        {filteredProducts.length > 0 ? (
          <ProductGrid
            products={filteredProducts}
            addToCart={addToCart}
            navigate={navigate}
          />
        ) : (
          <EmptyState
            title="No products found"
            text="Try another category, price range, or search term."
          />
        )}
      </div>
    </section>
  );
}
