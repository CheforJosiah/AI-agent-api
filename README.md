# AI Student Recommendation Engine API

A RESTful backend API for an AI Recommendation Platform. Collects student academic background, career ambitions, skills, and learning preferences, and assembles structured context payloads for an AI Recommendation Agent to generate personalized book and career recommendations.

## Tech Stack
- Node.js / Express.js
- MongoDB (Mongoose) — data store and session store (`connect-mongo`)
- express-session — session-based authentication (httpOnly, sameSite: strict cookies)
- bcrypt — password hashing
- swagger-jsdoc + swagger-ui-express — API documentation

## Architecture
Layered architecture: `Route → Middleware → Controller → Service → Model/Data Store`

```
ai-agent-api/
├── src/
│   ├── config/        # DB connection, session store config
│   ├── controllers/   # Request/response handlers
│   ├── middlewares/   # Auth, RBAC, error handling
│   ├── models/         # Mongoose schemas
│   ├── routes/         # Route definitions
│   ├── services/       # Business logic, AI context assembly
│   ├── utils/           # Seed scripts, shared helpers
│   └── app.js           # Express app setup
├── server.js             # Entry point
├── package.json
├── .env.example
└── README.md
```

## Prerequisites
- Node.js (v18+ recommended)
- A MongoDB Atlas cluster (or local MongoDB instance)

## Environment Setup

1. Clone the repo and install dependencies:
   ```bash
   git clone <your-repo-url>
   cd ai-agent-api
   npm install
   ```

2. Copy the example environment file and fill in your own values:
   ```bash
   cp .env.example .env
   ```

3. `.env.example`:
   ```
   PORT=5000
   NODE_ENV=development
   MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/ai-agent-api?retryWrites=true&w=majority
   SESSION_SECRET=replace_with_a_long_random_string
   ```

   Generate a `SESSION_SECRET` with:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

## Seeding the Database

Career tracks is a reference/catalog data, seeded via scripts rather than created through the API

```bash
npm run seed:careers
```

Each script clears and repopulates its collection — safe to re-run.

## Running the Service

Development (auto-restart on changes):
```bash
npm run dev
```

Production:
```bash
npm start
```

The server starts at `http://localhost:5000` (or your configured `PORT`), and only begins accepting requests once the MongoDB connection is confirmed.

## API Documentation

Interactive Swagger UI is available at:
```

```

## Authentication

Session-based (not JWT). After `/auth/login`, the server sets an httpOnly session cookie (`connect.sid`) backed by MongoDB (`connect-mongo`). Include this cookie on subsequent requests — Postman/browsers handle this automatically once logged in.

## Endpoints Summary

| Module | Method | Path | Access |
|---|---|---|---|
| Auth | POST | `/api/v1/auth/register` | Public |
| Auth | POST | `/api/v1/auth/login` | Public |
| Auth | POST | `/api/v1/auth/logout` | Authenticated |
| Auth | GET | `/api/v1/auth/me` | Authenticated |
| Profiles | GET | `/api/v1/profiles/me` | student |
| Profiles | PUT | `/api/v1/profiles/me` | student |
| Books | GET | `/api/v1/books` | Authenticated |
| Books | POST | `/api/v1/books` | admin |
| Careers | GET | `/api/v1/careers/tracks` | Authenticated |
| AI | POST | `/api/v1/ai/recommendations` | student |

Full request/response schemas: see Swagger UI.

## Error Format

All errors follow a standardized shape via centralized error-handling middleware:
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input parameters",
    "details": []
  }
}
```