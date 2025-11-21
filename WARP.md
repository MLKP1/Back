# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

**Pizza Stars API Backend** - A TypeScript/Node.js backend for a pizza restaurant management system (TCC project) built with Fastify, Prisma ORM, and PostgreSQL. Features JWT authentication, role-based access control, and comprehensive CRUD operations for users, addresses, and future product/order management.

## Development Commands

### Core Development
```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Database Operations
```bash
# Start PostgreSQL container
docker-compose up -d

# Run database migrations
npx prisma migrate dev

# Seed database with sample data
npx prisma db seed

# Open Prisma Studio (database GUI)
npx prisma studio

# Reset database (drops all data)
npx prisma migrate reset
```

### Code Quality
```bash
# Run Biome linter
npm run lint

# Fix linting issues automatically
npx biome check --write

# Structured commit (uses commitlint)
npm run commit
```

## Architecture Overview

### High-Level Structure

The application follows a **layered architecture** with clear separation of concerns:

**Controllers** → **Services** → **Repositories** → **Database**

- **Controllers** (`src/http/controllers/`): Handle HTTP requests/responses, validation, error handling
- **Services** (`src/services/`): Business logic, coordinating between repositories  
- **Repositories** (`src/repositories/`): Data access layer, abstracted database operations
- **Factories** (`src/services/factories/`): Dependency injection pattern for service instantiation

### Key Architectural Patterns

1. **Repository Pattern**: Abstract database operations through interfaces (`UsersRepository`, `AddressRepository`)
2. **Factory Pattern**: Service instantiation with proper dependency injection 
3. **Service Layer**: Encapsulate business logic separate from HTTP concerns
4. **Middleware Chain**: JWT verification and role-based access control

### Authentication Flow

The app uses **JWT-based authentication** with refresh tokens:

- Access tokens expire in 10 minutes
- Refresh tokens stored in HTTP-only cookies
- Role-based access control (CUSTOMER, EMPLOYEE, ADMIN)
- Custom middlewares: `verifyJWT`, `verifyUserRole`

### Database Schema Architecture

**Core Entities**:
- **Users**: Authentication, profile data, roles
- **Addresses**: User delivery addresses (1:1 with User)
- **Products**: Pizzas, Drinks, Desserts with enum-based categorization
- **Orders/Cart**: Many-to-many relationships with products

**Key Relationships**:
- User ↔ Address (1:1)
- User ↔ Cart (1:1) 
- User ↔ Orders (1:N)
- Orders/Cart ↔ Products (N:N via implicit join tables)

## Development Notes

### Environment Setup

Required environment variables in `.env`:
```env
DATABASE_URL="postgresql://lucas:lucas123@localhost:5432/pizza-stars"
PORT=3333
NODE_ENV="dev"
JWT_SECRET="your-secure-secret-key"
GMAIL_USER="your-email@gmail.com"
GMAIL_PASS="your-app-password"
```

### Code Style Guidelines

- **Biome** enforces code style (no default exports, semicolon preferences, etc.)
- **TypeScript strict mode** enabled
- **Path aliases**: Use `@/*` for `src/*` imports
- **Conventional commits** required via commitlint

### Error Handling Strategy

- **Custom Error Classes**: `UserAlreadyExistsError`, `InvalidCredentialsError`, etc.
- **Global Error Handler**: Catches and formats errors appropriately
- **Zod Validation**: Automatic request validation with detailed error responses
- **Database Error Detection**: Handles connection issues gracefully

### Testing Considerations

- Services are designed for easy unit testing with dependency injection
- Repository interfaces allow for easy mocking
- Factory pattern enables swapping implementations for testing

### Deployment Configuration

- **Docker**: PostgreSQL container via docker-compose
- **Build Tool**: tsup for fast TypeScript compilation
- **Module System**: ESM modules (`"type": "module"`)
- **Node.js Version**: Locked to Node.js 20 via Volta

## API Structure

Base URL: `http://localhost:3333/api`

### Authentication Endpoints
- `POST /auth/login` - User authentication
- `PATCH /auth/refresh` - Token refresh
- `DELETE /auth/logout` - User logout (requires JWT)

### User Management
- `POST /users` - User registration
- `GET /user` - Get current user profile (requires JWT)
- `PATCH /user` - Update user profile (requires JWT)
- `DELETE /user` - Delete user account (requires JWT)
- `GET /users` - List all users (requires ADMIN role)

### Address Management
- Full CRUD operations for user addresses (all require JWT)

*Note: Product and order management APIs are planned but not yet implemented.*
