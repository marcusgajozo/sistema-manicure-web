/** @type {import('lint-staged').Configuration} */
const config = {
  "*.{js,jsx,ts,tsx,mjs,cjs}": [
    "eslint --fix --no-warn-ignored",
    "prettier --write",
  ],
  "*.{json,md,css,html,yml,yaml}": "prettier --write",
};

export default config;
