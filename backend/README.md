# Ecommerce Backend

Express, TypeScript, MongoDB, and Mongoose API for the ecommerce catalog.

## Requirements

- Node.js 20+
- npm
- Docker and Docker Compose for local MongoDB

## Setup

```bash
npm install
cp .env.example .env
docker compose up -d
npm run seed
npm run dev
```

The API runs on `http://localhost:5000` by default.

## Scripts

- `npm run dev` - start the TypeScript API in watch mode.
- `npm run build` - compile TypeScript into `dist`.
- `npm start` - run the compiled API.
- `npm run seed` - reset and populate MongoDB with sample brands, categories, and products.

## Endpoints

- `GET /health`
- `GET /api/products?page=1&limit=12`
- `GET /api/products/:id`
- `POST /api/products`
- `PATCH /api/products/:id`
- `DELETE /api/products/:id`
- `GET /api/brands?page=1&limit=50`
- `GET /api/categories?page=1&limit=50`

Product create/update payloads use brand and category ids:

```json
{
  "id": "sample-product",
  "name": "Sample Product",
  "brand": "aster-and-co",
  "category": "womens",
  "price": 68,
  "rating": 4.8,
  "image": "https://example.com/image.jpg",
  "description": "A sample product description.",
  "details": ["One detail"],
  "featured": true
}
```

Product read responses include `brandId`, `categoryId`, and expanded display fields (`brand`, `category`, `parentCategory`) so the existing frontend can render dynamic catalog data directly.
