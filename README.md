This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

🚀 The live version is at: https://clone-github-notification.vercel.app/

## AC

- Top buttons: [Select] / [Select All] and their states [Cancel], [Deselect All] ✅
- Top buttons: [Select] / [Select All] and their states [Cancel], [Deselect All] ✅
- List of items, with select ✅
- Load more button / scroll to bottom to load more. ✅
- Handling loading more items ✅
- Submit (mark as done/read) - sends an API request to an endpoint ✅
- Integrate with an API (or mock API) for fetching more data. ✅
- Use any CSS framework/library youre familiar with to make the screen look pleasant. ✅
- Backend: GraphQL/Relay is preferred but not required. ⚠️
  - Note: I ended up using SWR / NextJs framework instead as data fetching management alternative.

## Icing on the cake

- Optimistic UI for marking as done/read/delete. ✅
- Use TypeScript. ✅
- SWR / NextJs framework for data fetching management. ✅
- Robust list to handle large number of items (10,000 items and still keep FPS at 60). ✅
- Reducer convention follow [The Tao Of Redux](https://blog.isquaredsoftware.com/2017/05/idiomatic-redux-tao-of-redux-part-1/) - this never goes out of fashin ✅

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
