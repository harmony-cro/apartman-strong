import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'
import nextTypescript from 'eslint-config-next/typescript'

// Next 16 ships flat configs directly; FlatCompat (the old template setup)
// crashes on ESLint 9.39+ with "Converting circular structure to JSON".
const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  { ignores: ['.next/**', 'node_modules/**'] },
]

export default eslintConfig
