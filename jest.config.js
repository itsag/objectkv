module.exports = {
  testEnvironment: "node",
  transformIgnorePatterns: ["node_modules/(?!variables/.*)"],
  coverageReporters: ["lcov"],
  collectCoverage: true,
};
