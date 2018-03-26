const { default: Searchable, isSearchable } = require("../src/index");

describe("isSearchable", () => {
  test("Is a function", () => {
    expect(typeof isSearchable).toBe("function");
  });
  test("Yields a boolean", () => {
    expect(isSearchable("x")).toBe(false);
    expect(isSearchable(Searchable("x"))).toBe(true);
  });
});
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
    test("Creates a Searchable", () => {
      expect(isSearchable(Searchable.of("x", "y", "z"))).toBe(true);
    });
  });
  describe("from", () => {
    test("Is a function", () => {
      expect(typeof Searchable.from).toBe("function");
    });
    test("Creates a Searchable", () => {
      expect(isSearchable(Searchable.from(["x", "y", "z"])));
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
        isSearchable(Searchable(["x", "y", "z"]).map(x => x.toUpperCase()))
      ).toBe(true);
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
        isSearchable(Searchable(["x", "y", "z"]).filter(x => x > "x"))
      ).toBe(true);
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
  describe("fold", () => {
    test("Is a function", () => {
      expect(typeof Searchable(["x", "y", "z"]).fold).toBe("function");
    });
    test("Returns the result of applying the collection to the given function", () => {
      const collection = ["x", "y", "z"];
      const searchable = Searchable(collection);

      expect(searchable.fold(x => x)).toEqual(collection);
      expect(searchable.fold(x => x.map(a => a.toUpperCase()))).toEqual([
        "X",
        "Y",
        "Z"
      ]);
    });
  });
});
