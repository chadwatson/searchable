import { compose, prop } from "ramda";
import { SEARCHABLE_SENTINAL } from "./constants";

export const isSearchable = compose(Boolean, prop(SEARCHABLE_SENTINAL));

export default isSearchable;
