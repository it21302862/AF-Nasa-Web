module.exports = {
  testEnvironment: "jsdom",
  preset: 'jest-puppeteer',
  preset: "ts-jest",
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  "testMatch": ["**/__tests__/**/*.js", "**/?(*.)+(spec|test).js"]
};
