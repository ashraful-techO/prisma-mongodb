# Project Brief

## Task this project solves

Managing users (create, read, update, delete) normally requires wiring up a
database, an ORM, and an API by hand. This project solves that by providing a
small, working **User Management CRUD** reference app where:

- Users are persisted in **MongoDB** through **Prisma**.
- A **Next.js REST API** exposes list/create/update/delete operations.
- A single page lets anyone add, edit, and remove users.

It exists as a learning/demo project to show how Next.js App Router, Prisma,
and MongoDB fit together end to end.

## What we want to create (content / scope)

### Data model
- `User` model in `prisma/schema.prisma`
  - `id` (ObjectId, primary key)
  - `name` (required)
  - `email` (required, unique)
  - `phone` (optional)
  - `age` (optional)
  - `createdAt` (auto timestamp)

### Backend API
- `GET /api/users` — list all users, newest first
- `POST /api/users` — create a user
- `PATCH /api/users/[id]` — update name, email, age
- `DELETE /api/users/[id]` — delete a user

### Frontend
- One page (`/`) with a form to create/update a user
- A list showing every user with **Edit** and **Delete** actions
- Loading from the API on mount and refreshing after each change

### Database / config
- Prisma client singleton in `src/lib/prisma.ts`
- `DATABASE_URL` (MongoDB connection string) in `.env`
- Prisma config in `prisma.config.ts`

### Contents of this `ai` folder
The `ai` folder holds the intended scope and goals of the project — what is
being built and the task it solves — so the plan stays separate from the app
code.

## Future content ideas

- Add input validation (e.g. Zod) for API routes
- Surface and edit `phone` in the UI (currently schema-only)
- Add authentication and per-user data
- Add pagination and search for the user list
- Add tests for the API routes
