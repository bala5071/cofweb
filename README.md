# CofWeb — Coffee Shop Web Platform

CofWeb is a full-stack, TypeScript-based coffee shop web application that provides a customer-facing storefront (menu, ordering, reservations, contact) and a secure admin backend for managing menu items, orders, reservations, and messages. The project is designed to be developer-friendly, local-first, and easy to deploy in a container or small VM.

🚀 Key features
- Public menu browsing (categories and items)
- Pickup ordering flow (no payment gateway)
- Reservations with date/time and party size
- Contact messages persisted to DB
- Admin panel with JWT authentication to manage menu, view orders/reservations, export CSV

Tech stack
- Node.js 20.x, TypeScript
- Backend: Express, Prisma (SQLite for dev), Zod validation
- Frontend: React + Vite + TypeScript, Tailwind CSS
- Auth: JWT (jsonwebtoken) and bcryptjs
- Logging: winston
- Testing: Jest, supertest, React Testing Library

Getting started (Windows PowerShell)
1. Install Node.js 20.x and npm
2. Install all dependencies:
   ```powershell
   npm run install:all
   ```
3. Copy environment template and edit as needed:
   ```powershell
   copy .env.example backend\.env
   ```
4. Run database migration and seed:
   ```powershell
   npm run migrate-and-seed
   ```
5. Start both apps locally:
   ```powershell
   npm run dev
   ```

Backend API
- Base URL: http://localhost:4000/api
- See docs/api.md for full API reference and examples.

Development notes
- The project uses Prisma and a SQLite database for easy local development.
- Admin credentials are created by the seed script. Change the default password immediately in production.

Contributing
- Please read CONTRIBUTING.md for guidelines.

License
- MIT
