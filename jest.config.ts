import type { Config } from "jest";

const path = require("path");

const config: Config = {
  preset: "ts-jest",
  // transform: {
  //   "^.+\\.ts?$": "ts-jest",
  // },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.ts?$",
  moduleFileExtensions: ["ts", "js", "json", "node"],
  collectCoverage: false,
  clearMocks: true,
  coverageDirectory: path.resolve(`${__dirname}/coverage`),
  verbose: true,
  testEnvironment: "node",
  testTimeout: 20000,
  // globalSetup: "./jest.global-setup.ts",
  // globalTeardown: "./jest.global-teardown.ts",
  // coverageThreshold: {
  //   global: {
  //     branches: 80,
  //     functions: 80,
  //     lines: 80,
  //     statements: 80,
  //   },
  // },
};

export default config;
