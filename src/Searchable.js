import { SEARCHABLE_SENTINAL } from "./constants";
import IndexedSearchable from "./IndexedSearchable";
import KeyedSearchable from "./KeyedSearchable";

function Searchable(collection) {
  if (Array.isArray(collection)) {
    return new IndexedSearchable(collection);
  }

  return new KeyedSearchable(collection);
}

Searchable.Indexed = IndexedSearchable;
Searchable.Keyed = KeyedSearchable;

Searchable.isSearchable = maybeSearchable =>
  IndexedSearchable.isIndexedSearchable(maybeSearchable) ||
  KeyedSearchable.isKeyedSearchable(maybeSearchable);

Searchable.of = IndexedSearchable.of;
Searchable.fromArray = array => new IndexedSearchable(array);
Searchable.fromObject = obj => new KeyedSearchable(obj);

export default Searchable;
