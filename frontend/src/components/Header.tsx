import type { Navigate } from "../types/types";

export function Header({
  cartCount,
  navigate,
  path,
  searchQuery,
  setSearchQuery,
}: {
  cartCount: number;
  navigate: Navigate;
  path: string;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}) {
  return (
    <header className="site-header">
      <button className="brand" type="button" onClick={() => navigate("/")}>
        <span className="brand-mark">M</span>
        <span>ModeHaus</span>
      </button>
      <nav className="main-nav" aria-label="Primary navigation">
        <NavButton
          active={path === "/"}
          label="Home"
          onClick={() => navigate("/")}
        />
        <NavButton
          active={path.startsWith("/products")}
          label="Products"
          onClick={() => navigate("/products")}
        />
        <NavButton
          active={path === "/cart"}
          label="Cart"
          onClick={() => navigate("/cart")}
        />
      </nav>
      <label className="search-field">
        <span className="sr-only">Search products</span>
        <input
          type="search"
          placeholder="Search products or categories"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
      </label>
      <details className="profile-menu">
        <summary aria-label="Open profile menu">
          <span className="profile-icon">P</span>
          <span className="cart-pill">{cartCount}</span>
        </summary>
        <div className="profile-panel">
          <button type="button" onClick={() => navigate("/login")}>
            Login
          </button>
          <button type="button" onClick={() => navigate("/register")}>
            Register
          </button>
          <button type="button" onClick={() => navigate("/cart")}>
            Cart ({cartCount})
          </button>
        </div>
      </details>
    </header>
  );
}

function NavButton({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button className={active ? "active" : ""} type="button" onClick={onClick}>
      {label}
    </button>
  );
}
