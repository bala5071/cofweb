## 1. PROJECT OVERVIEW & OBJECTIVES

- Project root (required): C:\Users\balas\Documents\Projects\cofweb

Project Overview (problem statement)
- Build a professional, production-ready website for a coffee shop that exposes:
  - A public-facing website for customers that shows menu items, allows placing orders (store pickup), booking reservations, and sending contact messages.
  - A secure admin backend for managing menu items, viewing orders/reservations/messages, and basic reporting.
- The site must be implemented in TypeScript/JavaScript with modern best practices, unit & integration tests, linting, formatting, and simple deployment steps (local-first, SQLite for dev).

Specific problem solved
- Many small coffee shops lack an online presence with ordering and reservation capability that is low-cost and easy-to-host. This project provides a full-stack solution that works locally or in a simple cloud container.

Target users
- Primary: Customers (desktop & mobile) who want to browse menu and place pickup orders or reserve a table.
- Secondary: Coffee shop staff/admin who need to maintain the menu, view and manage incoming orders and reservations.
- Developer: Any developer who will implement, test, maintain and deploy this site using the specification.

Core Functionality (3-5 main features)
1. Public menu browsing (categories, item details, images, filters).
2. Order flow: shopping cart, create pickup order (no payment gateway), order confirmation.
3. Reservations: book a table specifying date/time, party size, contact details.
4. Contact form: allow customers to send messages to staff.
5. Admin panel: CRUD menu items, view and change order/reservation status, export orders/reservations CSV.

Success criteria (how we know it works)
- Public GET /api/menu returns JSON list of menu items and categories within 200ms on local dev.
- Customer can complete an order and receive a confirmation response with order id and estimated pickup time.
- Reservation form persists a reservation and it’s visible in the admin panel with correct fields.
- Admin can create/update/delete menu items and view orders/reservations.
- Automated test suite passes: backend unit & integration tests, frontend unit tests run successfully.
- Linting and formatting run without errors.

Scope
- IN SCOPE:
  - Full-stack application: Node.js/Express API (TypeScript), React frontend (TypeScript/Vite).
  - SQLite database for dev (Prisma ORM).
  - JWT-based admin authentication.
  - Local seed data and admin user.
  - Server-side validation and logging.
  - Unit and integration tests, linting, Prettier formatting.
- OUT OF SCOPE:
  - Payment processing (Stripe/PayPal) — can be added later.
  - Delivery logistics or third-party ordering platforms.
  - Multi-tenant capabilities and advanced analytics.
  - Production-ready scaling (this plan includes notes for scalability).

---

## 2. TECHNOLOGY STACK (Specific Versions Required)

- Programming Runtime:
  - Node.js 20.5.0 (Why: LTS modern runtime with stable ecosystem)
- Package manager:
  - npm 10.0.0 (shipped with Node.js 20.x)
- Backend Framework:
  - express@4.18.2 (HTTP API framework, minimal and well-known)
- ORM & Database:
  - prisma@5.8.0 (ORM for schema-first workflow)
  - @prisma/client@5.8.0 (Prisma client)
  - sqlite3@5.1.6 (lightweight file-based DB for local/dev)
- Language & Tooling:
  - typescript@5.2.2 (static typing; required by quality checklist)
  - ts-node-dev@2.0.0 (dev runner for TS)
- Validation:
  - zod@3.21.4 (runtime schema validation)
- Authentication & Security:
  - jsonwebtoken@9.0.2 (JWT implementation)
  - bcryptjs@2.4.3 (password hashing for admin)
  - cors@2.8.5 (CORS)
  - helmet@7.0.0 (security headers)
- Logging:
  - winston@4.8.2 (application logging)
- Utilities:
  - dotenv@16.0.3 (load env vars)
  - csv-writer@1.6.0 (export CSV for orders/reservations)
- Frontend:
  - React 18.2.0 (UI)
  - react-dom 18.2.0
  - vite@5.0.0 (dev server & build)
  - react-router-dom@6.14.1 (routing)
  - axios@1.4.0 (HTTP client)
  - Tailwind CSS v3.4.6 (styling)
- Testing:
  - jest@29.6.1 (backend unit tests)
  - ts-jest@29.1.0 (typescript in jest)
  - supertest@6.3.3 (integration testing HTTP)
  - @testing-library/react@14.0.0 (frontend unit tests)
- Linting & Formatting:
  - eslint@8.45.0
  - eslint-config-airbnb-typescript@17.0.0
  - prettier@2.8.8
  - eslint-plugin-prettier@5.0.0
- Dev Tools:
  - nodemon not used (ts-node-dev used)
  - cross-env@7.0.3 (for npm scripts cross-platform)

Why each choice (brief)
- Node.js + Express: minimal and flexible backend.
- TypeScript: required type hints and robust developer experience.
- Prisma + SQLite: quick schema-first development, easy migrations and seed, SQLite simplifies local setup.
- React + Vite: fast development and an SPA for modern UX.
- Zod: comprehensive validation with TypeScript compatibility.
- JWT + bcryptjs: straightforward admin authentication.
- Jest + supertest: reliable testing for backend; React Testing Library for frontend.

---

## 3. COMPLETE FILE & DIRECTORY STRUCTURE

Root path: C:\Users\balas\Documents\Projects\cofweb

Full structure with descriptions (all files exact names):

```
C:\Users\balas\Documents\Projects\cofweb\
├── README.md                             # Project overview and quick run instructions (manually created)
├── .gitignore                             # Git ignore (manually created)
├── .env.example                           # Template for environment variables (manually created)
├── package.json                           # Root npm scripts and workspaces (manually created)
├── tsconfig.json                          # Root TypeScript configuration (manually created)
├── prisma/                                # Prisma schema and migration files (prisma generate will create some files)
│   ├── schema.prisma                      # Database schema (manually created)
│   └── seed.ts                            # Seed script (manually created)
├── backend/                               # Backend application (manually created)
│   ├── package.json                       # backend dependencies and scripts
│   ├── tsconfig.json                      # backend TS config (extends root)
│   ├── src/
│   │   ├── index.ts                       # Backend entry point (manually created)
│   │   ├── app.ts                         # Express app setup (manually created)
│   │   ├── server.ts                      # Server start script (manually created)
│   │   ├── config/
│   │   │   ├── config.ts                  # Loads env and config types (manually created)
│   │   ├── routes/
│   │   │   ├── public.routes.ts           # Public endpoints (menu, orders, reservations)
│   │   │   ├── admin.routes.ts            # Admin endpoints (protected)
│   │   ├── controllers/
│   │   │   ├── menu.controller.ts         # Menu controllers (manually created)
│   │   │   ├── order.controller.ts        # Orders (manually created)
│   │   │   ├── reservation.controller.ts  # Reservations (manually created)
│   │   │   ├── contact.controller.ts      # Contact (manually created)
│   │   │   └── admin.controller.ts        # Admin auth and admin utilities (manually created)
│   │   ├── services/
│   │   │   ├── menu.service.ts            # Business logic for menu
│   │   │   ├── order.service.ts           # Business logic for orders
│   │   │   ├── reservation.service.ts     # Business logic for reservations
│   │   │   ├── contact.service.ts         # Business logic for messages
│   │   │   └── admin.service.ts           # Admin related business logic
│   │   ├── repositories/
│   │   │   ├── menu.repo.ts               # Prisma access methods for menu
│   │   │   ├── order.repo.ts              # Prisma access methods for orders
│   │   │   ├── reservation.repo.ts
│   │   │   └── contact.repo.ts
│   │   ├── middlewares/
│   │   │   ├── auth.middleware.ts         # JWT protection middleware
│   │   │   ├── error.middleware.ts        # Central error handler
│   │   │   └── validate.middleware.ts     # Zod-based request validation
│   │   ├── utils/
│   │   │   ├── logger.ts                  # Winston logger (manually created)
│   │   │   ├── csvExporter.ts             # CSV export utility
│   │   │   └── time.utils.ts              # time helpers for estimated pickup
│   │   └── types/
│   │       └── index.d.ts                 # Shared TS types/interfaces
│   ├── jest.config.js                     # Backend jest config
│   └── tests/
│       ├── unit/
│       │   ├── menu.service.spec.ts
│       │   └── order.service.spec.ts
│       └── integration/
│           ├── public.routes.spec.ts
│           └── admin.routes.spec.ts
├── frontend/                              # Frontend React app (manually created)
│   ├── package.json
│   ├── tsconfig.json                      # frontend TS config (extends root)
│   ├── index.html
│   ├── src/
│   │   ├── main.tsx                       # React entry (manually created)
│   │   ├── App.tsx                        # Router and layout (manually created)
│   │   ├── pages/
│   │   │   ├── Home.tsx
│   │   │   ├── MenuPage.tsx
│   │   │   ├── MenuItemPage.tsx
│   │   │   ├── CartPage.tsx
│   │   │   ├── ReservationPage.tsx
│   │   │   ├── ContactPage.tsx
│   │   │   ├── AdminLogin.tsx
│   │   │   └── AdminDashboard.tsx
│   │   ├── components/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── MenuList.tsx
│   │   │   ├── MenuItemCard.tsx
│   │   │   ├── Cart.tsx
│   │   │   └── ReservationForm.tsx
│   │   ├── services/
│   │   │   └── api.ts                     # axios HTTP wrapper
│   │   ├── styles/
│   │   │   └── tailwind.css
│   │   └── tests/
│   │       ├── Header.spec.tsx
│   │       └── MenuList.spec.tsx
│   └── vite.config.ts
├── docs/
│   ├── api.md                             # Full API docs (manually created)
│   └── architecture.md                    # Architecture notes and scaling (manually created)
└── scripts/
    ├── start-local.ps1                    # PowerShell script to start both backend & frontend
    └── migrate-and-seed.ps1               # Run prisma migrate + seed (manually created)
```

Which files are auto-generated vs manual
- Auto-generated:
  - prisma client files created by `prisma generate` (node_modules/.prisma)
  - node_modules/ after npm install
  - backend/dist or frontend/dist after build
- Manually created:
  - All files listed above excluding auto-generated ones.

Why each directory/file exists (brief)
- backend/: Backend application source, strictly separated for maintainability.
- frontend/: User-facing React application, built with Vite for fast dev.
- prisma/: Database schema & seed (central source of truth for DB design).
- docs/: API and architecture documentation for maintainers.
- scripts/: Convenience scripts for running dev flow on Windows (matching user-specified path).
- .env.example: Template for environment variables.
- top-level package.json & tsconfig.json: Provide monorepo-like script orchestration and shared TypeScript settings.

---

## 4. DATA MODELS & SCHEMAS

We will model the app with Prisma (schema.prisma) using SQLite in dev. Below are all models precisely defined.

File: prisma/schema.prisma (full content)
- datasource db { provider = "sqlite" url = env("DATABASE_URL") }
- generator client { provider = "prisma-client-js" }
- models:

1) MenuItem
- id: Int @id @default(autoincrement())
- name: String (required, max length 150 enforced by validator)
- description: String? (optional)
- price_cents: Int (index, price in cents to avoid float)
- category: Category (relation)
- categoryId: Int
- is_available: Boolean @default(true)
- image_url: String? (optional)
- created_at: DateTime @default(now())
- updated_at: DateTime @updatedAt

2) Category
- id: Int @id @default(autoincrement())
- name: String @unique
- order: Int @default(0) (used to display categories)
- created_at: DateTime @default(now())

3) Order
- id: Int @id @default(autoincrement())
- customer_name: String
- customer_phone: String
- customer_email: String?
- pickup_time: DateTime (when customer will pick up)
- status: String @default("pending") (enum-like: pending, preparing, ready, completed, cancelled)
- total_cents: Int
- items: OrderItem[] (relation)
- created_at: DateTime @default(now())

4) OrderItem
- id: Int @id @default(autoincrement())
- order: Order @relation(fields: [orderId], references: [id])
- orderId: Int
- menuItemId: Int
- quantity: Int @default(1)
- price_cents: Int (snapshot of price at order time)
- name_snapshot: String (snapshot of name at order time)

5) Reservation
- id: Int @id @default(autoincrement())
- name: String
- phone: String
- email: String?
- party_size: Int
- date_time: DateTime
- notes: String?
- status: String @default("confirmed") (confirmed, cancelled, seated)
- created_at: DateTime @default(now())

6) ContactMessage
- id: Int @id @default(autoincrement())
- name: String
- email: String?
- message: String
- created_at: DateTime @default(now())
- handled: Boolean @default(false)

7) AdminUser
- id: Int @id @default(autoincrement())
- username: String @unique
- password_hash: String
- created_at: DateTime @default(now())

Prisma schema (literal example) provided in docs/api.md and file prisma/schema.prisma.

Validation rules (enforced by Zod in services/controllers)
- MenuItem.name: non-empty string, max 150 chars.
- price_cents: integer >= 0.
- Category.name: non-empty.
- Order: customer_name non-empty; phone validated via regex (E.164 loosely); items non-empty; quantity >=1; pickup_time at least now + 10 minutes.
- Reservation: date_time must be in future and within opening hours (08:00-22:00 local).
- ContactMessage.message: min length 10.

Default values
- Timestamps with Prisma defaults.
- is_available true, status defaults as shown.

Relationships
- MenuItem -> Category (many-to-one)
- Order -> OrderItem (one-to-many)
- OrderItem references MenuItem by id saved as menuItemId; snapshot fields capture name & price.

---

## 5. MODULE SPECIFICATIONS (For Each File)

We provide concise module specs for critical files. All functions use TypeScript type hints.

Note: we'll show signatures and sample error behavior for main modules only. Repeat pattern applies to other controllers/services.

File: backend/src/config/config.ts
- Purpose: Load env variables and export typed config object.
- Exports:
  - interface AppConfig { PORT: number; DATABASE_URL: string; JWT_SECRET: string; ADMIN_USERNAME: string; ADMIN_PASSWORD_HASH: string; NODE_ENV: string; LOG_LEVEL: string; ALLOW_ORIGIN: string; }
  - const config: AppConfig
- Behavior:
  - Reads process.env with defaults and throws Error if mandatory variable missing (DATABASE_URL, JWT_SECRET).
- Example:
  - get config.PORT returns number parsed.

File: backend/src/index.ts
- Purpose: Entry point, calls server.ts start after running prisma migrate & seed check in dev.
- Exports: none; side-effect starts server.

File: backend/src/app.ts
- Purpose: Create Express application instance and wire routes and middlewares.
- Exports:
  - function createApp(): Express.Application
- Internal:
  - Configure helmet, cors (origin from config.ALLOW_ORIGIN), express.json(), routes, error middleware.

File: backend/src/server.ts
- Purpose: Start HTTP server and handle graceful shutdown.
- Public function:
  - async function startServer(app: Express.Application, port: number): Promise<http.Server>
- Throws:
  - logs and rethrows critical errors.

File: backend/src/middlewares/auth.middleware.ts
- Purpose: Protect admin routes using JWT.
- Exports:
  - function adminAuthMiddleware(req: Request, res: Response, next: NextFunction): void
- Behavior:
  - Reads Authorization header "Bearer <token>", verifies with JWT secret, attaches adminUser { id, username } to req.user.
  - Errors:
    - 401 Unauthorized if missing/invalid token.

File: backend/src/middlewares/validate.middleware.ts
- Purpose: Zod-based validator for request body or params.
- Exports:
  - function validateSchema(schema: ZodSchema, source: 'body'|'params'|'query'): RequestHandler
- Behavior:
  - Parses and if invalid returns 400 with structured errors.

File: backend/src/middlewares/error.middleware.ts
- Purpose: Centralized error handler.
- Exports:
  - function errorMiddleware(err: any, req: Request, res: Response, next: NextFunction): void
- Behavior:
  - If err is a custom ValidationError/NotFoundError/UnauthorizedError map to status codes, else 500.
  - Log with logger.

File: backend/src/utils/logger.ts
- Purpose: Configure and export Winston logger.
- Exports:
  - const logger: winston.Logger
- Behavior:
  - JSON console transport in production, colorized in dev.

File: backend/src/repositories/menu.repo.ts
- Purpose: Prisma-level data access for menu items.
- Exports:
  - async function getAllMenuItems(): Promise<MenuItem[]>
  - async function getMenuItemById(id: number): Promise<MenuItem | null>
  - async function createMenuItem(data: CreateMenuItemInput): Promise<MenuItem>
  - async function updateMenuItem(id: number, data: UpdateMenuItemInput): Promise<MenuItem>
  - async function deleteMenuItem(id: number): Promise<void>
- Errors:
  - Throws repository-level errors on DB failures.

Types (backend/src/types/index.d.ts)
- export type MenuItem = { id: number; name: string; description?: string; price_cents: number; categoryId: number; is_available: boolean; image_url?: string; created_at: string; updated_at: string; }
- export type OrderInput = { customer_name: string; phone: string; email?: string; pickup_time: string; items: { menuItemId: number; quantity: number }[] }
- etc.

File: backend/src/services/order.service.ts
- Purpose: Business logic for creating and retrieving orders.
- Exports:
  - async function createOrder(input: OrderInput): Promise<Order>
- Behavior:
  - Validate items exist and are available; calculate total_cents; create Order and OrderItems in a transaction; returns created Order including items.
- Input types & signature:
  - async function createOrder(input: OrderInput): Promise<OrderWithItems>
- Errors:
  - Throws ValidationError if invalid.
  - Throws NotFoundError if any menuItem not found.

File: backend/src/controllers/order.controller.ts
- Purpose: HTTP handlers for /api/orders
- Exports:
  - async function postOrder(req: Request, res: Response): Promise<void>
- Behavior:
  - Validate request body using Zod, call order.service.createOrder, return 201 with { orderId, estimatedPickup }.
- Error handling:
  - Validation errors convert to 400 via validate middleware; unexpected errors bubbled to error.middleware.

File: backend/src/routes/public.routes.ts
- Purpose: Wire public endpoints.
- Exports:
  - function publicRouter(): Router
- Routes:
  - GET /api/menu -> menu.controller.getMenuList
  - GET /api/menu/:id -> menu.controller.getMenuItem
  - POST /api/orders -> order.controller.postOrder
  - POST /api/reservations -> reservation.controller.postReservation
  - POST /api/contact -> contact.controller.postMessage

File: backend/src/routes/admin.routes.ts
- Purpose: Admin endpoints protected by adminAuthMiddleware
- Routes:
  - POST /api/admin/login -> admin.controller.login (returns JWT)
  - CRUD /api/admin/menu -> menu.controller admin variants
  - GET /api/admin/orders -> admin.controller.getOrders (with optional status query)
  - GET /api/admin/reservations -> admin.controller.getReservations
  - GET /api/admin/export/orders -> admin.controller.exportOrdersCsv
- All handlers include types in signatures and produce appropriate response codes.

Frontend module specs (examples)

File: frontend/src/services/api.ts
- Purpose: Axios wrapper with baseURL and auth token management.
- Exports:
  - class API { constructor(baseURL: string); async get<T>(path: string, config?: AxiosRequestConfig): Promise<T>; async post<T>(path: string, body: any): Promise<T>; setToken(token?: string): void; }
- Behavior:
  - Stores JWT in localStorage for admin pages.

File: frontend/src/pages/MenuPage.tsx
- Purpose: Fetch and render menu list.
- Exports: default function MenuPage(): JSX.Element
- Behavior:
  - Uses api.get('/api/menu'), handles loading and errors, displays MenuList component.
- Error handling:
  - Shows UI-friendly messages, retries allowed once.

All functions and classes should include JSDoc and explicit TypeScript types.

---

## 6. API DESIGN (BASE URL, Endpoints, Request/Response)

Base URL (local dev)
- Backend serves API at http://localhost:4000
- Prefix: /api

Authentication
- Admin-auth uses JWT: login returns { token: string }. For protected routes supply Authorization: Bearer <token>.

Endpoints (complete list, methods, request/response examples)

1) GET /api/menu
- Purpose: Get list of categories and menu items.
- Query params: ?categoryId=number (optional), ?available=true (optional)
- Response 200:
  {
    "categories": [
      { "id": 1, "name": "Coffee", "order": 0 },
      ...
    ],
    "items": [
      {
        "id": 1,
        "name": "Espresso",
        "description": "Strong single shot",
        "price_cents": 250,
        "categoryId": 1,
        "is_available": true,
        "image_url": "https://...",
        "created_at": "2025-01-01T12:00:00Z"
      },
      ...
    ]
  }

2) GET /api/menu/:id
- Purpose: Get a single menu item
- Response 200:
  {
    "id": 1,
    "name": "Cappuccino",
    "description": "...",
    "price_cents": 350,
    "categoryId": 1,
    "is_available": true
  }
- 404 Not Found if id invalid.

3) POST /api/orders
- Purpose: Create an order (pickup)
- Request body (JSON):
  {
    "customer_name": "Alice",
    "phone": "+1234567890",
    "email": "alice@example.com",
    "pickup_time": "2025-12-25T15:30:00Z",
    "items": [
      { "menuItemId": 1, "quantity": 2 },
      { "menuItemId": 4, "quantity": 1 }
    ]
  }
- Response 201 Created:
  {
    "orderId": 123,
    "estimatedPickup": "2025-12-25T15:30:00Z",
    "status": "pending"
  }
- 400 Validation errors with structure:
  {
    "error": "ValidationError",
    "details": [ { "path": "items[0].menuItemId", "message": "Menu item not found" } ]
  }

4) GET /api/orders/:id
- Purpose: Get order details (public - only order id not secure, better to rely on admin view; initial plan: admin only)
- For privacy, this endpoint is admin-only; public can only create orders and see confirmation.

5) POST /api/reservations
- Request body:
  {
    "name": "Bob",
    "phone": "+123...",
    "email": "bob@example.com",
    "party_size": 4,
    "date_time": "2025-12-25T19:00:00Z",
    "notes": "Window seat please"
  }
- Response 201:
  {
    "reservationId": 55,
    "status": "confirmed"
  }
- 400 if date_time invalid or outside hours.

6) POST /api/contact
- Body:
  { "name": "Sam", "email": "sam@example.com", "message": "I love your beans" }
- Response 201:
  { "messageId": 7, "handled": false }

7) POST /api/admin/login
- Body:
  { "username": "admin", "password": "plaintextpassword" }
- Response 200:
  { "token": "<jwt>", "expiresIn": 3600 }
- 401 on invalid creds.

8) Admin CRUD for menu items (protected)
- POST /api/admin/menu -> create menu item
  Body:
  {
    "name": "Flat White",
    "description": "Rich microfoam",
    "price_cents": 375,
    "categoryId": 2,
    "is_available": true,
    "image_url": "https://..."
  }
  Response 201 with created item.

- PUT /api/admin/menu/:id -> update (200)
- DELETE /api/admin/menu/:id -> delete (204)

9) GET /api/admin/orders?status=pending
- Response 200: array of orders with full items.

10) GET /api/admin/reservations?from=YYYY-MM-DD&to=YYYY-MM-DD
- Response 200: array of reservations.

11) GET /api/admin/export/orders?from=...&to=...
- Auth required; returns CSV (Content-Type: text/csv) downloadable.

Status codes:
- 200 OK, 201 Created, 204 No Content, 400 Bad Request (validation), 401 Unauthorized, 403 Forbidden (if admin but insufficient rights), 404 Not Found, 500 Internal Server Error

All endpoints return error JSON with "error" and "details" keys where applicable.

---

## 7. DETAILED IMPLEMENTATION STEPS (Numbered, 1..)

Below are sequential steps to implement the project. Each step pinpoints files to create/modify and commands to run on Windows (PowerShell / cmd where noted). Follow in order.

Preparations (assume Node.js 20.5.0 & npm installed)

Step 1: Create project folder
- Commands:
  - Open PowerShell and run:
    ```
    cd "C:\Users\balas\Documents\Projects"
    mkdir cofweb
    cd cofweb
    ```
- Create top-level files:
  - README.md (create with short description)
  - .gitignore (create - node_modules, .env, dist)
  - .env.example (create with keys listed in Section 10)

Step 2: Initialize root package.json
- Command:
  ```
  npm init -y
  ```
- Modify package.json to include scripts for orchestrating backend and frontend. Example root package.json (exact):
  ```json
  {
    "name": "cofweb",
    "version": "1.0.0",
    "private": true,
    "workspaces": ["backend", "frontend"],
    "scripts": {
      "install:all": "npm --prefix backend install && npm --prefix frontend install",
      "dev": "powershell -File scripts\\start-local.ps1",
      "migrate-and-seed": "npm --prefix backend run migrate:dev",
      "lint": "npm --prefix backend run lint && npm --prefix frontend run lint",
      "test": "npm --prefix backend test && npm --prefix frontend test"
    }
  }
  ```

Step 3: Create prisma directory and schema.prisma
- Create prisma/schema.prisma file with the model definitions listed in Section 4 (paste exact schema).
- Create prisma/seed.ts with seed logic to create categories, a few menu items, and admin user hashed with bcryptjs.

Step 4: Create backend skeleton
- Create folder backend/ and run:
  ```
  cd backend
  npm init -y
  ```
- Create backend/package.json with scripts and dependencies (exact content below).
- Install backend dependencies:
  ```
  npm install express@4.18.2 cors@2.8.5 helmet@7.0.0 dotenv@16.0.3 prisma@5.8.0 @prisma/client@5.8.0 sqlite3@5.1.6 jsonwebtoken@9.0.2 bcryptjs@2.4.3 zod@3.21.4 winston@4.8.2 csv-writer@1.6.0
  npm install -D typescript@5.2.2 ts-node-dev@2.0.0 @types/express@4.17.17 @types/node@20.4.2 jest@29.6.1 ts-jest@29.1.0 supertest@6.3.3 @types/jest@29.5.2 @types/supertest@2.0.12 eslint@8.45.0 eslint-config-airbnb-typescript@17.0.0 eslint-plugin-prettier@5.0.0 prettier@2.8.8
  ```
  (If network error, install manually using `npm install <pkg>@<ver>`)

Step 5: Setup backend TypeScript and Prisma
- Create backend/tsconfig.json (extend root tsconfig if you created one, otherwise new).
- Initialize Prisma:
  ```
  npx prisma generate
  npx prisma migrate dev --name init
  ```
- If running for first time, set environment variable in backend/.env (copy from root .env.example).

Step 6: Implement backend config module
- File: backend/src/config/config.ts
- Content: read process.env, parse port as number, throw new Error if DATABASE_URL or JWT_SECRET missing.
- Add types and export config object.

Step 7: Implement backend logger
- File: backend/src/utils/logger.ts
- Use Winston createLogger with transports and log levels: debug/info/warn/error.

Step 8: Implement app.ts
- File: backend/src/app.ts
- Create createApp() function which creates Express app, uses helmet, cors(config.ALLOW_ORIGIN), express.json(), loads routes, error middleware. Export createApp.

Step 9: Implement server.ts and index.ts
- server.ts starts app, listens to config.PORT, handles SIGINT and SIGTERM gracefully.
- index.ts imports createApp and startServer then start.

Step 10: Implement prisma seed
- File: prisma/seed.ts (executed via npm script backend: `prisma db seed`)
- It should use @prisma/client to create categories, sample menu items, and admin user with bcrypt hash.
- Script: backend/package.json -> "migrate:dev": "prisma migrate dev --name init && ts-node ./prisma/seed.ts"

Step 11: Implement middlewares
- Files:
  - backend/src/middlewares/auth.middleware.ts (JWT verify using config.JWT_SECRET)
  - backend/src/middlewares/validate.middleware.ts (wrap zod parsing)
  - backend/src/middlewares/error.middleware.ts (map custom errors to HTTP codes)
- Use express types.

Step 12: Implement Prisma repositories
- files under backend/src/repositories/*.repo.ts
- Use prisma client (import { PrismaClient } from '@prisma/client'; const prisma = new PrismaClient();)
- Provide functions listed in Section 5 for menu, orders, reservations, contact.

Step 13: Implement services
- Files backend/src/services/*service.ts
- Implement business logic: createOrder checks menu availability (call menu.repo), sums total_cents, verifies pickup_time, then in prisma transaction create Order with OrderItems snapshotting name/price.

Step 14: Implement controllers
- Files backend/src/controllers/*.controller.ts
- Use validate middleware for incoming requests (Zod schemas).
- Example: order.controller.postOrder extracts validated body, calls order.service.createOrder, returns 201 JSON.

Step 15: Implement admin logic and routes
- backend/src/controllers/admin.controller.ts: login endpoint authenticates against AdminUser model (compare bcrypt hash), returns JWT signed with config.JWT_SECRET (expiresIn 1h).
- Implement admin routes with adminAuthMiddleware.

Step 16: Implement routes files
- backend/src/routes/public.routes.ts and admin.routes.ts; wire to app in app.ts.

Step 17: Implement tests for backend
- Unit tests under backend/tests/unit (jest + ts-jest).
- Integration tests under backend/tests/integration using supertest to run endpoints against createApp(). Provide test DB (SQLite file in memory or separate test DB). Add test scripts in backend/package.json:
  - "test": "jest --passWithNoTests"

Step 18: Implement frontend skeleton
- Create frontend folder and run:
  ```
  cd frontend
  npm init vite@latest . --template react-ts
  npm install
  ```
- Adjust dependencies to the exact versions from Section 2:
  ```
  npm install react@18.2.0 react-dom@18.2.0 react-router-dom@6.14.1 axios@1.4.0 tailwindcss@3.4.6
  npm install -D @testing-library/react@14.0.0
  ```

Step 19: Implement frontend pages & components
- Create files in frontend/src per file structure. Implement API service (axios) that targets http://localhost:4000/api and contains helper to attach admin token to Authorization.

Step 20: Implement frontend state for cart
- Simple React Context (CartContext) that persists in localStorage and exposes add/remove/set quantity methods.

Step 21: Implement admin pages in frontend
- AdminLogin.tsx posts to /api/admin/login and stores token in localStorage; AdminDashboard.tsx calls admin endpoints to manage menu/orders/reservations.

Step 22: Add client-side validation
- Use simple validation for forms and show friendly error messages. For date/time ensure timezone handling (use ISO 8601 via input type="datetime-local" -> convert to UTC before sending).

Step 23: Add linting & Prettier config
- Create .eslintrc.js and .prettierrc with rules consistent across backend and frontend.

Step 24: Configure scripts to run both apps
- Create scripts/start-local.ps1 to run backend and frontend concurrently in separate shells:
  - start backend: `npm --prefix backend run dev` (ts-node-dev)
  - start frontend: `npm --prefix frontend run dev` (vite)

Step 25: Run migrate & seed and start dev
- Run:
  ```
  npm run install:all
  npm run migrate-and-seed
  npm run dev
  ```
- Validate: Browse http://localhost:5173 (Vite default) for frontend. Ensure API calls to http://localhost:4000 succeed.

Step 26: Implement CSV export
- Admin endpoint uses csv-writer to stream orders between date range (backend/src/utils/csvExporter.ts) and sends Content-Type text/csv.

Step 27: Add unit & integration tests coverage and CI commands
- Add test scripts and ensure CI can run `npm run test` from root or per workspace.

Step 28: Document everything in docs/api.md and docs/architecture.md
- Insert full endpoint examples (copy Section 6), DB ER diagram notes, security and scaling tips.

Validation checkpoints
- After Step 10: run prisma generate and migrations successfully.
- After Step 17: run backend tests and confirm passing.
- After Step 25: user should be able to navigate site, place a test order, create reservation, log in as admin and see the created records.

---

## 8. ERROR HANDLING & VALIDATION

Exception hierarchy (backend)
- Base class: AppError extends Error { statusCode: number; code: string; details?: any; }
  - ValidationError extends AppError { statusCode = 400; code = 'VALIDATION_ERROR' }
  - NotFoundError extends AppError { statusCode = 404; code = 'NOT_FOUND' }
  - UnauthorizedError extends AppError { statusCode = 401; code = 'UNAUTHORIZED' }
  - ConflictError extends AppError { statusCode = 409; code = 'CONFLICT' }
  - InternalServerError (default) -> 500

Input validation
- Use Zod schemas for all request bodies and parameters.
- Middleware validateSchema(schema, 'body') returns 400 details with path and message on error.

Error Messages (user-friendly)
- Example: If createOrder failed because menu item missing:
  {
    "error": "NotFoundError",
    "details": [{ "path": "items[0].menuItemId", "message": "Menu item with id 12 not found" }]
  }

Logging strategy
- Log levels:
  - info: server startup, requests summary (optionally in dev)
  - warn: recoverable issues (validation warnings)
  - error: stack traces, DB errors, unhandled exceptions
- Use Winston; logs written to console. In production optionally extend to file transports or cloud log aggregator.

Recovery mechanisms
- For transient DB errors: retry logic at service layer where appropriate (simple retry with 3 attempts for prisma queries).
- For failing seed or migration: abort and log with actionable messages.

Edge-case error examples
- Duplicate category name: return 409 Conflict with message "Category already exists".
- Reservation outside hours: 400 with "Reservations are accepted between 08:00 and 22:00".
- Order items empty: 400 "Order items cannot be empty".

---

## 9. TESTING STRATEGY

Test framework
- Backend: Jest@29.6.1 + ts-jest@29.1.0 + supertest@6.3.3
- Frontend: @testing-library/react@14.0.0 + jest (or Vite test runner if preferred)

Coverage target
- Aim for >= 80% unit test coverage for backend critical services; frontend aim for 60-70% for critical components.

Unit tests (backend)
- Test functions:
  - menu.service.getAllMenuItems -> test returns seeded items.
  - order.service.createOrder -> tests:
    - test_createOrder_valid_input_returns_order
    - test_createOrder_with_unavailable_item_throws_validation_error
    - test_createOrder_empty_items_throws_validation_error
  - reservation.service.createReservation:
    - test_future_date_creates_reservation
    - test_past_date_throws_validation_error
- Test files: backend/tests/unit/menu.service.spec.ts, order.service.spec.ts

Integration tests (backend)
- Use supertest to call createApp() and test endpoints:
  - test_public_get_menu_returns_200
  - test_post_order_returns_201_and_creates_db_entry
  - test_admin_login_and_protected_routes: login -> token -> access admin routes
- Files: backend/tests/integration/public.routes.spec.ts, admin.routes.spec.ts

Test fixtures
- Use prisma to seed an in-memory SQLite DB or test DB file `prisma/test.db`.
- For each test suite, beforeAll run prisma migrate and seed; afterAll drop connections.

Mocking strategy
- Services that send external emails or notifications should be mocked (none are in current scope).
- For in-memory test isolation, use a test database URL like `file:./test.db` and run migrations per test run.

Frontend tests
- Test components:
  - Header.spec.tsx -> shows correct nav links
  - MenuList.spec.tsx -> displays menu items when mocked API returns data
  - Cart.spec.tsx -> add/remove items updates totals
- Use msw (mock service worker) if available, or jest fetch mocks to simulate API responses.

Continuous testing
- Add `npm test` script at root which runs backend and frontend tests sequentially.

---

## 10. CONFIGURATION & ENVIRONMENT

Environment variables (backend .env)
- Place backend application config in backend/.env (but check .gitignore).
- .env.example (exact content):

```
# Database
DATABASE_URL="file:./dev.db"

# Server
PORT=4000
NODE_ENV=development
ALLOW_ORIGIN="http://localhost:5173"

# Auth
JWT_SECRET="replace_this_with_a_long_secret"
ADMIN_USERNAME="admin"
# Optionally set ADMIN_PASSWORD_HASH to predefined hash produced by bcryptjs.hashSync(password, 10)
ADMIN_PASSWORD_HASH="(optional, seeded if not present will use default from seed script)"

# Logging
LOG_LEVEL=debug
```

Default values and secrets management
- For local dev: seed script will create admin user with username 'admin' and password 'adminpass' if ADMIN_PASSWORD_HASH is not present (seed logs warning to change password).
- In production: set ADMIN_PASSWORD_HASH and JWT_SECRET to secure secrets. Use secret management (Azure Key Vault, AWS Secrets Manager) in real deployments.

Configuration files
- backend/src/config/config.ts reads env and exports typed object.
- Also allow override via process.env.* for flexible deployments.

---

## 11. USAGE EXAMPLES & DOCUMENTATION

Installation steps (exact commands for Windows PowerShell)
1. Clone repo:
   ```
   cd "C:\Users\balas\Documents\Projects"
   git clone <repo-url> cofweb
   cd cofweb
   ```
2. Install dependencies for both packages:
   ```
   npm run install:all
   ```
3. Configure environment:
   - Copy .env.example to backend/.env and edit as needed:
     ```
     copy .env.example backend\.env
     ```
4. Run migrations and seed:
   ```
   npm run migrate-and-seed
   ```
   (This runs `npm --prefix backend run migrate:dev` which executes Prisma migration and seed.)
5. Start application:
   ```
   npm run dev
   ```
   - This runs scripts/start-local.ps1 which starts backend on port 4000 and frontend on port 5173.

Basic usage (expected behavior)
- Open http://localhost:5173 in browser.
- Home page shows coffee shop hero, "View Menu".
- Click Menu -> list of menu items loaded from GET /api/menu.
- Add items to cart -> open Cart -> proceed to checkout -> fill contact details & pickup time -> submit -> receives Order confirmation with orderId and estimated pickup.

Example API curl
- Login admin:
  ```
  curl -X POST http://localhost:4000/api/admin/login -H "Content-Type: application/json" -d "{\"username\":\"admin\",\"password\":\"adminpass\"}"
  ```
  Response:
  { "token": "<JWT>", "expiresIn": 3600 }

- Create a reservation:
  ```
  curl -X POST http://localhost:4000/api/reservations -H "Content-Type: application/json" -d "{\"name\":\"Jane\",\"phone\":\"+123456\",\"party_size\":2,\"date_time\":\"2025-12-25T19:00:00Z\"}"
  ```

Expected output (order flow)
- After successful POST /api/orders:
  {
    "orderId": 1,
    "estimatedPickup": "2025-12-25T15:30:00Z",
    "status": "pending"
  }

---

## 12. EDGE CASES & CONSIDERATIONS

Known limitations
- No payment gateway implemented; orders assumed paid on pickup or cash.
- Only one admin user seeded by default; multi-admin roles not implemented.
- SQLite is appropriate for dev and small production but not for high concurrency. Recommend PostgreSQL for production.

Performance considerations
- Avoid SELECT N+1 by using Prisma relations with include.
- Implement basic pagination for admin listing endpoints if data large.
- Cache static public endpoints (menu) using CDN or server-side caching for performance under load.

Security considerations
- Always set strong JWT_SECRET and rotate periodically.
- Hash admin passwords with bcryptjs with salt rounds=10.
- Use helmet for secure headers.
- Validate and sanitize all user input with Zod; prevent SQL injection via ORM (Prisma).
- Rate-limit public endpoints to prevent abuse (not implemented here; recommended middleware like express-rate-limit).

Scalability
- Swap SQLite to PostgreSQL in Prisma: change datasource URL and run migrations; Prisma is DB-agnostic.
- Split backend and frontend into separate deploy units (Docker containers).
- Use a managed database and caching layer (Redis) for stateful scaling.

Edge cases to handle
- Customer submits pickup_time in the past -> reject 400.
- Simultaneous updates to menu (admin) while order creation uses stale availability -> enforce atomic check + transaction; if item becomes unavailable during check, throw 409.
- Reservation conflicts (overbooking at same time) -> optionally implement capacity checks (out of scope but note).

---

## ADDITIONAL FILE CONTENT EXAMPLES (SAMPLE SNIPPETS)

Example backend/src/controllers/order.controller.ts (signature & example)
```ts
// backend/src/controllers/order.controller.ts
import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import * as orderService from '../services/order.service';

export const createOrderSchema = z.object({
  customer_name: z.string().min(1),
  phone: z.string().min(6),
  email: z.string().email().optional(),
  pickup_time: z.string().refine(val => !isNaN(Date.parse(val)), { message: 'Invalid ISO date' }),
  items: z.array(z.object({ menuItemId: z.number().int().positive(), quantity: z.number().int().min(1) })).min(1)
});

export async function postOrder(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const parsed = createOrderSchema.parse(req.body);
    const result = await orderService.createOrder(parsed);
    res.status(201).json({ orderId: result.id, estimatedPickup: result.pickup_time.toISOString(), status: result.status });
  } catch (err) {
    next(err);
  }
}
```

Example Type for createOrder
```ts
export type OrderInput = {
  customer_name: string;
  phone: string;
  email?: string;
  pickup_time: string; // ISO 8601
  items: { menuItemId: number; quantity: number }[];
};
```

---

## QUALITY CHECKLIST (Verification against requirements)
- All file names are exact in the file tree section.
- All library versions specified in Section 2.
- Function signatures and types are provided for main modules (TypeScript used everywhere).
- Public module purposes specified.
- Implementation steps numbered and sequential (28 steps).
- Error handling strategies and custom exceptions described.
- Concrete test cases and file targets provided.
- Configuration (.env.example) provided.
- Documentation and usage examples included.

---

If you want I can:
- Produce the exact content for each file (complete file-by-file source) and place it in a single zip or repo layout ready to paste.
- Generate the Prisma schema, seed script, and example controller/service code for all files (this will be a long output but I can generate it next).

This document is meant to let a developer implement the project exactly as specified, using the file tree, dependencies, API definitions, database schema, and step-by-step implementation plan above.