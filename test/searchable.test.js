const {
  Searchable,
  isSearchable,
  standardQuery,
  looseQuery,
  strictQuery
} = require("../src/index");

const MOVIES = [
  {
    title: "Back to the Future",
    director: "Robert Zemeckis",
    year: 1985,
    cast: ["Michael J. Fox", "Christopher Lloyd", "Lea Thompson"]
  },
  {
    title: "Star Wars: Episode V - The Empire Strikes Back",
    director: "Irvin Kershner",
    year: 1980,
    cast: ["Mark Hamill", "Harrison Ford", "Carrie Fisher"]
  }
];

function MappableObject(value) {
  this.value = value;
}
MappableObject.prototype.map = f =>
  Object.keys(this.value).reduce(
    (acc, x) => ({ ...acc, [x]: f(this.value[x]) }),
    {}
  );
MappableObject.prototype.filter = f =>
  Object.keys(this.value).reduce(
    (acc, x) => (f(this.value[x]) ? { ...acc, [x]: this.value[x] } : acc),
    {}
  );

describe("isSearchable", () => {
  test("Is a function", () => {
    expect(typeof isSearchable).toBe("function");
  });
  test("Yields a boolean", () => {
    expect(isSearchable("x")).toBe(false);
    expect(isSearchable(Searchable("x"))).toBe(true);
  });
});
describe("standardQuery", () => {
  test("Is a function", () => {
    expect(typeof standardQuery).toBe("function");
  });
  test("Returns an object with the correct data", () => {
    const query = standardQuery("x");
    expect(query.searchTerm).toEqual("x");
    expect(typeof query.fuzziness).toBe("number");
    expect(typeof query.minScore).toBe("number");
    expect(typeof query.shouldScoreValue).toBe("function");
  });
});
describe("looseQuery", () => {
  test("Is a function", () => {
    expect(typeof looseQuery).toBe("function");
  });
  test("Returns an object with the correct data", () => {
    const query = looseQuery("x");
    expect(query.searchTerm).toEqual("x");
    expect(typeof query.fuzziness).toBe("number");
    expect(typeof query.minScore).toBe("number");
    expect(typeof query.shouldScoreValue).toBe("function");
  });
});
describe("strictQuery", () => {
  test("Is a function", () => {
    expect(typeof strictQuery).toBe("function");
  });
  test("Returns an object with the correct data", () => {
    const query = strictQuery("x");
    expect(query.searchTerm).toEqual("x");
    expect(typeof query.fuzziness).toBe("number");
    expect(typeof query.minScore).toBe("number");
    expect(typeof query.shouldScoreValue).toBe("function");
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
  describe("search", () => {
    test("Is a function", () => {
      expect(typeof Searchable(["x", "y", "z"]).search).toBe("function");
    });
    test("Accepts a string", () => {
      expect(Searchable(["x", "y", "z"]).search("x")).not.toThrow();
    });
    test("Accepts an object", () => {
      const query = {
        searchTerm: "x",
        fuzziness: 0.5,
        minScore: 0.2,
        shouldScoreValue: () => true
      };
      expect(Searchable(["x", "y", "z"]).search(query)).not.toThrow();
    });
    test("Returns a Searchable of the same type where the data is filtered", () => {
      let result = Searchable(["x", "y", "z"]).search("x");
      expect(isSearchable(result)).toBe(true);
      expect(Array.isArray(result.result)).toBe(true);
      expect(result.result).toEqual(["x"]);

      result = Searchable(
        new MappableObject({ x: "x", y: "y", z: "z" })
      ).search("x");
      expect(isSearchable(result)).toBe(true);
      expect(result.result instanceof MappableObject).toBe(true);
      expect(result.result).toEqual(new MappableObject({ x: "x" }));
    });
  });
});
