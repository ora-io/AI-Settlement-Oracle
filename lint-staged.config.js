/** @type {import('lint-staged').Config} */
export default {
  '**/*.(ts|tsx)': () => 'npx tsc --noEmit',
  '**/*.(ts|tsx|js|jsx)': [`npm run lint`, `npm run lint:prettier`],
  '**/*.(md|json)': 'npx prettier --write'
};
