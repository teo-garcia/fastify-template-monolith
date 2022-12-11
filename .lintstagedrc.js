module.exports = {
  '**/*.{js,ts}': [
    'bash -c tsc --noEmit"',
    'yarn prettier --write',
    'yarn eslint src/**/*.ts',
  ],
}
