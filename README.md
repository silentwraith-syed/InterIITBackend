# 🎓 KGPTalks Backend

> A robust, scalable RESTful API backend for **KGPTalks** - A modern discussion platform built for the IIT Kharagpur community.

**Developed by:** [Syed Mehran Ahmed](https://github.com/silentwraith-syed)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Live Demo](#live-demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Deployment](#deployment)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Scripts](#scripts)
- [Troubleshooting](#troubleshooting)
- [License](#license)

---

## 🚀 Live Demo

**Production API:** [https://interiitbackend.onrender.com](https://interiitbackend.onrender.com)

**Health Check:** [https://interiitbackend.onrender.com/health](https://interiitbackend.onrender.com/health)

**Status:** ✅ Live and Running

---

## 🌟 Overview

**KGPTalks** is a community-driven discussion platform designed specifically for the IIT Kharagpur ecosystem. The backend provides a secure, performant API that powers threaded discussions with nested commenting, user authentication, and real-time engagement features.

This backend handles:
- ✅ Secure email/password authentication
- ✅ Domain-restricted access (`kgpian.iitkgp.ac.in`)
- ✅ Nested comment threads with unlimited depth
- ✅ Post management with rich content support
- ✅ Real-time upvoting system
- ✅ JWT-based authorization
- ✅ Type-safe API with comprehensive validation

---

## ✨ Features

### 🔐 Authentication & Security
- **Email/Password Authentication**: Simple registration and login with bcrypt password hashing
- **Domain Whitelisting**: Restricted access to `kgpian.iitkgp.ac.in` and `interiit.org` domains
- **JWT Tokens**: Secure, stateless authentication with 7-day expiration
- **Password Hashing**: Bcrypt-based password encryption with salt rounds
- **Protected Routes**: Middleware-based route protection

### 💬 Discussion Features
- **Posts Management**: Create and retrieve discussion posts with rich text and images
- **Nested Comments**: Unlimited depth comment threading (parent-child relationships)
- **Upvoting System**: Community-driven content curation
- **User Profiles**: Avatar support and user metadata
- **Chronological Ordering**: Posts and comments sorted by creation time

### 🛡️ Data Validation & Error Handling
- **Zod Schema Validation**: Type-safe request validation
- **Comprehensive Error Handling**: Centralized error middleware
- **Input Sanitization**: Protection against malicious inputs
- **Type Safety**: Full TypeScript coverage

---

## 🛠️ Tech Stack

### **Core Framework**
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **TypeScript** - Type-safe JavaScript

### **Database & ORM**
- **PostgreSQL** - Production database
- **Prisma ORM** - Type-safe database client
- **Prisma Migrate** - Database migration management

### **Authentication & Security**
- **JSON Web Tokens (JWT)** - Stateless authentication
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT generation and verification

### **Validation & Type Safety**
- **Zod** - Runtime schema validation
- **TypeScript** - Compile-time type checking

### **Development Tools**
- **ts-node-dev** - Fast TypeScript development with hot reload
- **Prisma Studio** - Visual database browser
- **dotenv** - Environment variable management

### **Additional Libraries**
- **cors** - Cross-origin resource sharing
- **express** - HTTP request handling

---

## 🏗️ Architecture

### **Project Structure**
```
src/
├── controllers/          # Request handlers
│   ├── auth.controller.ts      # Register/Login
│   ├── posts.controller.ts     # Post CRUD operations
│   └── comments.controller.ts  # Comment CRUD + upvotes
├── routes/              # API route definitions
│   ├── index.ts               # Main router
│   ├── auth.routes.ts         # Auth endpoints
│   ├── posts.routes.ts        # Post endpoints
│   └── comments.routes.ts     # Comment endpoints
├── middleware/          # Custom middleware
│   ├── authGuard.ts          # JWT verification
│   └── error.ts              # Error handler
├── lib/                 # Utility functions
│   ├── auth.ts               # JWT helpers
│   ├── crypto.ts             # Password hashing
│   └── prisma.ts             # Database client
├── validators/          # Zod schemas
│   ├── comment.schema.ts
│   └── pagination.ts
├── app.ts              # Express app setup
├── server.ts           # Server entry point
├── env.ts              # Environment config
└── types.ts            # TypeScript type definitions

prisma/
├── schema.prisma       # Database schema
├── migrations/         # Database migrations
└── seed.ts            # Database seeding
```

### **Database Models**

#### **User**
- Stores user information (email, name, avatar)
- One-to-many relationship with Posts and Comments

#### **Post**
- Discussion topics with title, body, and optional image
- Belongs to a User (author)
- Has many Comments

#### **Comment**
- Threaded comments with unlimited nesting
- Self-referential parent-child relationship
- Upvote counter for engagement
- Belongs to User and Post

---

## 🚀 Getting Started

### **Prerequisites**
- Node.js 18+ 
- PostgreSQL 14+ (or SQLite for development)
- npm or yarn

### **Installation**

1. **Clone the repository**
```bash
git clone https://github.com/silentwraith-syed/InterIITBackend.git
cd InterIITBackend
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/kgptalks"
JWT_SECRET="your-super-secret-jwt-key"
ALLOWED_DOMAINS="kgpian.iitkgp.ac.in,interiit.org"
PORT=4000
```

4. **Set up the database**
```bash
# Generate Prisma Client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Seed initial data (optional)
npm run seed
```

5. **Start the development server**
```bash
npm run dev
```

The API will be available at `http://localhost:4000`

### **Production Build**
```bash
npm run build
npm start
```

### **Docker Deployment**

#### **Test Locally with Docker Compose**
```bash
# Build and start all services (PostgreSQL + API)
docker-compose up --build

# Run in detached mode
docker-compose up -d

# Stop services
docker-compose down
```

#### **Deploy to Railway**

1. **Create Railway Account** at [railway.app](https://railway.app/)
2. **Create New Project** from GitHub repository
3. **Add PostgreSQL Database** (Railway plugin)
4. **Set Environment Variables:**
   ```env
   JWT_SECRET=your-super-secret-jwt-key
   ALLOWED_DOMAINS=kgpian.iitkgp.ac.in,interiit.org
   NODE_ENV=production
   ```
5. **Deploy** - Railway auto-detects Dockerfile and deploys

📖 **Full Railway deployment guide:** See [RAILWAY_DEPLOYMENT.md](RAILWAY_DEPLOYMENT.md)

---

## 📡 API Documentation

### **Base URL**
```
http://localhost:4000/api
```

### **Health Check**
```http
GET /health
```
Returns server status.

---

### **Authentication Endpoints**

#### **Register**
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@kgpian.iitkgp.ac.in",
  "password": "your-secure-password",
  "name": "John Doe" (optional)
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "clx123abc",
    "name": "John Doe",
    "email": "user@kgpian.iitkgp.ac.in",
    "avatar": null,
    "createdAt": "2025-10-17T10:30:00.000Z"
  }
}
```
Creates a new user account. Email must be from an allowed domain (`kgpian.iitkgp.ac.in` or `interiit.org`).

---

#### **Login**
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@kgpian.iitkgp.ac.in",
  "password": "your-secure-password"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "clx123abc",
    "name": "John Doe",
    "email": "user@kgpian.iitkgp.ac.in",
    "avatar": null,
    "createdAt": "2025-10-17T10:30:00.000Z"
  }
}
```

**Demo Credentials:**
All test users have password: `password123`
- riya@kgpian.iitkgp.ac.in
- ava@kgpian.iitkgp.ac.in
- arjun@kgpian.iitkgp.ac.in
- admin@interiit.org

---

### **Post Endpoints**

#### **Get All Posts**
```http
GET /api/posts
```

**Response:**
```json
[
  {
    "id": "clx123",
    "title": "Welcome to KGPTalks",
    "body": "Discussion platform for IIT KGP",
    "image": "https://example.com/image.jpg",
    "createdAt": "2025-10-17T10:00:00.000Z",
    "author": {
      "id": "clx456",
      "name": "Admin",
      "email": "admin@interiit.org",
      "avatar": "https://i.pravatar.cc/150?img=15"
    }
  }
]
```

---

#### **Get Post by ID**
```http
GET /api/posts/:id
```

**Response:**
```json
{
  "id": "clx123",
  "title": "Welcome to KGPTalks",
  "body": "Discussion platform for IIT KGP",
  "image": "https://example.com/image.jpg",
  "createdAt": "2025-10-17T10:00:00.000Z",
  "authorId": "clx456",
  "author": {
    "id": "clx456",
    "name": "Admin",
    "email": "admin@interiit.org"
  }
}
```

---

### **Comment Endpoints**

#### **Get Comments for a Post**
```http
GET /api/comments/post/:postId
```

**Response:**
```json
[
  {
    "id": "clx789",
    "text": "Great discussion!",
    "upvotes": 12,
    "createdAt": "2025-10-17T11:00:00.000Z",
    "userId": "clx456",
    "postId": "clx123",
    "parentId": null,
    "user": {
      "id": "clx456",
      "name": "John Doe",
      "email": "user@kgpian.iitkgp.ac.in",
      "avatar": "https://i.pravatar.cc/150?img=10"
    }
  }
]
```

---

#### **Create Comment** 🔒 *Requires Authentication*
```http
POST /api/comments
Authorization: Bearer <token>
Content-Type: application/json

{
  "postId": "clx123",
  "text": "This is my comment",
  "parentId": "clx789" (optional, for replies)
}
```

**Response:**
```json
{
  "id": "clx999",
  "text": "This is my comment",
  "upvotes": 0,
  "createdAt": "2025-10-17T12:00:00.000Z",
  "userId": "clx456",
  "postId": "clx123",
  "parentId": "clx789"
}
```

---

#### **Upvote Comment** 🔒 *Requires Authentication*
```http
POST /api/comments/:id/upvote
Authorization: Bearer <token>
```

**Behavior:**
- First click: Adds upvote (upvotes +1, returns `upvoted: true`)
- Second click: Removes upvote (upvotes -1, returns `upvoted: false`)
- Each user can only upvote once per comment (toggle on/off)

**Response:**
```json
{
  "id": "clx789",
  "text": "Great discussion!",
  "upvotes": 13,
  "upvoted": true,
  "createdAt": "2025-10-17T11:00:00.000Z",
  "userId": "clx456",
  "postId": "clx123",
  "parentId": null,
  "user": {
    "id": "clx456",
    "name": "John Doe",
    "email": "user@kgpian.iitkgp.ac.in",
    "avatar": "https://i.pravatar.cc/150?img=10"
  }
}
```

---

## 💾 Database Schema

```prisma
model User {
  id        String    @id @default(cuid())
  name      String
  email     String    @unique
  password  String
  avatar    String?
  createdAt DateTime  @default(now())
  posts     Post[]
  comments  Comment[]
  upvotedComments CommentUpvote[]
}

model Post {
  id        String    @id @default(cuid())
  title     String
  body      String
  image     String?
  createdAt DateTime  @default(now())
  author    User      @relation(fields: [authorId], references: [id])
  authorId  String
  comments  Comment[]
}

model Comment {
  id        String    @id @default(cuid())
  text      String
  upvotes   Int       @default(0)
  createdAt DateTime  @default(now())
  user      User      @relation(fields: [userId], references: [id])
  userId    String
  post      Post      @relation(fields: [postId], references: [id])
  postId    String
  parent    Comment?  @relation("CommentToComment", fields: [parentId], references: [id])
  parentId  String?
  children  Comment[] @relation("CommentToComment")
  upvotedBy CommentUpvote[]
}

model CommentUpvote {
  id        String   @id @default(cuid())
  user      User     @relation(fields: [userId], references: [id])
  userId    String
  comment   Comment  @relation(fields: [commentId], references: [id], onDelete: Cascade)
  commentId String
  createdAt DateTime @default(now())

  @@unique([userId, commentId])
  @@index([commentId])
  @@index([userId])
}
```

---

## 🔐 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@localhost:5432/kgptalks` |
| `JWT_SECRET` | Secret key for JWT signing | `supersecret_kgptalks_2025` |
| `ALLOWED_DOMAINS` | Comma-separated allowed email domains | `kgpian.iitkgp.ac.in,interiit.org` |
| `PORT` | Server port | `4000` |

---

## 📂 Project Structure

```
InterIITBackend/
├── src/
│   ├── controllers/        # Business logic
│   ├── routes/            # API routes
│   ├── middleware/        # Custom middleware
│   ├── lib/              # Utilities
│   ├── validators/       # Zod schemas
│   ├── app.ts           # Express setup
│   ├── server.ts        # Entry point
│   ├── env.ts          # Config
│   └── types.ts        # Types
├── prisma/
│   ├── schema.prisma   # DB schema
│   ├── migrations/     # DB migrations
│   └── seed.ts        # Seed data
├── dist/              # Compiled JS
├── node_modules/      # Dependencies
├── .env              # Environment variables
├── .env.example      # Env template
├── package.json      # Dependencies & scripts
├── tsconfig.json     # TypeScript config
└── README.md        # Documentation
```

---

## 📜 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Compile TypeScript to JavaScript |
| `npm start` | Run production server |
| `npm run prisma:generate` | Generate Prisma Client |
| `npm run prisma:migrate` | Run database migrations |
| `npm run prisma:studio` | Open Prisma Studio (DB GUI) |
| `npm run seed` | Seed database with sample data |

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 👨‍💻 Developer

**Syed Mehran Ahmed**
- GitHub: [@silentwraith-syed](https://github.com/silentwraith-syed)
- Project: KGPTalks Backend API

---

## 🙏 Acknowledgments

- IIT Kharagpur community
- Inter IIT Tech Meet 14.0
- All contributors and testers

---

**Built with ❤️ for the IIT KGP community**
