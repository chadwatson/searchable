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
    title: "Star Wars: Episode IV - A New Hope",
    director: "Irvin Kershner",
    year: 1977,
    cast: ["Mark Hamill", "Harrison Ford", "Carrie Fisher"]
  },
  {
    title: "Star Wars: Episode V - The Empire Strikes Back",
    director: "Irvin Kershner",
    year: 1980,
    cast: ["Mark Hamill", "Harrison Ford", "Carrie Fisher"]
  },
  {
    title: "Star Wars: Episode VI - Return of the Jedi",
    director: "Richard Marquand",
    year: 1983,
    cast: ["Mark Hamill", "Harrison Ford", "Carrie Fisher"]
  },
  {
    title: "Harry Potter and the Sorcerer's Stone",
    director: "Chris Columbus",
    year: 2001,
    cast: ["Daniel Radcliffe", "Rupert Grint", "Richard Harris"]
  },
  {
    title: "Harry Potter and the Chamber of Secrets",
    director: "Chris Columbus",
    year: 2002,
    cast: ["Daniel Radcliffe", "Rupert Grint", "Emma Watson"]
  },
  {
    title: "Harry Potter and the Prisoner of Azkaban",
    director: "Alfonso Cuarón",
    year: 2004,
    cast: ["Daniel Radcliffe", "Emma Watson", "Rupert Grint"]
  },
  {
    title: "The Lord of the Rings: The Fellowship of the Ring",
    director: "Peter Jackson",
    year: 2001,
    cast: ["Elijah Wood", "Ian McKellen", "Orlando Bloom"]
  },
  {
    title: "The Lord of the Rings: The Two Towers",
    director: "Peter Jackson",
    year: 2002,
    cast: ["Elijah Wood", "Ian McKellen", "Viggo Mortensen"]
  },
  {
    title: "The Lord of the Rings: The Return of the King",
    director: "Peter Jackson",
    year: 2003,
    cast: ["Elijah Wood", "Ian McKellen", "Viggo Mortensen"]
  }
];

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
  describe("isSearchable", () => {
    it("Returns true if the provided value is an IndexedSearchable or KeyedSearchable", () => {
      expect(Searchable.isSearchable(10)).toBe(false);
      expect(Searchable.isSearchable("abc")).toBe(false);
      expect(Searchable.isSearchable(() => "ABC")).toBe(false);
      expect(Searchable.isSearchable(["x", "y", "z"])).toBe(false);
      expect(Searchable.isSearchable({ x: "x", y: "y", z: "z" })).toBe(false);
      expect(
        Searchable.isSearchable(Searchable.Indexed.of("x", "y", "z"))
      ).toBe(true);
      expect(
        Searchable.isSearchable(
          new Searchable.Keyed({ x: "x", y: "y", z: "z" })
        )
      ).toBe(true);
    });
  });
  describe("of", () => {
    it("Returns a Searchable.Indexed from the arguments", () => {
      expect(Searchable.of("x", "y", "z")).toEqual(
        new Searchable.Indexed(["x", "y", "z"])
      );
    });
  });
  describe("fromArray", () => {
    it("Returns a Searchable.Indexed from the given array", () => {
      const array = ["x", "y", "z"];
      expect(Searchable.fromArray(array)).toEqual(
        new Searchable.Indexed(array)
      );
    });
  });
  describe("fromObject", () => {
    it("Returns a Searchable.Keyed from the given object", () => {
      const object = { x: "x", y: "y", z: "z" };
      expect(Searchable.fromObject(object)).toEqual(
        new Searchable.Keyed(object)
      );
    });
  });
});

describe("Searchable.Indexed", () => {
  describe("of", () => {
    it("Returns a Searchable.Indexed from the arguments", () => {
      expect(Searchable.Indexed.of("x", "y", "z")).toEqual(
        new Searchable.Indexed(["x", "y", "z"])
      );
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
          new Searchable.Keyed({ x: "x", y: "y", z: "z" })
        )
      ).toBe(false);
      expect(
        Searchable.Indexed.isIndexedSearchable(
          new Searchable.Indexed(["x", "y", "z"])
        )
      ).toBe(true);
    });
  });
  describe("fromKeyedSearchable", () => {
    it("Returns a Searchable.Indexed from a given Searchable.Keyed", () => {
      expect(
        Searchable.Indexed.isIndexedSearchable(
          Searchable.Indexed.fromKeyed(
            new Searchable.Keyed({ x: "x", y: "y", z: "z" })
          )
        )
      ).toBe(true);
    });
  });
  describe("Instance", () => {
    describe("toString", () => {
      it("Returns a string representation of the type", () => {
        expect(Searchable.Indexed.of("x", "y", "z").toString()).toEqual(
          "Searchable.Indexed(x,y,z)"
        );
      });
    });
    describe("size", () => {
      it("Returns the length of the value", () => {
        expect(Searchable.Indexed.of("x", "y", "z").size).toEqual(3);
      });
    });
    describe("join", () => {
      it("Returns the wrapped value", () => {
        const searchable = Searchable.Indexed.of("x", "y", "z");
        expect(searchable.join()).toEqual(searchable.$value);
      });
    });
    describe("first", () => {
      it("Returns the first item", () => {
        expect(Searchable.Indexed.of("x", "y", "z").first()).toEqual("x");
      });
      it("Returns undefined if there are no items", () => {
        expect(Searchable.Indexed.of().first()).toBeUndefined();
      });
    });
    describe("last", () => {
      it("Returns the last item", () => {
        expect(Searchable.Indexed.of("x", "y", "z").last()).toEqual("z");
      });
      it("Returns undefined if there are no items", () => {
        expect(Searchable.Indexed.of().last()).toBeUndefined();
      });
    });
    describe("take", () => {
      it("Returns a Searchable.Indexed with the specified number of items", () => {
        expect(Searchable.Indexed.of("x", "y", "z").take(2)).toEqual(
          Searchable.Indexed.of("x", "y")
        );
      });
      it("Returns at most the length of the items", () => {
        expect(Searchable.Indexed.of("x", "y", "z").take(5)).toEqual(
          Searchable.Indexed.of("x", "y", "z")
        );
        expect(Searchable.Indexed.of().take(5)).toEqual(
          Searchable.Indexed.of()
        );
      });
    });
    describe("takeLast", () => {
      it("Returns a Searchable.Indexed with the specified number of items from the end", () => {
        expect(Searchable.Indexed.of("x", "y", "z").takeLast(2)).toEqual(
          Searchable.Indexed.of("y", "z")
        );
      });
      it("Returns at most the length of the items", () => {
        expect(Searchable.Indexed.of("x", "y", "z").takeLast(5)).toEqual(
          Searchable.Indexed.of("x", "y", "z")
        );
        expect(Searchable.Indexed.of().takeLast(5)).toEqual(
          Searchable.Indexed.of()
        );
      });
    });
    describe("slice", () => {
      it("Returns a Searchable.Indexed where the items included begin with the value of the item at the given index", () => {
        const searchable = Searchable.Indexed.of("x", "y", "z");
        expect(searchable.slice(0)).toEqual(searchable);
        expect(searchable.slice(1)).toEqual(Searchable.Indexed.of("y", "z"));
        expect(searchable.slice(2)).toEqual(Searchable.Indexed.of("z"));
      });
      it("Returns a Searchable.Indexed where the items included begin with the value of the item at the index of the first argument in the source structure and end with the value at the index before the second argument in the source structure", () => {
        expect(Searchable.Indexed.of("x", "y", "z").slice(1, 3)).toEqual(
          Searchable.Indexed.of("y", "z")
        );
      });
      it("Returns at most the length of the items", () => {
        expect(Searchable.Indexed.of("x", "y", "z").slice(0, 5)).toEqual(
          Searchable.Indexed.of("x", "y", "z")
        );
        expect(Searchable.Indexed.of().slice(5)).toEqual(
          Searchable.Indexed.of()
        );
      });
    });
    describe("concat", () => {
      it("Joins two Searchables together and returns a Searchable.Indexed", () => {
        expect(
          Searchable.Indexed.of("a", "b", "c").concat(
            Searchable.Indexed.of("d", "e", "f")
          )
        ).toEqual(Searchable.Indexed.of("a", "b", "c", "d", "e", "f"));
      });
    });
    describe("map", () => {
      it("Returns a new Searchable.Indexed", () => {
        expect(
          Searchable.Indexed.of("x", "y", "z").map(x => x) instanceof
            Searchable.Indexed
        ).toBe(true);
      });
      it("Applies the function to each item, supplying the value as the first argument", () => {
        expect(Searchable.Indexed.of("x", "y", "z").map(x => x)).toEqual(
          Searchable.Indexed.of("x", "y", "z")
        );
      });
      it("Applies the function to each item, supplying the index as the second argument", () => {
        expect(
          Searchable.Indexed.of("x", "y", "z").map((x, index) => index)
        ).toEqual(Searchable.Indexed.of(0, 1, 2));
      });
    });
    describe("fold", () => {
      it("Applies the function to each item using the second argument as the seed value", () => {
        expect(
          Searchable.Indexed.of("x", "y", "z").fold(
            (acc, x) => acc.concat(x),
            ""
          )
        ).toEqual("xyz");
      });
    });
    describe("get", () => {
      it("Returns the item at the given index", () => {
        expect(Searchable.Indexed.of("x", "y", "z").get(0)).toEqual("x");
        expect(Searchable.Indexed.of("x", "y", "z").get(1)).toEqual("y");
        expect(Searchable.Indexed.of("x", "y", "z").get(2)).toEqual("z");
      });
    });
    describe("search", () => {
      it("Accepts a string", () => {
        const result = Searchable.Indexed.of("x", "y", "z").search("x");
        expect(result.size).toBe(1);
        expect(result.first()).toEqual("x");
      });
      it("Accepts a query object", () => {
        const query = {
          searchTerm: "x",
          fuzziness: 0.5,
          minScore: 0.2,
          shouldScoreValue: () => true
        };
        const result = Searchable.Indexed.of("x", "y", "z").search(query);
        expect(result.size).toBe(1);
        expect(result.first()).toEqual("x");
      });
      it("Returns a Searchable.Indexed where the data is filtered", () => {
        const searchable = Searchable.Indexed.of("x", "y", "z");

        const result1 = searchable.search("x");
        expect(Searchable.Indexed.isIndexedSearchable(result1));
        expect(result1.size).toEqual(1);
        expect(result1.first()).toEqual("x");

        const result2 = searchable.search("y");
        expect(Searchable.Indexed.isIndexedSearchable(result2));
        expect(result2.size).toEqual(1);
        expect(result2.first()).toEqual("y");

        const result3 = searchable.search("z");
        expect(Searchable.Indexed.isIndexedSearchable(result3));
        expect(result3.size).toEqual(1);
        expect(result3.first()).toEqual("z");
      });
      it("Searches nested objects", () => {
        const searchable = new Searchable.Indexed(MOVIES);

        const result1 = searchable.search("back");
        expect(result1.size).toEqual(2);
        expect(result1.get(0)).toEqual(MOVIES[0]);
        expect(result1.get(1)).toEqual(MOVIES[2]);

        const result2 = searchable.search("harr");
        expect(result2.size).toEqual(6);
        expect(result2.get(0)).toEqual(MOVIES[1]);
        expect(result2.get(1)).toEqual(MOVIES[2]);
        expect(result2.get(2)).toEqual(MOVIES[3]);
        expect(result2.get(3)).toEqual(MOVIES[4]);
        expect(result2.get(4)).toEqual(MOVIES[5]);
        expect(result2.get(5)).toEqual(MOVIES[6]);

        const result3 = searchable.search("chris");
        expect(result3.size).toEqual(3);
        expect(result3.get(0)).toEqual(MOVIES[0]);
        expect(result3.get(1)).toEqual(MOVIES[4]);
        expect(result3.get(2)).toEqual(MOVIES[5]);

        const result4 = searchable.search(2001);
        expect(result4.size).toEqual(2);
        expect(result4.get(0)).toEqual(MOVIES[4]);
        expect(result4.get(1)).toEqual(MOVIES[7]);
      });
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
        Searchable.Keyed.isKeyedSearchable(Searchable.Indexed.of("x", "y", "z"))
      ).toBe(false);
      expect(
        Searchable.Keyed.isKeyedSearchable(
          new Searchable.Keyed({ x: "x", y: "y", z: "z" })
        )
      ).toBe(true);
    });
  });
  describe("Instance", () => {
    describe("toString", () => {
      it("Returns a string representation of the type", () => {
        expect(
          new Searchable.Keyed({ x: "x", y: "y", z: "z" }).toString()
        ).toEqual('Searchable.Keyed({"x":"x","y":"y","z":"z"})');
      });
    });
    describe("join", () => {
      it("Returns the wrapped value", () => {
        const value = { x: "x", y: "y", z: "z" };
        expect(new Searchable.Keyed(value).join()).toEqual(value);
      });
    });
    describe("merge", () => {
      it("Adds key/values from the given Searchable.Keyed to the source structure", () => {
        expect(
          new Searchable.Keyed({ a: "a", b: "b", c: "c" }).merge(
            new Searchable.Keyed({ d: "d", e: "e" })
          )
        ).toEqual(
          new Searchable.Keyed({ a: "a", b: "b", c: "c", d: "d", e: "e" })
        );
      });
      it("Overwrites key/values from the given Searchable.Keyed that are also in the source structure", () => {
        expect(
          new Searchable.Keyed({ a: "a", b: "b", c: "c" }).merge(
            new Searchable.Keyed({ c: "C" })
          )
        ).toEqual(new Searchable.Keyed({ a: "a", b: "b", c: "C" }));
      });
    });
    describe("map", () => {
      it("Returns a new Searchable.Keyed", () => {
        expect(
          new Searchable.Keyed({ x: "x", y: "y", z: "z" }).map(
            x => x
          ) instanceof Searchable.Keyed
        ).toBe(true);
      });
      it("Applies the function to each item, supplying the value as the first argument", () => {
        expect(
          new Searchable.Keyed({ x: "x", y: "y", z: "z" }).map(x => x)
        ).toEqual(new Searchable.Keyed({ x: "x", y: "y", z: "z" }));
      });
      it("Applies the function to each item, supplying the key as the second argument", () => {
        expect(
          new Searchable.Keyed({ x: "X", y: "Y", z: "Z" }).map(
            (x, index) => index
          )
        ).toEqual(new Searchable.Keyed({ x: "x", y: "y", z: "z" }));
      });
    });
    describe("fold", () => {
      it("Applies the function to each item using the second argument as the seed value", () => {
        expect(
          new Searchable.Keyed({ x: "x", y: "y", z: "z" }).fold(
            (acc, x) => acc.concat(x),
            ""
          )
        ).toEqual("xyz");
      });
    });
  });
  describe("search", () => {
    it("Accepts a string", () => {
      expect(
        new Searchable.Keyed({ x: "x", y: "y", z: "z" }).search("x")
      ).not.toThrow();
    });
    it("Accepts an object", () => {
      const query = {
        searchTerm: "x",
        fuzziness: 0.5,
        minScore: 0.2,
        shouldScoreValue: () => true
      };
      expect(
        new Searchable.Keyed({ x: "x", y: "y", z: "z" }).search(query)
      ).not.toThrow();
    });
    it("Returns a Searchable.Keyed where the data is filtered", () => {
      expect(
        new Searchable.Keyed({ x: "x", y: "y", z: "z" }).search("x")
      ).toEqual(new Searchable.Keyed(["x"]));
      expect(
        new Searchable.Keyed({ x: "x", y: "y", z: "z" }).search("y")
      ).toEqual(new Searchable.Keyed(["y"]));
      expect(
        new Searchable.Keyed({ x: "x", y: "y", z: "z" }).search("z")
      ).toEqual(new Searchable.Keyed(["z"]));
    });
  });
});
