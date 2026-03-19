import "./fonts/ys-display/fonts.css";
import "./style.css";

import { data as sourceData } from "./data/dataset_1.js";

import { initData } from "./data.js";
import { processFormData } from "./lib/utils.js";

import { initTable } from "./components/table.js";
import { initPagination } from "./components/pagination.js";
import { initSorting } from "./components/sorting.js";
import { initFiltering } from "./components/filtering.js";
import { initSearching } from "./components/searching.js";


const { data, ...indexes } = initData(sourceData);

/**
 * @returns {Object}
 */
function collectState() {
  const state = processFormData(new FormData(sampleTable.container));

  return {
    ...state,
    rowsPerPage: parseInt(state.rowsPerPage),
    page: parseInt(state.page ?? 1),

    sortField: state.sortField || null,
    sortOrder: state.sortOrder || null,
  };
}

/**
 * Перерисовка состояния таблицы при любых изменениях
 * @param {HTMLButtonElement?} action
 */
function render(action) {
  const state = collectState();
  let result = [...data];


  result = applyFiltering(result, state, action);
  result = applySearching(result, state, action);
  result = applySorting(result, state, action);
  result = applyPagination(result, state, action);

  sampleTable.render(result);
}

const sampleTable = initTable(
  {
    tableTemplate: "table",
    rowTemplate: "row",
    before: ["search", "header", "filter"],
    after: ["pagination"],
  },
  render
);


const applySearching = initSearching("search");

const applyFiltering = initFiltering(sampleTable.filter.elements, {
  searchBySeller: indexes.sellers,
});

const applySorting = initSorting([
  sampleTable.header.elements.sortByDate,
  sampleTable.header.elements.sortByTotal,
]);

const applyPagination = initPagination(
  sampleTable.pagination.elements,
  (el, page, isCurrent) => {
    const input = el.querySelector("input");
    const label = el.querySelector("span");

    input.value = page;
    input.checked = isCurrent;
    label.textContent = page;

    return el;
  }
);

const appRoot = document.querySelector("#app");
appRoot.appendChild(sampleTable.container);

render();