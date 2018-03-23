const Searchable = require("../src/index").default;

describe("Searchable", () => {
  describe("inspect", () => {
    test("Is a function", () => {
      expect(typeof Searchable(["x", "y", "z"]).inspect).toBe("function");
    });
    test("Yields a string", () => {
      expect(typeof Searchable(["x", "y", "z"]).inspect()).toEqual("string");
    });
  });
  describe("of", () => {
    test("Is a function", () => {
      expect(typeof Searchable.of).toBe("function");
    });
    test("Creates a Searchable where the value is an array containing the arguments", () => {
      expect(Searchable.of("x", "y", "z").inspect()).toEqual(
        'Searchable(["x","y","z"])'
      );
    });
  });
  describe("from", () => {
    test("Is a function", () => {
      expect(typeof Searchable.from).toBe("function");
    });
    test("Creates a Searchable where the value is the first argument", () => {
      expect(Searchable.from(["x", "y", "z"]).inspect()).toEqual(
        'Searchable(["x","y","z"])'
      );
      expect(Searchable.from({ x: "X", y: "Y", z: "Z" }).inspect()).toEqual(
        'Searchable({"x":"X","y":"Y","z":"Z"})'
      );
    });
  });
  describe("results", () => {
    test("Is a function", () => {
      expect(typeof Searchable(["x", "y", "z"]).results).toBe("function");
    });
    test("Always unwraps the collection", () => {
      const arr = ["x", "y", "z"];
      expect(Searchable(arr).results()).toBe(arr);
      expect(Searchable(arr).results(x => x.toUpperCase())).toBe(arr);
      expect(Searchable(arr).results("a")).toBe(arr);
    });
  });
  describe("map", () => {
    test("Is a function", () => {
      expect(typeof Searchable(["x", "y", "z"]).map).toBe("function");
    });
    test("Returns a Searchable", () => {
      expect(
        Searchable(["x", "y", "z"])
          .map(x => x.toUpperCase())
          .inspect()
      ).toEqual('Searchable(["X","Y","Z"])');
    });
    test("Can map value", () => {
      expect(
        Searchable(["x", "y", "z"])
          .map(x => x.toUpperCase())
          .results()
      ).toEqual(["X", "Y", "Z"]);
    });
    test("Can map index", () => {
      expect(
        Searchable(["x", "y", "z"])
          .map((v, index) => index)
          .results()
      ).toEqual([0, 1, 2]);
    });
  });
  describe("filter", () => {
    test("Is a function", () => {
      expect(typeof Searchable(["x", "y", "z"]).filter).toBe("function");
    });
    test("Returns a Searchable", () => {
      expect(
        Searchable(["x", "y", "z"])
          .filter(x => x > "x")
          .inspect()
      ).toEqual('Searchable(["y","z"])');
    });
    test("Can filter with value", () => {
      expect(
        Searchable(["x", "y", "z"])
          .filter(x => x > "x")
          .results()
      ).toEqual(["y", "z"]);
    });
    test("Can filter with index", () => {
      expect(
        Searchable(["x", "y", "z"])
          .filter((v, index) => index > 1)
          .results()
      ).toEqual(["z"]);
    });
  });
});
