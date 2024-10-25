import { add } from "../src/utils";

jest.mock("../src/config", () => ({
  debug: true,
}));

it("should add two numbers", () => {
  expect(add(1, 2)).toBe(3);
});
