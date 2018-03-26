// @flow
import standardQuery from "./standardQuery";
import type { Query } from "../typeDefinitions/flow";

const strictQuery = (searchTerm: string): Query => ({
  ...standardQuery(searchTerm),
  fuzziness: 1,
  minScore: 0.1
});

export default strictQuery;
