# Blog API

> A learning project built with [NestJS](https://nestjs.com/) — a basic blog REST API with JWT authentication.

## Tech Stack

- **Framework:** NestJS 11 + TypeScript
- **Database:** SQLite (via `better-sqlite3` + TypeORM)
- **Auth:** JWT-based authentication with a global guard
- **Validation:** `class-validator` + `class-transformer`
- **Package manager:** pnpm

## Features

- User login with JWT tokens
- JWT authentication guard applied globally
- CRUD operations for blog posts

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
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=8h
```

## Project structure

```
src/
├── auth/        # JWT authentication (module, service, controller, guard, DTOs)
├── common/      # Shared decorators
├── posts/       # Blog posts CRUD (module, service, controller, DTOs, entities)
├── users/       # Users CRUD (module, service, controller, DTOs, entities)
├── app.module.ts
├── database.module.ts
└── main.ts
```

## What's next

- [ ] Add automated tests (unit + e2e)
- [ ] Add API documentation (Swagger/OpenAPI)
- [x] Pagination and filtering for posts
- [ ] Upload images (Multer + Cloudinary/local storage)
- [x] Soft delete (restore deleted posts)
- [ ] Cache with Redis (interceptor for GET endpoints)
- [ ] Event emitter (`post.created`, `comment.added` events)
