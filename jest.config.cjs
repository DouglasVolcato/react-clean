module.exports = {
  roots: ["<rootDir>/src"],
  collectCoverageFrom: ["<rootDir>/src/**/*.{ts,tsx}"],
  coverageDirectory: "coverage",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.scss$": "identity-obj-proxy",
  },
  transform: {
    "^.+\\.(t|j)sx?$": "ts-jest",
  },
};
