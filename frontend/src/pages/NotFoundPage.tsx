import { EmptyState } from "../components/EmptyState";
import type { Navigate } from "../types/types";

export function NotFoundPage({ navigate }: { navigate: Navigate }) {
  return (
    <section className="not-found">
      <EmptyState
        title="Page not found"
        text="The page or product you are looking for is unavailable."
      >
        <button type="button" onClick={() => navigate("/products")}>
          Go to products
        </button>
      </EmptyState>
    </section>
  );
}
