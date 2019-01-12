import standardQuery from "./standardQuery";

const strictQuery = searchTerm => ({
  ...standardQuery(searchTerm),
  fuzziness: 1,
  minScore: 0.1
});

export default strictQuery;
