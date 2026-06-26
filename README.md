# Blog API

> A learning project built with [NestJS](https://nestjs.com/) — a basic blog REST API with JWT authentication.

## Tech Stack

- **Framework:** NestJS 11 + TypeScript
- **Database:** SQLite (via `better-sqlite3` + TypeORM)
- **Auth:** JWT-based authentication with a global guard
- **Image upload:** Cloudinary
- **Package manager:** pnpm

## Features

- User login with JWT tokens
- JWT authentication guard applied globally
- Image upload to Cloudinary
- CRUD operations for blog posts
- Documentation with Swagger

## Project setup

```bash
pnpm install
```

## Compile and run

```bash
# development
pnpm run start

# watch mode
pnpm run start:dev

# production mode
pnpm run start:prod
```

## Environment variables

Create a `.env` file in the root directory:

```env
PORT=3000

JWT_SECRET=my-secret-key
JWT_EXPIRES_IN=8h

REFRESH_TOKEN_EXPIRES_DAYS=30

CLOUDINARY_CLOUD_NAME=my-cloud
CLOUDINARY_API_KEY=123456789
CLOUDINARY_API_SECRET=abc123def456
```

## Project structure

```
src/
├── auth/                   # JWT authentication
├── common/decorators/      # Shared decorators
├── posts/                  # Blog posts CRUD
├── upload/                 # Image upload
├── users/                  # Users CRUD
├── app.module.ts
├── database.module.ts
└── main.ts
```

## What's next

- [ ] Add automated tests (unit + e2e)
- [x] Add API documentation (Swagger/OpenAPI)
- [x] Pagination and filtering for posts
- [x] Upload images (Cloudinary)
- [x] Soft delete (restore deleted posts)
- [ ] Cache with Redis (interceptor for GET endpoints)
- [ ] Event emitter (`post.created`, `comment.added` events)
