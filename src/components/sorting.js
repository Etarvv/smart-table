import { sortCollection, sortMap } from "../lib/sort.js";

export function initSorting(columns) {
  return (data, state, action) => {
    let field = state.sortField || null;
    let order = state.sortOrder || null;

    if (action && action.name === "sort") {
      const currentSortState = action.dataset.value;
      const nextSortState = sortMap[currentSortState];

      field = action.dataset.field;
      order = nextSortState;

      
      state.sortField = field;
      state.sortOrder = order;

      
      action.dataset.value = nextSortState;

      
      columns.forEach((column) => {
        if (column !== action) {
          column.dataset.value = "none";
        }
      });
    }

    return sortCollection(data, field, order);
  };
}