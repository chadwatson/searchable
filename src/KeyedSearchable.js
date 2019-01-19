import { Seq } from "immutable";
import { prop, isNil, is } from "ramda";
import standardQuery from "./standardQuery";
import scoreItem from "./scoreItem";

const SENTINAL = "@@__KEYED_SEARCHABLE__@@";

export default class KeyedSearchable {
  static isKeyedSearchable(maybeKeyedSearchable) {
    return !!maybeKeyedSearchable[SENTINAL];
  }

  [SENTINAL] = true;

  constructor(collection) {
    this.$value = Seq(collection)
      .filterNot(isNil)
      .map(item => ({
        value: item.value || item,
        score: item.score || 1
      }));
  }

  join() {
    return this.$value;
  }

  merge(keyedSearchable) {
    return new KeyedSearchable(
      keyedSearchable
        .join()
        .reduce((acc, item, key) => acc.set(key, item), this.$value.toMap())
        .toSeq()
    );
  }

  fold(f, seed) {
    return this.$value.reduce(
      (acc, { value, score }, key) => f(acc, value, key),
      seed
    );
  }

  search(stringOrQuery) {
    const query = is(String, stringOrQuery)
      ? standardQuery(stringOrQuery)
      : stringOrQuery;
    const getScore = scoreItem(query);

    return new KeyedSearchable(
      this.$value
        .map(({ value }) => ({
          value,
          score: getScore(value)
        }))
        .filter(({ score }) => score >= query.minScore)
    );
  }

  toString() {
    return `Searchable.Keyed(${JSON.stringify(
      this.$value.map(prop("value")).toObject()
    )})`;
  }
}
