# TASKIFY (TRELLO CLONE)

## Overview

<img src='./public/taskify-mockup.png' />

> Video Demo:

https://github.com/user-attachments/assets/ef80dabb-9425-4698-9b52-7718a3275be9

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

The app is now running, navigate to http://localhost:3000/ in your browser to explore its UI.
