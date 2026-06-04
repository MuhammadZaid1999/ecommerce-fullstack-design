import type { FormEvent } from "react";
import type { Navigate } from "../types/types";

export function LoginPage({ navigate }: { navigate: Navigate }) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <section className="auth-page">
      <form onSubmit={handleSubmit}>
        <p className="eyebrow">Welcome back</p>
        <h1>Login</h1>
        <label>
          Email address
          <input type="email" placeholder="alex@example.com" />
        </label>
        <label>
          Password
          <input type="password" placeholder="Enter your password" />
        </label>
        <button type="submit">Login</button>
        <button
          className="text-link"
          type="button"
          onClick={() => navigate("/register")}
        >
          New here? Register
        </button>
      </form>
    </section>
  );
}
