**IMPORTANT**: After cloning the repo, open the command line inside the project and run `npm i --legacy-peer-deps`.

# bugbook - A Twitter-like Social Media Platform

## Table of Contents

1. [Introduction](#introduction)
2. [Screenshots](#screenshots)
3. [Features](#features)
4. [Tech Stack](#tech-stack)
5. [Getting Started](#getting-started)
6. [Project Structure](#project-structure)
7. [Contributing](#contributing)

## Introduction

bugbook is a modern, Twitter-inspired social media platform built with Next.js and React. It allows users to share short messages, follow other users, and engage with content through likes and comments.

## Screenshots
![image](https://github.com/user-attachments/assets/6c15358b-3a10-4119-a778-20b55c536a3d)
![image](https://github.com/user-attachments/assets/70c97342-e6b0-4ea4-b106-f6636b04b61a)
![image](https://github.com/user-attachments/assets/abcb6dbb-3d7a-42ba-ace2-ed24c7cb2253)
![image](https://github.com/user-attachments/assets/89807f49-d9f9-474e-87d8-7809cea7f377)
![image](https://github.com/user-attachments/assets/e3f20c84-b391-4945-bd4a-4aba5879c0bd)
![image](https://github.com/user-attachments/assets/8329f994-d599-403d-893f-9211dccd2dd4)
![image](https://github.com/user-attachments/assets/d667ec95-e858-4bbb-a18d-054f8d593c69)
![image](https://github.com/user-attachments/assets/dc086150-7681-4572-a747-3c782e8370b7)

## Features

- User authentication and authorization
- Create, read, update, and delete posts
- Follow/unfollow other users
- Like and comment on posts
- User profiles with avatars and display names
- Real-time updates using React Server Components
- React tanstack query for data fetching and caching
- Responsive design for mobile and desktop
- Using uploadthing for image uploads
- Using zod for form and data validation
- Using stream-chat for real-time chat
- Dark mode

## Tech Stack

**Client:** React, Next.js 15 (App Router), TypeScript, TailwindCSS, Lucide React (Icons), Tanstack Query

**Server:** Node.js, PostgreSQL, Prisma (ORM)

**Authentication:** Lucia

**Other Technologies:**

- Uploadthing (Image Upload)
- Stream-chat (Real-time Chat)
- Zod (Form and Data Validation)
- Shadcn/UI (UI Components)
- And many more ...

## Getting Started

1. Clone the repository:

   ```
   git clone https://github.com/mohit1310/bugbook.git
   cd bugbook
   ```

2. Install dependencies:

   ```
   npm i --legacy-peer-deps
   ```

3. Set up your environment variables:
   Copy the `.env.example` file to `.env` and fill in your database and authentication credentials.

4. Set up the database:

   ```
   npx prisma migrate dev
   ```

5. Run the development server:

   ```
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

- `src/app`: Contains the main application code, including pages and layouts
- `src/components`: Reusable React components
- `src/lib`: Utility functions and custom hooks
- `src/app/auth`: Authentication-related code
- `prisma/schema.prisma`: Database schema and migrations

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
