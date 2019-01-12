import standardQuery from "./standardQuery";

const looseQuery = searchTerm => ({
  ...standardQuery(searchTerm),
  fuzziness: 0.2,
  minScore: 0.01
});

export default looseQuery;
