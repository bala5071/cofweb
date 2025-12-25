#!/usr/bin/env node
/**
 * scripts/check-node.js
 * - Detect Node version.
 * - Print friendly guidance for Node 22 users and Node 20 users.
 * - Export function for unit tests.
 */

function checkNodeVersion(overrideVersion) {
  const v = overrideVersion || process.version; // e.g. 'v22.1.0'
  const match = /^v?(\d+)\.(\d+)\.(\d+)/.exec(v);
  const major = match ? Number(match[1]) : NaN;
  let message = '';
  let status = 'ok';

  if (isNaN(major)) {
    message = `Could not parse Node version: ${v}. Recommended Node: 20.5.0 (use nvm to switch).`;
    status = 'warn';
    return { status, major: null, message };
  }

  if (major === 20) {
    message = `Detected Node ${v}. Recommended Node version for this repo is 20.5.0. Proceeding.`;
    status = 'ok';
    return { status, major, message };
  }

  if (major === 22) {
    message =
      `Detected Node ${v}. Node 22 can work but some native packages (sqlite3/prisma client binaries) ` +
      `might need to be rebuilt for Node 22. Recommended actions:\n` +
      `  1) Prefer using Node 20.5.0 via nvm/nvm-windows: 'nvm install 20.5.0 && nvm use 20.5.0'\n` +
      `  2) If you must use Node 22, after 'npm install' run 'npm --prefix backend rebuild sqlite3 --build-from-source' ` +
      `and/or 'npm rebuild' and then 'npx prisma generate'.\n` +
      `This script will not abort installation; it only provides guidance.`;
    status = 'warn';
    return { status, major, message };
  }

  // For other Node versions (older/newer)
  if (major < 20) {
    message = `Detected Node ${v}. This repository expects Node 20.x (20.5.0). Please upgrade Node or use nvm to switch.`;
    status = 'error';
    return { status, major, message };
  }

  // major > 22 e.g. future release
  message = `Detected Node ${v}. This repo targets Node 20.x. Use nvm to switch to Node 20.5.0 to ensure compatibility.`;
  status = 'warn';
  return { status, major, message };
}

if (require.main === module) {
  const result = checkNodeVersion();
  if (result.status === 'error') {
    console.error('ERROR:', result.message);
    // Do not abort install automatically; give the user the choice.
    process.exitCode = 0;
  } else if (result.status === 'warn') {
    console.warn('WARNING:', result.message);
    process.exitCode = 0;
  } else {
    console.log(result.message);
    process.exitCode = 0;
  }
}

module.exports = { checkNodeVersion };
