This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

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

## Contact Form Storage

The contact form now stores enquiries in PostgreSQL through `POST /api/contact`, using Drizzle ORM for the Next.js database connection and inserts.

1. Copy `.env.example` to `.env.local`
2. Point `DATABASE_URL` at your local PostgreSQL instance
3. Push the Drizzle schema to your database:

```bash
npm run db:push
```

4. Or create the table manually with:

```bash
psql "$DATABASE_URL" -f db/contact_submissions.sql
```

Drizzle schema files live in [src/db/schema.ts](./src/db/schema.ts) and [drizzle.config.ts](./drizzle.config.ts).

To inspect submissions locally:

```bash
psql "$DATABASE_URL" -c "select id, full_name, email, service, submitted_at from contact_submissions order by submitted_at desc;"
```

Later, you can move the same `DATABASE_URL` setup to Neon without changing the application code.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
