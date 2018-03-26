// @flow
import { is, either } from "ramda";
import type { Query } from "../typeDefinitions/flow";

const standardQuery = (searchTerm: string): Query => ({
  searchTerm,
  fuzziness: 0.5,
  minScore: 0.2,
  shouldScoreValue: either(is(String), is(Number))
});

export default standardQuery;
