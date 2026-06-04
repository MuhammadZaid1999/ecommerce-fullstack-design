import { useEffect, useState } from "react";
import "./App.css";
import { Header } from "./components/Header";
import { CartPage } from "./pages/CartPage";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { ProductDetailsPage } from "./pages/ProductDetailsPage";
import { ProductListingPage } from "./pages/ProductListingPage";
import { RegisterPage } from "./pages/RegisterPage";
import type { CartItem } from "./types/types";

function App() {
  const [path, setPath] = useState(window.location.pathname);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const navigate = (nextPath: string) => {
    window.history.pushState({}, "", nextPath);
    setPath(nextPath);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const onPopState = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const addToCart = (productId: string) => {
    setCartItems((items) => {
      const existingItem = items.find((item) => item.productId === productId);

      if (existingItem) {
        return items.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...items, { productId, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems((items) =>
      items.map((item) =>
        item.productId === productId ? { ...item, quantity } : item,
      ),
    );
  };

  const removeFromCart = (productId: string) => {
    setCartItems((items) =>
      items.filter((item) => item.productId !== productId),
    );
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const route = getRoute(path);

  return (
    <div className="app-shell">
      <Header
        cartCount={cartCount}
        navigate={navigate}
        path={path}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <main>
        {route.name === "home" && (
          <HomePage
            addToCart={addToCart}
            navigate={navigate}
            searchQuery={searchQuery}
          />
        )}
        {route.name === "products" && (
          <ProductListingPage
            addToCart={addToCart}
            navigate={navigate}
            searchQuery={searchQuery}
          />
        )}
        {route.name === "productDetails" && (
          <ProductDetailsPage
            addToCart={addToCart}
            navigate={navigate}
            productId={route.productId}
          />
        )}
        {route.name === "cart" && (
          <CartPage
            cartItems={cartItems}
            navigate={navigate}
            removeFromCart={removeFromCart}
            updateQuantity={updateQuantity}
          />
        )}
        {route.name === "login" && <LoginPage navigate={navigate} />}
        {route.name === "register" && <RegisterPage navigate={navigate} />}
        {route.name === "notFound" && <NotFoundPage navigate={navigate} />}
      </main>
    </div>
  );
}

function getRoute(path: string) {
  if (path === "/") return { name: "home" as const };
  if (path === "/products") return { name: "products" as const };
  if (path.startsWith("/products/")) {
    return {
      name: "productDetails" as const,
      productId: path.replace("/products/", ""),
    };
  }
  if (path === "/cart") return { name: "cart" as const };
  if (path === "/login") return { name: "login" as const };
  if (path === "/register") return { name: "register" as const };
  return { name: "notFound" as const };
}

export default App;
