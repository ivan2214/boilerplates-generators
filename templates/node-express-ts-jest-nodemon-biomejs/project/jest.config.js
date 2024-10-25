module.exports = {
  // use ts-jest preset for testing typescript files with jest
  preset: "ts-jest",

  // set the test environment to nodejs
  testEnvironment: "node",

  // Define the root directoyry for tests and modules
  roots: ["<rootDir>/tests"],

  // use ts-jest to transform typescript files
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },

  //regular expression to find test files

  testRegex: "((\\.|/)(test|spec))\\.tsx?$",

  //file extensions to recognize in module resolution

  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],

  // aliases for modules

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@controllers/(.*)$": "<rootDir>/src/controllers/$1",
    "^@services/(.*)$": "<rootDir>/src/services/$1",
    "^@utils/(.*)$": "<rootDir>/src/utils/$1",
    "^@middlewares/(.*)$": "<rootDir>/src/middlewares/$1",
    "^@models/(.*)$": "<rootDir>/src/models/$1",
    "^@routes/(.*)$": "<rootDir>/src/routes/$1",
    "^@config/(.*)$": "<rootDir>/src/config/$1"
  }

};
