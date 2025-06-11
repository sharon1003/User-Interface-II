# Nail Salon

Group Members:
Chih-Yen Lu, Kenneth Kuan Phing Ong, Ngan Ha Pham, Wen-Hsuan Peng 

## Description:
We are building a web application for custom nail design. It allows customers to personalize their own nail sets by choosing styles, colors, patterns, and decorations. 

## Why React + TypeScript + Vite
- `React` helps us structure the app using reusable components like shape selectors, Product description and preview panels.
- We’re using `TypeScript` instead of plain React with JavaScript because it helps us catch bugs early and write more maintainable code.
- `Vite` helps us develop React apps faster by providing fast startup and instant reloads, making it ideal for small to medium-sized projects.



## React + TypeScript + Vite

Documentation: https://docs.google.com/document/d/1-VjTBhpau3MdoxlTprDzaQxEjBLGBtSE9d5knW4P2dA/edit?tab=t.0

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    "react-x": reactX,
    "react-dom": reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs["recommended-typescript"].rules,
    ...reactDom.configs.recommended.rules,
  },
});
```
