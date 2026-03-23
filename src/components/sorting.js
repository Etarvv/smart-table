import { sortMap } from "../lib/sort.js";

export function initSorting(columns) {
      return (query, state, action) => {
            let field = null;
            let order = null;

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
            const sort = field && order !== "none" ? `${field}:${order}` : null;

            return sort ? Object.assign({}, query, { sort }) : query;
      };
}
