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
};
