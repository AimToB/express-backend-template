# Backend Starter Template (Express)

A clean, production-ready Express backend starter focused on stability, safety, and scalability.

This template is designed to be cloned and extended for personal projects, production backends.

---

## Features

- Express app/server separation
- Centralized error handling
- Async-safe controllers (no try/catch)
- Global rate limiting
- Secure HTTP headers (Helmet)
- Request size limiting
- Graceful shutdown handling

---

## Project Structure

src/
├─ api/
│ ├─ routes/ Route definitions (HTTP layer)
│ ├─ controllers/ Request orchestration
│ ├─ services/ DB fetching
│ └─ config/ External services (DB, env, etc.)
│
├─ middleware/
│ ├─ errorHandler.js
│ └─ rateLimiter.js
│
├─ utils/
│ ├─ AppError.js
│ ├─ asyncHandler.js
│ └─ errors.js
│
├─ app.js Express configuration
└─ server.js Process lifecycle & startup

---

## Folder Structure

api/
Everything that directly handles HTTP requests.

middleware/
Cross-cutting concerns applied globally (errors, rate limiting, auth later).

utils/
Pure helpers. No Express, no req, no res.

app.js
Express setup only. No server lifecycle logic.

server.js
Starts the server and handles shutdown signals.

---

## Error Handling

This template uses a single global error handling strategy.

### Custom Error Class

Use AppError (or helpers) to throw expected errors :

throw new AppError("Unauthorized", 401);

or:

predefined classes of errors such as: throw new NotFoundError("Resource not found");

### Error Response Format

All errors return the same shape:

{
"success": false,
"error": "Human-readable message"
}

Unexpected errors are automatically masked in responses.

---

## Async Controllers

Express does not catch async errors by default.

This template solves that with asyncHandler.

Always wrap async controllers:

import { asyncHandler } from "../utils/asyncHandler.js";

export const example = asyncHandler(async (req, res) => {
res.json({ success: true });
});

Never use try/catch in controllers.

---

## Rate Limiting

A global rate limiter is applied to all requests.

- 100 requests per IP
- 15-minute window

This protects against spam and accidental request floods.

Stricter limits can be added later for auth routes, reservation creation, and admin endpoints.

---

## Security

Out of the box:

- Helmet sets secure HTTP headers
- JSON body size is limited to 10kb
- Invalid or malformed requests are rejected safely

This is a baseline, not full security hardening.

---

## Graceful Shutdown

The server listens for SIGINT and SIGTERM.

On shutdown:

- stops accepting new requests
- finishes active requests
- exits cleanly

Required for Docker and cloud deployments.

---

## Environment Variables

Minimal required setup:

PORT=5000
NODE_ENV=development

Additional variables (DB, auth, etc.) are added per project.

---

## Getting Started

npm install
npm run dev

The server will start on the configured port.

---

## Intended Usage

This repository is meant to be:

- used as a GitHub template
- cloned as a clean backend starting point
- extended with project-specific features

It is intentionally minimal and opinionated.

---

## License

MIT
Use freely in personal and commercial projects.

---
