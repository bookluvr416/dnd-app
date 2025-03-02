# App Description

This is a D&D themed Next.js app that is a work in progress.

The live app can be seen at https://dnd-app-dun.vercel.app/.

Features:  
- Dice roller with 3D css dice
- Page to create a new character
- Page to edit a character
- Page to view all characters in the database, sortable with some sort of summary of character info (not all info will be shown)
- Page to see the details of a specific character (TBD to make this look like an actual character sheet)
- Blog called "An Adventurer's Blog: A Day in the Life" which features blog posts from character adventures
- User authentication with any actions writing to the database hidden behind an account logic

I also may use https://www.dnd5eapi.co/ to query its apis to create something to do with items or spells. Perhaps a spell tracker or item tracker?

## Various TODOS
- show logged in person's username in right corner of nav bar
- pagination for the characters list and subsequent retrieval. offset-based?
- fix issue on mobile where numeric fields that allow negatives can't have a negative entered because the mobile number pad doesn't have a "-" symbol

## Technologies

- Next.js with TypeScript
- Tailwind CSS
- GraphQL with PostgreSQL is used for practice purposes. I thought about just writing to a PostgreSQL database from Next.js, but I wanted to practice GraphQL
- Next-Auth for authentication with Github


# Boilerplate generated Readme

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

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
