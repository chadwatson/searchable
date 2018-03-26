// @flow

type ValuePath = string | Array<string | number>;

export type Query = {
  searchTerm: string,
  fuzziness: number,
  minScore: number,
  shouldScoreValue: (value: any, path: ValuePath) => boolean
};
