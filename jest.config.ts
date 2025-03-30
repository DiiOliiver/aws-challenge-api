export default {
  preset: "ts-jest",
  testEnvironment: "node",
  clearMocks: true,
  coverageDirectory: "coverage",
  testMatch: ["**/tests/**/*.test.ts"],
  transform: {
    "^.+\\.ts$": "ts-jest"
  }
};
