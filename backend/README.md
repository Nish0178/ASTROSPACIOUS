# Astrospacious Backend API

This is the scalable, production-ready backend for the Astrospacious platform.

## Architecture

- **Node.js** + **Express.js**
- **TypeScript** for strict type checking
- Structured with modular MVC-style architecture

## Folder Structure

```text
backend/
├── src/
│   ├── app.ts            # Express setup & middlewares
│   ├── server.ts         # Server entry point
│   ├── config/           # Environment validation (Zod)
│   ├── routes/           # API Routing
│   ├── controllers/      # Route logic (placeholder)
│   ├── services/         # Business logic (placeholder)
│   ├── middlewares/      # Express middlewares (errorHandler, notFound)
│   ├── utils/            # Helper functions
│   ├── types/            # TypeScript interfaces/types
│   ├── constants/        # App constants
│   └── validators/       # Request validation schemas
├── package.json
├── tsconfig.json
├── .env.example
└── .gitignore
```

## Installation

1. Clone or navigate to the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` and fill in the values.

## Scripts

- `npm run dev`: Start the server in development mode using `ts-node-dev`.
- `npm run build`: Compile TypeScript code to standard JavaScript in the `dist/` directory.
- `npm start`: Run the compiled JavaScript output for production.

## Environment Variables

- `PORT`: Port on which the server runs (default: 5000)
- `NODE_ENV`: Application environment (`development` | `production`)
- `DATABASE_URL`: PostgreSQL connection string (upcoming)
- `JWT_SECRET`: Secret key for JWT generation (upcoming)
- `RESEND_API_KEY`: API key for sending emails (upcoming)

## Health Check

Verify the API is running by visiting:
```bash
GET http://localhost:5000/
GET http://localhost:5000/api/v1/health
```
