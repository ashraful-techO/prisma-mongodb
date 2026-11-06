# Project Note

## What this project is

A **User Management CRUD** demo built with the modern Next.js App Router stack and Prisma connected to a **MongoDB** database.

## Tech Stack

- **Next.js 16** (App Router, React 19)
- **Prisma ORM 6** with the `mongodb` provider
- **MongoDB** (via `DATABASE_URL`)
- **TypeScript**
- **Tailwind CSS 4**

## Structure

- `prisma/schema.prisma` — `User` model (`id`, `name`, `email`, `phone`, `age`, `createdAt`)
- `prisma.config.ts` — Prisma CLI/config, reads `DATABASE_URL`
- `src/lib/prisma.ts` — singleton `PrismaClient` (avoids multiple instances in dev)
- `src/app/api/users/route.ts` — `GET` (list) and `POST` (create) users
- `src/app/api/users/[id]/route.ts` — `PATCH` (update) and `DELETE` users
- `src/component/User.tsx` — client component with a form and user list
- `src/app/page.tsx` — renders the `User` component

## Flow

The client component calls the REST API routes, which use Prisma to read/write the `users` collection in MongoDB. No server actions or external state library are used.

## Getting started

```bash
yarn install
# set DATABASE_URL in .env
yarn dev
```

Then open http://localhost:3000 to add, edit, and delete users.

## Notes / limitations

- No authentication or validation library; API returns basic 400/500 errors.
- `phone` exists in the schema but is not used by the UI.
- PATCH does not update `phone`.
