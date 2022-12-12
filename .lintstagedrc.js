module.exports = {
  '**/*.{js,ts}': ['yarn prettier --write', 'yarn eslint src/**/*.ts'],
}
