import nextPlugin from "@next/eslint-plugin-next";

export default [
  nextPlugin.configs["core-web-vitals"],
  {
    ignores: [".next/*", "node_modules/*"],
  },
];
