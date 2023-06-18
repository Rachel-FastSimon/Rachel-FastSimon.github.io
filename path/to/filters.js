  // Function to save the state of filters checkboxes
  function saveCheckboxState() {
    const checkboxes = document.querySelectorAll('.fs_filter_checkbox');
    const checkboxState = {};
    const checkboxState2 = [];

    checkboxes.forEach((checkbox) => {
        if(checkbox.checked) {
            checkboxState[checkbox.value] = checkbox.checked;
            let key = checkbox.getAttribute("key");
            let value = checkbox.getAttribute("value");
            if(!checkboxState2[key]) {
                checkboxState2[key] = [];
            }
            
            if(checkbox.checked) {
                let key = checkbox.getAttribute("key");
                let value = checkbox.getAttribute("value");
                let selectedFilters = [];
                selectedFilters.push(key);
                selectedFilters.push(value);
                checkboxState2.push(selectedFilters);
                // checkboxState2[key].push(checkbox.value);
            }
        }
    });
    // console.log('checkboxState2', checkboxState2);

    // localStorage.setItem('checkboxState', JSON.stringify(checkboxState));

    url.searchParams.set('checkboxState', JSON.stringify(checkboxState));
    url.searchParams.set('checkboxState2', JSON.stringify(checkboxState2));
    // Update the URL in the browser's address bar
    window.history.replaceState(null, null, url.toString());

  }

  // Function to load the state of filters checkboxes
  function loadCheckboxState() {
    // const checkboxState = JSON.parse(localStorage.getItem('checkboxState'));
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
        //   const minPriceValue = fromSlider.value;
        //   const maxPriceValue = toSlider.value;
        setTimeout(() => {
            const minPriceValue = fromInput.value;
            const maxPriceValue = toInput.value;
            url.searchParams.set('min_price', minPriceValue);
            url.searchParams.set('max_price', maxPriceValue);
            window.history.replaceState(null, null, url.toString());
            refreshResults(300);
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
      fillSlider(fromInput, toInput, '#C6C6C6', '#25daa5', controlSlider);
      if (from > to) {
        fromSlider.value = to;
        fromInput.value = to;
      } else {
        fromSlider.value = from;
      }
    }

    function controlToInput(toSlider, fromInput, toInput, controlSlider) {
      const [from, to] = getParsed(fromInput, toInput);
      fillSlider(fromInput, toInput, '#C6C6C6', '#25daa5', controlSlider);
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
      fillSlider(fromSlider, toSlider, '#C6C6C6', '#25daa5', toSlider);
      if (from > to) {
        fromSlider.value = to;
        fromInput.value = to;
      } else {
        fromInput.value = from;
      }
    }

    function controlToSlider(fromSlider, toSlider, toInput) {
      const [from, to] = getParsed(fromSlider, toSlider);
      fillSlider(fromSlider, toSlider, '#C6C6C6', '#25daa5', toSlider);
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
      if(!from || !to) {
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
      if(!toSlider) {
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
    fillSlider(fromSlider, toSlider, '#C6C6C6', '#25daa5', toSlider);
    setToggleAccessible(toSlider);

    if(fromSlider) {
      fromSlider.oninput = () => controlFromSlider(fromSlider, toSlider, fromInput);
    }
    if(fromSlider) {
      toSlider.oninput = () => controlToSlider(fromSlider, toSlider, toInput);
    }
    if(fromSlider) {
      fromInput.oninput = () => controlFromInput(fromSlider, fromInput, toInput, toSlider);
    }
    if(fromSlider) {
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
      labelElement.textContent = facet[2]; // Assuming the first element of the facet array represents the filter label
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
          if(selectedColors.has(colorName)) {
            swatchElement.classList.add('fs_colorswatch_selected');
          }

          // Add event listener to the color swatch
          swatchElement.addEventListener('click', () => {
            // Perform actions when color swatch is clicked
            console.log(`Selected color: ${colorName}`);
            const selectedColor = `${colorName}`;
            // if(swatchElement.classList.contains('fs_colorswatch_selected')) {
            //   swatchElement.classList.remove('fs_colorswatch_selected');
            // } else {
            //   swatchElement.classList.add('fs_colorswatch_selected');
              
            //   // Get the existing color query parameter values
            //   const existingColors = url.searchParams.getAll('color');
              
            //   // Append the new color to the list
            //   const updatedColors = [...existingColors, selectedColor];
            //   console.log('updatedColors', updatedColors);
              
            //   // Update the URL query parameters with the updated colors list
            //   url.searchParams.set('color', updatedColors);
              
            //   // Update the URL in the browser's address bar
            //   window.history.replaceState(null, null, url.toString());
            // }
            
            
            // Get the existing color query parameter values
            let existingColors = getSelectedColors();
            // console.log('existingColors', existingColors);
            
            if(swatchElement.classList.contains('fs_colorswatch_selected')) {
                swatchElement.classList.remove('fs_colorswatch_selected');
                // let index = existingColors.indexOf(selectedColor);
                // if (index !== -1) {
                //     existingColors.splice(index, 1);
                // }
                existingColors.delete(selectedColor);
            } else {
                swatchElement.classList.add('fs_colorswatch_selected');
                existingColors.add(selectedColor);
            }
            
              
              
            //   // Append the new color to the list
            // //   const updatedColors = [...existingColors, selectedColor];
              
            //   // Update the URL query parameters with the updated colors list
            if(existingColors.size) {
                url.searchParams.set('color', Array.from(existingColors));
            } else {
                url.searchParams.delete('color');
            }
            //   url.searchParams.set('color', 'asdf');
              
              // Update the URL in the browser's address bar
              window.history.replaceState(null, null, url.toString());

              refreshResults(200);
            // }
          });

          // Add the color swatch to the container
          colorSwatchesContainer.appendChild(swatchElement);
        });
        filterContainer.appendChild(colorSwatchesContainer);
      } else {

        // Create checkboxes for each filter option
        for (let j = 0; j < facet[1].length; j++) {
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
            optionLabel.textContent = facet[1][j][2];
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
        // localStorage.setItem('selectedFilters', JSON.stringify(currentNarrow));
        console.log('selectedFilters', currentNarrow);
        saveCheckboxState();
      } else {
        checkboxElement.classList.remove('fs_checkbox_selected');
        let unselectedFilters = [];
        unselectedFilters.push(key);
        unselectedFilters.push(value);
        const jsonunselectedFilters = JSON.stringify(unselectedFilters);
        // currentNarrow.push(unselectedFilters);
        for (let i = 0; i < currentNarrow.length; i++) {
          console.log('compare', currentNarrow[i], unselectedFilters);
          const jsonunselectedFilters = JSON.stringify(unselectedFilters);
          if (JSON.stringify(currentNarrow[i]) == jsonunselectedFilters) {
            currentNarrow.splice(i, 1);
          }
        }
        // localStorage.setItem('savedFacets', JSON.stringify(facets));
        console.log('selectedFilters', currentNarrow);
        saveCheckboxState();
      }
      refreshResults();
      // Filter items based on selectedValue
      // Perform the necessary actions when the checkbox is checked
    }
    loadCheckboxState();
    localStorage.setItem('savedFacets', JSON.stringify(facets));
  }

  let refreshResultTimeout = 0;
  function refreshResults(delay = 0) {
        clearTimeout(refreshResultTimeout);
        refreshResultTimeout = setTimeout(() => {
            doRefreshResults();
        }, delay);
  }
  function doRefreshResults() {
    if (searchResultsContainer.classList.contains('fs_search')) {
        fullSearchInit();
    } else {
        smartCollectionsInit(collectionID);
    }
  }

function setUrlParam(paramName, paramValue, refresh = false, delay = 0) {
    url.searchParams.set(paramName, paramValue);
    window.history.replaceState(null, null, url.toString());
    if(refresh) {
      refreshResults(delay);
    }  
}

  function getSelectedColors() {
    let existingColorsStr = url.searchParams.get('color');
    if(!existingColorsStr) {
        existingColorsStr = '';
    }
    // console.log('existingColorsStr33', existingColorsStr);
    let existingColors = new Set(existingColorsStr.split(','));
    existingColors.delete('');
    return existingColors;
  }

  function getSortBy() {
    return url.searchParams.get('sortBy') || 'relevancy';
  }

  function getSearch() {
    return url.searchParams.get('search');
  }

