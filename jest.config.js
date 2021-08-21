const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig.paths.json');

const aliasResolve = Object.entries(
    pathsToModuleNameMapper(compilerOptions.paths),
).reduce((accumulator, currentValue) => {
    const [key, value] = currentValue;
    const caractere = value.charAt(0) === '.' ? 1 : 0;

    accumulator[key] = `<rootDir>${value.substring(caractere)}`;

    return accumulator;
}, {});

module.exports = {
    roots: ['<rootDir>/src'],
    collectCoverageFrom: [
        '<rootDir>/src/**/*.{ts,tsx}',
        '!<rootDir>/src/main/**/*',
        '!<rootDir>/src/**/index.ts',
        '!**/*.d.ts',
    ],
    coverageDirectory: 'coverage',
    setupFilesAfterEnv: ['@testing-library/jest-dom'],
    testPathIgnorePatterns: [
        '<rootDir>/node_modules/',
        '<rootDir>/src/main/test/cypress',
    ],
    testEnvironment: 'jsdom',
    transform: {
        '.+\\.(ts|tsx)$': 'ts-jest',
    },
    preset: 'ts-jest',
    moduleNameMapper: {
        ...aliasResolve,
    },
};