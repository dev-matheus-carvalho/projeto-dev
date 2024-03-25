// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
    roots: ['<rootDir>/src'],
    collectCoverageFrom: ['<rootDir>/src/**/*.ts', '!<rootDir>/src/**/*-protocols.ts', '!<rootDir>/src/main/**', '!**/protocols/**'],
    setupFiles: ['<rootDir>/src/environment.ts'],
    coverageDirectory: 'coverage',
    testEnvironment: 'node',
    transform: {
        '.+\\.ts$': 'ts-jest',
    },
};
