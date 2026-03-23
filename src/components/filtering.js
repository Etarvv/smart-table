export function initFiltering(elements) {
      const updateIndexes = (elements, indexes) => {
            Object.keys(indexes).forEach((elementName) => {
                  elements[elementName].append(
                        ...Object.values(indexes[elementName]).map((name) => {
                              const el = document.createElement("option");
                              el.textContent = name;
                              el.value = name;
                              return el;
                        })
                  );
            });
      };

      const applyFiltering = (query, state, action) => {
            if (action && action.name === "clear") {
                  const fieldToClear = action.value;
                  if (elements[fieldToClear]) {
                        elements[fieldToClear].value = "";
                        state[fieldToClear] = "";
                  }
            }

            const filter = {};

            Object.keys(elements).forEach((key) => {
                  const el = elements[key];

                  if (el && ["INPUT", "SELECT"].includes(el.tagName) && el.value) {
                        filter[`filter[${el.name}]`] = el.value;
                  }
            });

            return Object.keys(filter).length ? Object.assign({}, query, filter) : query;
      };

      return {
            updateIndexes,
            applyFiltering,
      };
}
