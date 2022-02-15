module.exports = {
  roots: ['<rootDir>/src'],

  collectCoverageFrom: ['<rootDir>/src/**/*.ts'], // ira testar todo arquivo dentro de src e que seja .ts

  coverageDirectory: 'coverage',
  coverageProvider: 'v8',

  testEnvironment: 'node',

  transform: { '.+\\.ts$': 'ts-jest' },
}
