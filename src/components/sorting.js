import { sortCollection, sortMap } from "../lib/sort.js";

export function initSorting(columns) {
    return (data, state, action) => {
        if (action && action.name === "sort") {
            const currentSortState = action.dataset.value;
            const nextSortState = sortMap[currentSortState];
            action.dataset.value = nextSortState;

            columns.forEach((column) => {
                if (column.dataset.field !== action.dataset.field) {
                    column.dataset.value = "none";
                }
            });
        }

        let field = null;
        let order = null;
        for (const column of columns) {
            if (column.dataset.value !== "none") {
                field = column.dataset.field;
                order = column.dataset.value;
                break;
            }
        }

        return sortCollection(data, field, order);
    };
}