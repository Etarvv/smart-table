import { rules, createComparison } from "../lib/compare.js";

export function initSearching(searchField) {
  const compare = createComparison(
    ["skipEmptyTargetValues"],
    [rules.searchMultipleFields(searchField, ["date", "customer", "seller"], false)]
  );

  return (data, state, action) => {
    if (action && action.name === "search") {
      state.page = 1;
    }

    const query = state[searchField];

    if (!query) {
      return data;
    }

    return data.filter((row) =>
      compare(row, { [searchField]: query })
    );
  };
}
