# Fixlt (FixIt Repair Workshop Management System)

Baseline decoupled architecture:

- `backend/`: Node.js + Express REST API, Prisma ORM (MySQL), JWT auth, Gemini AI prioritization module.
- `frontend/`: React + Tailwind CSS UI with modular structure for forms, views, context, and hooks.

## Repository layout

```text
backend/
  prisma/
    schema.prisma
  src/
    config/
    controllers/
    middleware/
    routes/
    services/
  tests/
frontend/
  src/
    components/
      forms/
      orders/
    context/
    hooks/
    views/
```

## Backend quick start

```bash
cd backend
cp .env.example .env
npm install
npm run prisma:generate
npm run dev
```

## Frontend quick start

```bash
cd frontend
npm install
npm run dev
```
