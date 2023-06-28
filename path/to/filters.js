// Function to save the state of filters checkboxes
function saveCheckboxState() {
  const checkboxes = document.querySelectorAll('.fs_filter_checkbox');
  const checkboxState = {};
  const checkboxState2 = [];

  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      checkboxState[checkbox.value] = checkbox.checked;
      let key = checkbox.getAttribute("key");
      let value = checkbox.getAttribute("value");
      if (!checkboxState2[key]) {
        checkboxState2[key] = [];
      }

      if (checkbox.checked) {
        let key = checkbox.getAttribute("key");
        let value = checkbox.getAttribute("value");
        // setUrlParam(key, value);
        let selectedFilters = [];
        selectedFilters.push(key);
        selectedFilters.push(value);
        checkboxState2.push(selectedFilters);
        // checkboxState2[key].push(checkbox.value);
      }
    }
  });

  url.searchParams.set('checkboxState', JSON.stringify(checkboxState));
  // url.searchParams.set('checkboxState2', JSON.stringify(checkboxState2));
  console.log('checkboxState2', checkboxState2);
  console.log('checkboxState2', JSON.stringify(checkboxState2));
  // Update the URL in the browser's address bar
  window.history.replaceState(null, null, url.toString());

}

// Function to load the state of filters checkboxes
function loadCheckboxState() {
  // const checkboxState = JSON.parse(url.searchParams.get('checkboxState'));
  const checkboxState = JSON.parse(url.searchParams.get('checkboxState'));

  if (checkboxState) {
    const checkboxes = document.querySelectorAll('.fs_filter_checkbox');

    checkboxes.forEach((checkbox) => {
      checkbox.checked = checkboxState[checkbox.value] || false;
    });
  }
}

//creating price slider
function createPriceSlider() {
  // Create the parent container element
  priceSlider = document.createElement('div');

  const elementString = '<div class="range_container"><div class="sliders_control"><input id="fromSlider" type="range" value="10" min="0" max="100"/><input id="toSlider" type="range" value="40" min="0" max="100"/></div ><div class="form_control"><div class="form_control_container"><div class="form_control_container__time">Min</div><input class="form_control_container__time__input" type="number" id="fromInput" value="10" min="0" max="100" /></div><div class="form_control_container"><div class="form_control_container__time">Max</div><input class="form_control_container__time__input" type="number" id="toInput" value="40" min="0" max="100" /></div></div></div >';

  // Create a temporary container element
  const container = document.createElement('div');

  // Set the HTML content of the container to the element string
  container.innerHTML = elementString;

  // Access the created element
  const createdElement = container.firstChild;



  //set min and max values
  let fromSlider = createdElement.querySelector('#fromSlider');
  // fromSlider.setAttribute('value', minPriceValue);
  fromSlider.setAttribute('min', `${minPrice}`);
  fromSlider.setAttribute('max', `${maxPrice}`);
  let toSlider = createdElement.querySelector('#toSlider');
  // toSlider.setAttribute('value', maxPriceValue);
  toSlider.setAttribute('min', `${minPrice}`);
  toSlider.setAttribute('max', `${maxPrice}`);
  let fromInput = createdElement.querySelector('#fromInput');
  fromInput.setAttribute('min', `${minPrice}`);
  fromInput.setAttribute('max', `${maxPrice}`);
  let toInput = createdElement.querySelector('#toInput');
  toInput.setAttribute('min', `${minPrice}`);
  toInput.setAttribute('max', `${maxPrice}`);

  // setTimeout(() => {
  // }, 100);


  // Function to update the URL query parameters
  function updatePriceRangeParams() {
    setTimeout(() => {
      const minPriceValue = fromInput.value;
      const maxPriceValue = toInput.value;
      url.searchParams.set('min_price', minPriceValue);
      url.searchParams.set('max_price', maxPriceValue);
      window.history.replaceState(null, null, url.toString());
    }, 100);

  }

  // Add event listeners to update the URL when the price range changes
  fromSlider.addEventListener('input', updatePriceRangeParams);
  toSlider.addEventListener('input', updatePriceRangeParams);
  fromInput.addEventListener('input', updatePriceRangeParams);
  toInput.addEventListener('input', updatePriceRangeParams);

  priceSlider.appendChild(createdElement);

  let minPriceValue = getMinPriceValue();
  let maxPriceValue = getMaxPriceValue();
  fromSlider.setAttribute('value', minPriceValue);
  toSlider.setAttribute('value', maxPriceValue);
  fromInput.setAttribute('value', minPriceValue);
  toInput.setAttribute('value', maxPriceValue);
}

//all functions for slider
function priceSliderHandle() {
  function controlFromInput(fromSlider, fromInput, toInput, controlSlider) {
    const [from, to] = getParsed(fromInput, toInput);
    fillSlider(fromInput, toInput, '#C6C6C6', '#212529', controlSlider);
    if (from > to) {
      fromSlider.value = to;
      fromInput.value = to;
    } else {
      fromSlider.value = from;
    }
  }

  function controlToInput(toSlider, fromInput, toInput, controlSlider) {
    const [from, to] = getParsed(fromInput, toInput);
    fillSlider(fromInput, toInput, '#C6C6C6', '#212529', controlSlider);
    setToggleAccessible(toInput);
    if (from <= to) {
      toSlider.value = to;
      toInput.value = to;
    } else {
      toInput.value = from;
    }
  }

  function controlFromSlider(fromSlider, toSlider, fromInput) {
    const [from, to] = getParsed(fromSlider, toSlider);
    fillSlider(fromSlider, toSlider, '#C6C6C6', '#212529', toSlider);
    if (from > to) {
      fromSlider.value = to;
      fromInput.value = to;
    } else {
      fromInput.value = from;
    }
  }

  function controlToSlider(fromSlider, toSlider, toInput) {
    const [from, to] = getParsed(fromSlider, toSlider);
    fillSlider(fromSlider, toSlider, '#C6C6C6', '#212529', toSlider);
    setToggleAccessible(toSlider);
    if (from <= to) {
      toSlider.value = to;
      toInput.value = to;
    } else {
      toInput.value = from;
      toSlider.value = from;
    }
  }

  function getParsed(currentFrom, currentTo) {
    const from = parseInt(currentFrom.value, 10);
    const to = parseInt(currentTo.value, 10);
    return [from, to];
  }

  function fillSlider(from, to, sliderColor, rangeColor, controlSlider) {
    if (!from || !to) {
      return;
    }
    const rangeDistance = to.max - to.min;
    const fromPosition = from.value - to.min;
    const toPosition = to.value - to.min;
    controlSlider.style.background = `linear-gradient(
            to right,
            ${sliderColor} 0%,
            ${sliderColor} ${(fromPosition) / (rangeDistance) * 100}%,
            ${rangeColor} ${((fromPosition) / (rangeDistance)) * 100}%,
            ${rangeColor} ${(toPosition) / (rangeDistance) * 100}%, 
            ${sliderColor} ${(toPosition) / (rangeDistance) * 100}%, 
            ${sliderColor} 100%)`;
  }

  function setToggleAccessible(currentTarget) {
    const toSlider = document.querySelector('#toSlider');
    if (!toSlider) {
      return;
    }
    if (currentTarget && Number(currentTarget.value) <= 0) {
      toSlider.style.zIndex = 2;
    } else {
      toSlider.style.zIndex = 0;
    }
  }

  const fromSlider = document.querySelector('#fromSlider');
  const toSlider = document.querySelector('#toSlider');
  const fromInput = document.querySelector('#fromInput');
  const toInput = document.querySelector('#toInput');
  fillSlider(fromSlider, toSlider, '#C6C6C6', '#212529', toSlider);
  setToggleAccessible(toSlider);

  if (fromSlider) {
    fromSlider.oninput = () => controlFromSlider(fromSlider, toSlider, fromInput);
  }
  if (fromSlider) {
    toSlider.oninput = () => controlToSlider(fromSlider, toSlider, toInput);
  }
  if (fromSlider) {
    fromInput.oninput = () => controlFromInput(fromSlider, fromInput, toInput, toSlider);
  }
  if (fromSlider) {
    toInput.oninput = () => controlToInput(toSlider, fromInput, toInput, toSlider);
  }
}

//Show filters
function displayFilters(facets) {
  console.log('facets', facets);
  const filtersContainer = document.getElementById("filters");
  if (facets.length > 0) {
    filtersContainer.style.display = 'block';
  } else {
    filtersContainer.style.display = 'none';
  }
  // Clear previous filters
  filtersContainer.innerHTML = '';
  for (let i = 0; i < facets.length; i++) {
    const facet = facets[i];
    if (facet[0] == "Price") {
      continue;
    }

    // Create a container div for the filter
    const filterContainer = document.createElement("div");
    filterContainer.classList.add('fs_filter_container');

    // Create a label element for the filter
    const labelElement = document.createElement("label");
    labelElement.classList.add('fs_label_element');
    labelElement.setAttribute("name", `${facet[0]}`);
    labelElement.textContent = facet[2];
    if (facet[0] == "Price_max") {
      labelElement.textContent = 'Price';
    }
    // Assuming the first element of the facet array represents the filter label
    filterContainer.appendChild(labelElement);

    //price slider
    if (facet[0] == "Price_min") {
      minPrice = facet[1][0];
      console.log(facet[0], facet[1][0]);
      continue;
    }
    if (facet[0] == "Price_max") {
      maxPrice = facet[1][0];
      if (minPrice && maxPrice) {
        console.log('prices', minPrice, maxPrice);
        createPriceSlider();
        filterContainer.appendChild(priceSlider);
      }
      // continue;
    }

    //colorswatches
    if (facet[0] == "Isp-color-family") {
      console.log('colors', facet);
      const colorData = facet;
      // Get the container element to hold the color swatches
      const colorSwatchesContainer = document.createElement('div');
      colorSwatchesContainer.classList.add('fs_color_swatches_wrap');

      // Get the array of color swatches from the data
      const colorSwatches = colorData[1];

      let selectedColors = getSelectedColors();

      // Iterate over the color swatches array and create the HTML elements
      colorSwatches.forEach(swatch => {
        const [colorName, count, colorCode] = swatch;

        // Create the color swatch element
        const swatchElement = document.createElement('div');
        swatchElement.classList.add('fs_color_swatch');
        swatchElement.style.backgroundColor = colorCode;
        if (selectedColors.has(colorName)) {
          swatchElement.classList.add('fs_colorswatch_selected');
        }

        // Add event listener to the color swatch
        swatchElement.addEventListener('click', () => {
          // Perform actions when color swatch is clicked
          console.log(`Selected color: ${colorName}`);
          const selectedColor = `${colorName}`;

          // Get the existing color query parameter values
          let existingColors = getSelectedColors();
          // console.log('existingColors', existingColors);

          if (swatchElement.classList.contains('fs_colorswatch_selected')) {
            swatchElement.classList.remove('fs_colorswatch_selected');
            existingColors.delete(selectedColor);
          } else {
            swatchElement.classList.add('fs_colorswatch_selected');
            existingColors.add(selectedColor);
          }

          // Update the URL query parameters with the updated colors list
          if (existingColors.size) {
            url.searchParams.set('color', Array.from(existingColors));
          } else {
            url.searchParams.delete('color');
          }

          // Update the URL in the browser's address bar
          window.history.replaceState(null, null, url.toString());
        });

        // Add the color swatch to the container
        colorSwatchesContainer.appendChild(swatchElement);
      });
      filterContainer.appendChild(colorSwatchesContainer);
    } else {

      // Create checkboxes for each filter option
      for (let j = 0; j < facet[1].length; j++) {
        if (facet[0] == "Price_max") {
          continue;
        }
        const option = facet[1][j][0]; // Assuming the filter options are strings
        const count = facet[1][j][1];

        const checkboxWrap = document.createElement("div");
        checkboxWrap.classList.add('fs_filter_checkbox_wrap');
        const checkboxCount = document.createElement("span");
        checkboxCount.classList.add('fs_filter_checkbox_count');
        checkboxCount.innerText = `(${count})`;
        const checkboxElement = document.createElement("input");
        checkboxElement.type = "checkbox";
        checkboxElement.classList.add('fs_filter_checkbox');
        checkboxElement.value = option;
        checkboxElement.setAttribute("key", `${facet[0]}`);
        checkboxElement.setAttribute("name", `${facet[2]}`);
        // Add event listener to handle checkbox selection
        checkboxElement.addEventListener("change", () => handleCheckboxSelection(checkboxElement));

        const optionLabel = document.createElement("label");
        optionLabel.classList.add('fs_filter_checkbox_label');
        if (checkboxElement.getAttribute("key") == 'Categories') {
          if (facet[1][j][2] == 'all-products') {
            optionLabel.textContent = 'All products';
          } else if (facet[1][j][2] == 'vertical-layout') {
            optionLabel.textContent = 'Vertical layout';
          } else {
            optionLabel.textContent = facet[1][j][2];
          }
        } else {
          optionLabel.textContent = option;
        }

        checkboxWrap.appendChild(checkboxElement);
        checkboxWrap.appendChild(optionLabel);
        checkboxWrap.appendChild(checkboxCount);
        filterContainer.appendChild(checkboxWrap);
      }
    }
    // Append the filter container to the filters container
    filtersContainer.appendChild(filterContainer);
  }
  priceSliderHandle();
  // Event listener for checkbox selection

  function handleCheckboxSelection(checkboxElement) {
    const isChecked = checkboxElement.checked;
    let key = checkboxElement.getAttribute("key");
    let value = checkboxElement.getAttribute("value");
    if (isChecked) {
      checkboxElement.classList.add('fs_checkbox_selected');
      let selectedFilters = [];
      selectedFilters.push(key);
      selectedFilters.push(value);
      currentNarrow.push(selectedFilters);
    } else {
      checkboxElement.classList.remove('fs_checkbox_selected');
      let unselectedFilters = [];
      unselectedFilters.push(key);
      unselectedFilters.push(value);
      for (let i = 0; i < currentNarrow.length; i++) {
        console.log('compare', currentNarrow[i], unselectedFilters);
        const jsonunselectedFilters = JSON.stringify(unselectedFilters);
        if (JSON.stringify(currentNarrow[i]) == jsonunselectedFilters) {
          currentNarrow.splice(i, 1);
        }
      }
    }
    saveCheckboxState();
  }
  // loadCheckboxState();
}

let refreshResultTimeout = 0;
function refreshResults(delay = 0) {
  clearTimeout(refreshResultTimeout);
  refreshResultTimeout = setTimeout(() => {
    initPage();
  }, delay);
}

function getSelectedColors() {
  let existingColorsStr = url.searchParams.get('color');
  if (!existingColorsStr) {
    existingColorsStr = '';
  }
  // console.log('existingColorsStr33', existingColorsStr);
  let existingColors = new Set(existingColorsStr.split(','));
  existingColors.delete('');
  return existingColors;
}

// Define the valid sorting options
const validSortOptions = [
  "price_min_to_max",
  "price_max_to_min",
  "creation_date",
  "creation_date_oldest",
  "popularity",
  "a_to_z",
  "z_to_a",
  "relevancy"
];

// Get the select element
const sortBySelect = document.getElementById('sortBy');
sortBySelect.value = getSortBy();
// Event listener for when the selection changes
sortBySelect.addEventListener('change', function () {
  // Get the selected value
  if (sortBySelect.value && validSortOptions.includes(sortBySelect.value)) {
    sortBy = sortBySelect.value;
    setUrlParam('sortBy', sortBy, true);
  }
});
function getSortBy() {
  return getUrlParam('sortBy') || 'relevancy';
}

