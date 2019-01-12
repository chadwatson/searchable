import { is, either } from "ramda";

const standardQuery = searchTerm => ({
  searchTerm,
  fuzziness: 0.5,
  minScore: 0.2,
  shouldScoreValue: either(is(String), is(Number))
});

export default standardQuery;
