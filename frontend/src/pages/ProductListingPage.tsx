import { useState } from "react";
import { EmptyState } from "../components/EmptyState";
import { ProductGrid } from "../components/ProductGrid";
import {
  categoryGroups,
  parentCategories,
  priceRanges,
  products,
} from "../data/catalog";
import type { Navigate } from "../types/types";
import { filterBySearch } from "../utils/catalog";

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
  const [selectedPrice, setSelectedPrice] = useState(priceRanges[0].label);
  const selectedGroup = categoryGroups.find(
    (group) => group.name === selectedParentCategory,
  );
  const childCategories = selectedGroup
    ? selectedGroup.children
    : Array.from(new Set(products.map((product) => product.category)));
  const priceRange =
    priceRanges.find((range) => range.label === selectedPrice) ??
    priceRanges[0];
  const filteredProducts = filterBySearch(products, searchQuery).filter(
    (product) => {
      const matchesParent =
        selectedParentCategory === "All" ||
        product.parentCategory === selectedParentCategory;
      const matchesChild =
        selectedChildCategory === "All" ||
        product.category === selectedChildCategory;
      const matchesPrice =
        product.price >= priceRange.min && product.price <= priceRange.max;
      return matchesParent && matchesChild && matchesPrice;
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
          <label>
            Price range
            <select
              value={selectedPrice}
              onChange={(event) => setSelectedPrice(event.target.value)}
            >
              {priceRanges.map((range) => (
                <option key={range.label}>{range.label}</option>
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
