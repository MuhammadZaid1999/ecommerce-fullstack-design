import type { FormEvent } from "react";
import type { Navigate } from "../types/types";

export function RegisterPage({ navigate }: { navigate: Navigate }) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <section className="auth-page">
      <form onSubmit={handleSubmit}>
        <p className="eyebrow">Create account</p>
        <h1>Register</h1>
        <label>
          Full name
          <input type="text" placeholder="Alex Morgan" />
        </label>
        <label>
          Email address
          <input type="email" placeholder="alex@example.com" />
        </label>
        <label>
          Password
          <input type="password" placeholder="Enter your password" />
        </label>
        <label>
          Confirm password
          <input type="password" placeholder="Confirm your password" />
        </label>
        <button type="submit">Create account</button>
        <button
          className="text-link"
          type="button"
          onClick={() => navigate("/login")}
        >
          Already have an account? Login
        </button>
      </form>
    </section>
  );
}
