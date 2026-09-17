/** @type {import("prettier").Config} */
export default {
  plugins: ["prettier-plugin-astro"],
  printWidth: 100,
  singleQuote: false,
  overrides: [{ files: "*.astro", options: { parser: "astro" } }],
};
