/* eslint-env node */

// https://jestjs.io/docs/configuration
module.exports = {
	collectCoverage: true,
	coverageDirectory: "coverage",
	coverageProvider: "v8",
	testEnvironment: "jsdom",
	testMatch: ["**/dist/**/*.js?(x)"],
	testPathIgnorePatterns: ["<rootDir>/dist/config"],
	setupFilesAfterEnv: ["<rootDir>/dist/config/jest-setup.js"],
	resetMocks: true,
	restoreMocks: true,
};
