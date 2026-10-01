import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

// R3F pakai <mesh>, <group>, <ambientLight> dll — itu bukan DOM.
// Rule react/no-unknown-property tidak ada di config ini, jadi sengaja TIDAK diaktifkan.
// Dummy plugin di bawah cuma buat bungkam VS Code yang masih nge-cache rule lama.
const dummyReact = {
  rules: {
    'no-unknown-property': {
      meta: { type: 'problem', docs: { description: 'dummy for R3F' } },
      create() { return {} },
    },
  },
}

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    plugins: { react: dummyReact },
    rules: {
      'react/no-unknown-property': 'off',
    },
  },
])
