# TASKIFY (TRELLO CLONE)

## Overview

> Video Demo:

[![Taskify](https://markdown-videos-api.jorgenkh.no/url?url=https%3A%2F%2Fyoutu.be%2FUnobX_RVxE8)](https://youtu.be/UnobX_RVxE8)

> Key Features:

- Auth
- Organizations / Workspaces
- Board creation
- Unsplash API for random beautiful cover images
- Activity log for entire organization
- Board rename and delete
- List creation
- List rename, delete, drag & drop reorder and copy
- Card creation
- Card description, rename, delete, drag & drop reorder and copy
- Card activity log
- Board limit for every organization
- Stripe subscription for each organization to unlock unlimited boards
- Landing page
- MySQL DB
- Prisma ORM
- shadcnUI & TailwindCSS

## Getting started

1. Clone this repository:

```
git clone https://github.com/finma/trello-clone.git
```

2. Install npm dependencies:

```
npm install
```

3. Copy env (fill out the necessary information)

```
cp .env.example .env
```

- For clerk, go to [clerk.com](https://clerk.com/), create account, and create application
- For unsplash, go to [unsplash.com/developer](https://unsplash.com/developers) developer, create account, and application

4. Generate and migrate prisma

```
npx prisma generate
npx prisma db push
```

5. Start app

```
npm run dev
```
