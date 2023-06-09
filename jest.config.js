module.exports = {
  testEnvironment: "node",
  transformIgnorePatterns: ["node_modules/(?!variables/.*)"],
  coverageReporters: ["clover", "json", "lcov", "text", "cobertura"],
  coveragePathIgnorePatterns: ["/node_modules/", "/jest"],
  collectCoverage: true,
};
