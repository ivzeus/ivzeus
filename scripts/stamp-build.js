#!/usr/bin/env node
// stamps the __BUILD_TIME__ placeholder in index.html with the current timestamp
const fs = require('fs');
const path = require('path');

const TARGET = path.resolve(__dirname, '..', 'index.html');
const PLACEHOLDER = '__BUILD_TIME__';

function formatDate(d) {
  // YYYY-MM-DD HH:MM:SS
  const pad = (n) => (n < 10 ? '0' + n : '' + n);
  return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()) + ' ' + pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds());
}

try {
  let html = fs.readFileSync(TARGET, 'utf8');
  if (!html.includes(PLACEHOLDER)) {
    console.error('Placeholder not found in', TARGET);
    process.exit(1);
  }
  const now = new Date();
  const stamp = formatDate(now) + ' (build)';
  const updated = html.replace(new RegExp(PLACEHOLDER, 'g'), stamp);
  fs.writeFileSync(TARGET, updated, 'utf8');
  console.log('Stamped build time into', TARGET);
} catch (err) {
  console.error('Error stamping build time:', err.message);
  process.exit(1);
}
