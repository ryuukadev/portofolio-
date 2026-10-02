import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

export default [
  ...nextVitals,
  ...nextTypescript,
  {
    rules: {
      "react/display-name": "off",
      "@next/next/no-img-element": "off",
    },
  },
  {
    ignores: ["my-3d-app/**", ".next/**", "node_modules/**"],
  },
];