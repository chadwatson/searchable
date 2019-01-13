import {
  Searchable,
  isSearchable,
  standardQuery,
  looseQuery,
  strictQuery
} from "../src";

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
  it("Is a function", () => {
    expect(typeof standardQuery).toBe("function");
  });
  it("Returns an object with the correct data", () => {
    const query = standardQuery("x");
    expect(query.searchTerm).toEqual("x");
    expect(typeof query.fuzziness).toBe("number");
    expect(typeof query.minScore).toBe("number");
    expect(typeof query.shouldScoreValue).toBe("function");
  });
});

describe("looseQuery", () => {
  it("Is a function", () => {
    expect(typeof looseQuery).toBe("function");
  });
  it("Returns an object with the correct data", () => {
    const query = looseQuery("x");
    expect(query.searchTerm).toEqual("x");
    expect(typeof query.fuzziness).toBe("number");
    expect(typeof query.minScore).toBe("number");
    expect(typeof query.shouldScoreValue).toBe("function");
  });
});

describe("strictQuery", () => {
  it("Is a function", () => {
    expect(typeof strictQuery).toBe("function");
  });
  it("Returns an object with the correct data", () => {
    const query = strictQuery("x");
    expect(query.searchTerm).toEqual("x");
    expect(typeof query.fuzziness).toBe("number");
    expect(typeof query.minScore).toBe("number");
    expect(typeof query.shouldScoreValue).toBe("function");
  });
});

describe("Searchable", () => {
  it("Has Searchable.Indexed", () => {
    expect(Searchable.Indexed).toBeDefined();
  });
  it("Has Searchable.Keyed", () => {
    expect(Searchable.Keyed).toBeDefined();
  });
  it("Creates a Searchable.Indexed when constructed with an array", () => {
    expect(Searchable(["x", "y", "z"]) instanceof Searchable.Indexed).toBe(
      true
    );
  });
  it("Creates a Searchable.Keyed when constructed with an object", () => {
    expect(
      Searchable({ x: "x", y: "y", z: "z" }) instanceof Searchable.Keyed
    ).toBe(true);
  });
});

describe("Searchable.Indexed", () => {
  describe("of", () => {
    it("Returns a Searchable.Indexed from the arguments", () => {
      expect(Searchable.Indexed.of("x", "y", "z")).toMatchSnapshot();
    });
  });
  describe("isIndexedSearchable", () => {
    it("Returns true if the argument is an instance of a Searchable.Indexed", () => {
      expect(Searchable.Indexed.isIndexedSearchable(["x", "y", "z"])).toBe(
        false
      );
      expect(
        Searchable.Indexed.isIndexedSearchable({ x: "x", y: "y", z: "z" })
      ).toBe(false);
      expect(Searchable.Indexed.isIndexedSearchable(10)).toBe(false);
      expect(Searchable.Indexed.isIndexedSearchable("ABC")).toBe(false);
      expect(Searchable.Indexed.isIndexedSearchable(true)).toBe(false);
      expect(
        Searchable.Indexed.isIndexedSearchable(
          Searchable.Keyed({ x: "x", y: "y", z: "z" })
        )
      ).toBe(false);
      expect(
        Searchable.Indexed.isIndexedSearchable(
          Searchable.Indexed(["x", "y", "z"])
        )
      ).toBe(true);
    });
  });
  describe("fromKeyedSearchable", () => {
    it("Returns a Searchable.Indexed from a given Searchable.Keyed", () => {
      expect(
        Searchable.Indexed.isIndexedSearchable(
          Searchable.Indexed.fromKeyed(
            Searchable.Keyed({ x: "x", y: "y", z: "z" })
          )
        )
      ).toBe(true);
    });
    it("Throws a TypeError when a Searchable.Keyed is not provided", () => {
      expect(Searchable.Indexed.fromKeyed("ABC")).toThrow(TypeError);
      expect(Searchable.Indexed.fromKeyed(10)).toThrow(TypeError);
      expect(Searchable.Indexed.fromKeyed([])).toThrow(TypeError);
      expect(Searchable.Indexed.fromKeyed({})).toThrow(TypeError);
      expect(
        Searchable.Indexed.fromKeyed(Searchable.Indexed.of("x", "y", "z"))
      ).toThrow(TypeError);
    });
  });
  describe("Instance", () => {
    describe("toString", () => {
      it("Returns a string representation of the type", () => {
        expect(Searchable.Indexed(["x", "y", "z"]).toString()).toEqual(
          'Searchable.Indexed("x", "y", "z")'
        );
      });
    });
    describe("inspect", () => {
      it("Returns a string representation of the type", () => {
        expect(Searchable.Indexed(["x", "y", "z"]).inspect()).toEqual(
          'Searchable.Indexed("x", "y", "z")'
        );
      });
    });
    describe("first", () => {
      it("Returns the first item", () => {
        expect(Searchable.Indexed(["x", "y", "z"]).first()).toEqual("x");
      });
      it("Returns undefined if there are no items", () => {
        expect(Searchable.Indexed([]).first()).toBeUndefined();
      });
    });
    describe("last", () => {
      it("Returns the last item", () => {
        expect(Searchable.Indexed(["x", "y", "z"]).last()).toEqual("z");
      });
      it("Returns undefined if there are no items", () => {
        expect(Searchable.Indexed([]).last()).toBeUndefined();
      });
    });
    describe("take", () => {
      it("Returns a Searchable.Indexed with the specified number of items", () => {
        expect(Searchable.Indexed(["x", "y", "z"]).take(2)).toEqual(
          Searchable.Indexed(["x", "y"])
        );
      });
      it("Returns at most the length of the items", () => {
        expect(Searchable.Indexed(["x", "y", "z"]).take(5)).toEqual(
          Searchable.Indexed(["x", "y", "z"])
        );
        expect(Searchable.Indexed([]).take(5)).toEqual(Searchable.Indexed([]));
      });
    });
    describe("takeLast", () => {
      it("Returns a Searchable.Indexed with the specified number of items from the end", () => {
        expect(Searchable.Indexed(["x", "y", "z"]).takeLast(2)).toEqual(
          Searchable.Indexed(["y", "z"])
        );
      });
      it("Returns at most the length of the items", () => {
        expect(Searchable.Indexed(["x", "y", "z"]).takeLast(5)).toEqual(
          Searchable.Indexed(["x", "y", "z"])
        );
        expect(Searchable.Indexed([]).takeLast(5)).toEqual(
          Searchable.Indexed([])
        );
      });
    });
    describe("slice", () => {
      it("Returns a Searchable.Indexed where the items included begin with the value of the item at the given index", () => {
        const searchable = Searchable.Indexed(["x", "y", "z"]);
        expect(searchable.slice(0)).toEqual(searchable);
        expect(searchable.slice(1)).toEqual(Searchable.Indexed(["y", "z"]));
        expect(searchable.slice(2)).toEqual(Searchable.Indexed(["z"]));
      });
      it("Returns a Searchable.Indexed where the items included begin with the value of the item at the index of the first argument in the source structure and end with the value at the index before the second argument in the source structure", () => {
        expect(Searchable.Indexed(["x", "y", "z"]).slice(1, 3)).toEqual(
          Searchable.Indexed(["y", "z"])
        );
      });
      it("Returns at most the length of the items", () => {
        expect(Searchable.Indexed(["x", "y", "z"]).slice(5)).toEqual(
          Searchable.Indexed(["x", "y", "z"])
        );
        expect(Searchable.Indexed([]).slice(5)).toEqual(Searchable.Indexed([]));
      });
    });
    describe("concat", () => {
      it("Joins two Searchables together and returns a Searchable.Indexed", () => {
        expect(
          Searchable.Indexed(["a", "b", "c"]).concat(
            Searchable.Indexed(["d", "e", "f"])
          )
        ).toEqual(Searchable.Indexed(["a", "b", "c", "d", "e", "f"]));
      });
    });
    describe("map", () => {
      it("Returns a new Searchable.Indexed", () => {
        expect(
          Searchable.Indexed(["x", "y", "z"]).map(x => x) instanceof
            Searchable.Indexed
        ).toBe(true);
      });
      it("Applies the function to each item, supplying the value as the first argument", () => {
        expect(Searchable.Indexed(["x", "y", "z"]).map(x => x)).toEqual(
          Searchable.Indexed(["x", "y", "z"])
        );
      });
      it("Applies the function to each item, supplying the index as the second argument", () => {
        expect(
          Searchable.Indexed(["x", "y", "z"]).map((x, index) => index)
        ).toEqual(Searchable.Indexed([0, 1, 2]));
      });
    });
    describe("fold", () => {
      it("Applies the function to each item using the second argument as the seed value", () => {
        expect(
          Searchable.Indexed(["x", "y", "z"]).fold(
            (acc, x) => acc.concat(x),
            ""
          )
        ).toEqual("xyz");
      });
    });
  });
  describe("search", () => {
    test("Accepts a string", () => {
      expect(Searchable.Indexed(["x", "y", "z"]).search("x")).not.toThrow();
    });
    test("Accepts an object", () => {
      const query = {
        searchTerm: "x",
        fuzziness: 0.5,
        minScore: 0.2,
        shouldScoreValue: () => true
      };
      expect(Searchable.Indexed(["x", "y", "z"]).search(query)).not.toThrow();
    });
    test("Returns a Searchable.Indexed where the data is filtered", () => {
      expect(Searchable.Indexed(["x", "y", "z"]).search("x")).toEqual(
        Searchable.Indexed(["x"])
      );
      expect(Searchable.Indexed(["x", "y", "z"]).search("y")).toEqual(
        Searchable.Indexed(["y"])
      );
      expect(Searchable.Indexed(["x", "y", "z"]).search("z")).toEqual(
        Searchable.Indexed(["z"])
      );
    });
  });
});

describe("Searchable.Keyed", () => {
  describe("isKeyedSearchable", () => {
    it("Returns true if the argument is an instance of a Searchable.Keyed", () => {
      expect(Searchable.Keyed.isKeyedSearchable(["x", "y", "z"])).toBe(false);
      expect(
        Searchable.Keyed.isKeyedSearchable({ x: "x", y: "y", z: "z" })
      ).toBe(false);
      expect(Searchable.Keyed.isKeyedSearchable(10)).toBe(false);
      expect(Searchable.Keyed.isKeyedSearchable("ABC")).toBe(false);
      expect(Searchable.Keyed.isKeyedSearchable(true)).toBe(false);
      expect(
        Searchable.Keyed.isKeyedSearchable(Searchable.Indexed(["x", "y", "z"]))
      ).toBe(false);
      expect(
        Searchable.Indexed.isKeyedSearchable(
          Searchable.Keyed({ x: "x", y: "y", z: "z" })
        )
      ).toBe(true);
    });
  });
  describe("Instance", () => {
    describe("toString", () => {
      it("Returns a string representation of the type", () => {
        expect(Searchable.Keyed({ x: "x", y: "y", z: "z" }).toString()).toEqual(
          'Searchable.Keyed({ x: "x", y: "y", z: "z" })'
        );
      });
    });
    describe("inspect", () => {
      it("Returns a string representation of the type", () => {
        expect(Searchable.Keyed({ x: "x", y: "y", z: "z" }).inspect()).toEqual(
          'Searchable.Keyed({ x: "x", y: "y", z: "z" })'
        );
      });
    });
    describe("merge", () => {
      it("Adds key/values from the given Searchable.Keyed to the source structure", () => {
        expect(
          Searchable.Keyed({ a: "a", b: "b", c: "c" }).merge(
            Searchable.Keyed({ d: "d", e: "e" })
          )
        ).toEqual(Searchable.Keyed({ a: "a", b: "b", c: "c", d: "d", e: "e" }));
      });
      it("Overwrites key/values from the given Searchable.Keyed that are also in the source structure", () => {
        expect(
          Searchable.Keyed({ a: "a", b: "b", c: "c" }).merge(
            Searchable.Keyed({ c: "C" })
          )
        ).toEqual(Searchable.Keyed({ a: "a", b: "b", c: "C" }));
      });
    });
    describe("map", () => {
      it("Returns a new Searchable.Keyed", () => {
        expect(
          Searchable.Keyed({ x: "x", y: "y", z: "z" }).map(x => x) instanceof
            Searchable.Keyed
        ).toBe(true);
      });
      it("Applies the function to each item, supplying the value as the first argument", () => {
        expect(
          Searchable.Keyed({ x: "x", y: "y", z: "z" }).map(x => x)
        ).toEqual(Searchable.Keyed({ x: "x", y: "y", z: "z" }));
      });
      it("Applies the function to each item, supplying the index as the second argument", () => {
        expect(
          Searchable.Keyed({ x: "x", y: "y", z: "z" }).map((x, index) => index)
        ).toEqual(Searchable.Keyed([0, 1, 2]));
      });
    });
    describe("fold", () => {
      it("Applies the function to each item using the second argument as the seed value", () => {
        expect(
          Searchable.Keyed({ x: "x", y: "y", z: "z" }).fold(
            (acc, x) => acc.concat(x),
            ""
          )
        ).toEqual("xyz");
      });
    });
  });
  describe("search", () => {
    test("Accepts a string", () => {
      expect(
        Searchable.Keyed({ x: "x", y: "y", z: "z" }).search("x")
      ).not.toThrow();
    });
    test("Accepts an object", () => {
      const query = {
        searchTerm: "x",
        fuzziness: 0.5,
        minScore: 0.2,
        shouldScoreValue: () => true
      };
      expect(
        Searchable.Keyed({ x: "x", y: "y", z: "z" }).search(query)
      ).not.toThrow();
    });
    test("Returns a Searchable.Keyed where the data is filtered", () => {
      expect(Searchable.Keyed({ x: "x", y: "y", z: "z" }).search("x")).toEqual(
        Searchable.Keyed(["x"])
      );
      expect(Searchable.Keyed({ x: "x", y: "y", z: "z" }).search("y")).toEqual(
        Searchable.Keyed(["y"])
      );
      expect(Searchable.Keyed({ x: "x", y: "y", z: "z" }).search("z")).toEqual(
        Searchable.Keyed(["z"])
      );
    });
  });
});
