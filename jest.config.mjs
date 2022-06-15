export default {
  "moduleNameMapper": {
    "@/(.*)": "<rootDir>/src/$1"
  },
  roots: ['<rootDir>/src'],
  testMatch: [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)"
  ],
  transform: {
    "^.+\\.(ts|js|tsx|jsx)$": "@swc/jest",
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/bignumber.js/.*'],
}
