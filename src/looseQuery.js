// @flow
import standardQuery from './standardQuery'
import type { Query } from '../typeDefinitions/flow'

const looseQuery = (searchTerm: string): Query => ({
  ...standardQuery(searchTerm),
  fuzziness: 0.2,
  minScore: 0.01,
})

export default looseQuery
