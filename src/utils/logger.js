// Simple logger utility
export const logger = {
  info: (msg) => console.log(`ℹ  ${msg}`),
  warn: (msg) => console.warn(`  ${msg}`),
  error: (msg) => console.error(` ${msg}`),
};
  