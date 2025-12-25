# Node version guidance for cofweb

This file documents what the repository's check and postinstall scripts do and how to recover from Node version issues.

If you run into errors on machines with Node 22.x (native modules like sqlite3 or Prisma binary mismatches), choose one of the following:

Option A — Use Node 20 (recommended)
1. Install nvm or nvm-windows.
2. From repo root:
   - nvm install 20.5.0
   - nvm use 20.5.0
3. Confirm: `node -v`  # should print v20.5.0
4. Re-run install: `npm run install:all`

Option B — Stay on Node 22 (try to rebuild native modules)
1. From repo root after `npm run install:all` run:
   - `npm --prefix backend rebuild sqlite3 --build-from-source`
   - `npm rebuild`
   - `npx prisma generate`
2. If you get compilation errors for sqlite3, install platform build tools (Windows: Visual Studio Build Tools), then re-run the previous commands.

Scripts included in this repo:
- `scripts/check-node.js` — prints guidance at `npm install` time (non-blocking).
- `scripts/postinstall-rebuild.js` — attempts to automatically rebuild sqlite3 and run prisma generate on Node >= 22.

If you still hit errors, run the reported commands above and paste the error output to the issue tracker for help.
