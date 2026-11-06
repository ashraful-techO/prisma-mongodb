# Prisma MongoDB — User Management

A User Management CRUD demo built with **Next.js 16** (App Router, React 19), **TypeScript**, **Tailwind CSS 4**, and **Prisma 6** connected to a **MongoDB** database.

## What it does

- Lists all users
- Creates a new user
- Updates an existing user
- Deletes a user

Users are stored in MongoDB through Prisma and accessed via REST API routes under `src/app/api/users`. The UI is a single client component in `src/component/User.tsx`.

### Project structure

- `prisma/schema.prisma` — `User` model (`id`, `name`, `email`, `phone`, `age`, `createdAt`)
- `src/lib/prisma.ts` — singleton `PrismaClient`
- `src/app/api/users/route.ts` — `GET` list, `POST` create
- `src/app/api/users/[id]/route.ts` — `PATCH` update, `DELETE`
- `src/component/User.tsx` — form + user list
- `ai/project-brief.md` — project brief: what we want to create and the task it solves

## Getting Started

Set `DATABASE_URL` (MongoDB connection string) in `.env`, then run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
