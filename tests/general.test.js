const { OK } = require("../dist");

test("export constants", () => {
  expect(OK).toBe(200);
});
