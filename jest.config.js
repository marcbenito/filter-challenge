module.exports = {
  reporters: ['default'],
  collectCoverage: true,
  collectCoverageFrom: ['./src/**/*.js'],
  coverageReporters: ['json', 'text', 'clover', 'html'],
  coverageDirectory: './coverage',
};
