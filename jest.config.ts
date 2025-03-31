export default {
  preset: "ts-jest",
  testEnvironment: "node",
  clearMocks: true,
  coverageDirectory: "coverage",
  testMatch: ["**/tests/**/*.test.ts"],
  transform: {
    "^.+\\.ts$": "ts-jest"
  },
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/src/config/",
    "/src/migrations/",
    "/src/middlewares/",
    "/src/helpers/",
    "/src/errors/",
    "/src/server.ts",
    "/src/app.ts"
  ],
};
