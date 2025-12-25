#!/usr/bin/env node
/**
 * scripts/postinstall-rebuild.js
 * - Attempt to rebuild native modules when Node >= 22
 * - Non-fatal: logs errors and continues
 */

const { execSync } = require('child_process');
const path = require('path');
const { checkNodeVersion } = require('./check-node');

function runCmd(cmd, opts = {}) {
  console.log(`> ${cmd}`);
  execSync(cmd, { stdio: 'inherit', ...opts });
}

async function main() {
  try {
    const check = checkNodeVersion();
    if (typeof check.major === 'number' && check.major >= 22) {
      console.warn('Node >=22 detected: attempting to rebuild native modules for backend (sqlite3).');
      try {
        // Rebuild sqlite3 inside backend workspace
        runCmd('npm --prefix backend rebuild sqlite3 --build-from-source');
      } catch (e) {
        console.warn('Rebuild sqlite3 failed, trying generic npm rebuild:', e && e.message ? e.message : e);
        try {
          runCmd('npm rebuild');
        } catch (e2) {
          console.warn('Generic npm rebuild also failed:', e2 && e2.message ? e2.message : e2);
        }
      }

      // Try to regenerate prisma client (safe if prisma installed)
      try {
        // Use npx with --yes for non-interactive
        runCmd('npx --yes prisma generate');
      } catch (e) {
        console.warn('prisma generate failed (npx may not be available). If prisma client errors, run "npx prisma generate" manually.');
      }
    } else {
      console.log('Node <22 detected or recommended Node 20: no special postinstall rebuild needed.');
    }
  } catch (err) {
    console.warn('postinstall-rebuild encountered an error, continuing:', err && err.message ? err.message : err);
  }
}

if (require.main === module) {
  main();
}

module.exports = { main };
