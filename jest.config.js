module.exports = {
  roots: ['<rootDir>/src'],

  preset: '@shelf/jest-mongodb',

  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/main/**',
    '!<rootDir>/src/**/*-protocols.ts',
    '!**/protocols/**',
    '!**/test/**',
  ], // ira testar todo arquivo dentro de src e que seja .ts

  coverageDirectory: 'coverage',
  coverageProvider: 'babel',

  testEnvironment: 'node',

  transform: { '.+\\.ts$': 'ts-jest' },
}
