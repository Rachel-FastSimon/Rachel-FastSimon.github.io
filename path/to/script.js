function allSDK() {
  // const fastSimonResponseAction = 'facets and products';
  // const searchForm = document.getElementById('searchForm');
  // const searchResultsContainer = document.getElementById('searchResults');
  // let collectionID = localStorage.getItem('collectionID') || '292003643599';
  // let collectionTitle = localStorage.getItem('collectionTitle') || 'All products';
  // let currentNarrow = [];
  // let searchResults;
  // let sortBy = localStorage.getItem('sortBy') || 'relevancy';
  // let minPrice;
  // let maxPrice;
  // let priceSlider;
  // // Get the current URL
  // let url = new URL(window.location.href);

  // // Get all categories
  // function getAllCategories() {
  //   window.FastSimonSDK.getAllCategories((response) => {
  //     console.log(response);
  //     // Assuming there's a container element in your HTML to hold the buttons
  //     const container = document.getElementById('button-container');

  //     // Iterate over the response array and create buttons
  //     response.forEach(item => {
  //       const collectionButton = document.createElement('button');
  //       collectionButton.classList.add('fs_collections_btn');
  //       collectionButton.textContent = item.l;
  //       collectionButton.setAttribute('id', item.id);
  //       collectionButton.addEventListener('click', function (event) {
  //         console.log('collection btn clicked');
  //         event.preventDefault();
  //         collectionID = collectionButton.getAttribute("id");
  //         localStorage.setItem('collectionID', collectionID);
  //         localStorage.removeItem('checkboxState');
  //         searchResultsContainer.classList.add('fs_collections');
  //         if (searchResultsContainer.classList.contains('fs_search')) {
  //           searchResultsContainer.classList.remove('fs_search');
  //         }
  //         currentNarrow = [];
  //         smartCollectionsInit(collectionID);
  //       });

  //       // Add the button to the container
  //       container.appendChild(collectionButton);
  //     });
  //   }, true);
  // };
  getAllCategories();

  //show previous results after reloading
  // document.addEventListener('DOMContentLoaded', function () {
  const savedResults = localStorage.getItem('searchResults');
  if (savedResults) {
    const results = JSON.parse(savedResults);
    displaySearchResults(results, searchResultsContainer);
  } else {
    smartCollectionsInit(collectionID);
  }
  // });



  //show previous filters after reloading
  // document.addEventListener('DOMContentLoaded', function () {
  //localStorage.setItem('savedFacets', JSON.stringify(facets));
  const savedFacets = localStorage.getItem('savedFacets');
  if (savedFacets) {
    const facets = JSON.parse(savedFacets);
    displayFilters(facets);
  }
  // });

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
      // localStorage.setItem('sortBy', sortBy);
      setUrlParam('sortBy', sortBy, true);
    }
    // if (searchResultsContainer.classList.contains('fs_search')) {
    //   fullSearchInit();
    // } else {
    //   smartCollectionsInit(collectionID);
    // }
  });

  // // SDK Fast Simon collections usage
  // function smartCollectionsInit(collectionID) {
  //   window.FastSimonSDK.smartCollections({
  //     // showing All-products category
  //     categoryID: collectionID,
  //     narrowBy: currentNarrow,
  //     sortBy: sortBy,
  //     callback: (response) => {
  //       console.log(response);
  //       if (searchResultsContainer.classList.contains('fs_products_loaded')) {
  //         searchResultsContainer.classList.remove('fs_products_loaded')
  //       }
  //       collectionTitle = `Collection "${response.payload.name}"`;
  //       localStorage.setItem('collectionTitle', collectionTitle);
  //       collectionResults = response.payload.products;
  //       collectionFilters = response.payload.facets;
  //       console.log(collectionFilters);
  //       // there are 2 actions: we use here only one that contains facets
  //       if (response.action == fastSimonResponseAction) {
  //         console.log(fastSimonResponseAction);
  //         displayFilters(collectionFilters);
  //         if (!searchResultsContainer.classList.contains('fs_products_loaded')) {
  //           displaySearchResults(collectionResults, searchResultsContainer, collectionTitle);
  //         }
  //       } else {
  //         console.log('products only');
  //         displaySearchResults(collectionResults, searchResultsContainer, collectionTitle);
  //       }
  //     }
  //   });
  //   //Collection Viewed event
  //   window.FastSimonSDK.event({
  //     eventName: window.FastSimonEventName.SmartCollectionPreformed,
  //     data: {
  //       categoryID: collectionID, // (Required)
  //       narrowBy: currentNarrow,
  //       sortBy: sortBy
  //     }
  //   });
  // }

  // // SDK Fast Simon search usage
  // function fullSearchInit() {
  //   let searchQuery = document.getElementById('searchInput').value;
  //   searchQuery = `"${searchQuery}"`;
  //   window.FastSimonSDK.fullTextSearch({
  //     term: searchQuery,
  //     narrowBy: currentNarrow,
  //     sortBy: sortBy,
  //     callback: (response) => {
  //       console.log(response);
  //       if (searchResultsContainer.classList.contains('fs_products_loaded')) {
  //         searchResultsContainer.classList.remove('fs_products_loaded')
  //       }
  //       searchResults = response.payload.products;
  //       searchFilters = response.payload.facets;
  //       // there are 2 actions: we use here only one that contains facets
  //       if (response.action == fastSimonResponseAction) {
  //         console.log(fastSimonResponseAction);
  //         displayFilters(searchFilters);
  //         if (!searchResultsContainer.classList.contains('fs_products_loaded')) {
  //           displaySearchResults(searchResults, searchResultsContainer, searchQuery);
  //         }
  //       } else {
  //         displaySearchResults(searchResults, searchResultsContainer, searchQuery);
  //         console.log('products only');
  //       }
  //     }
  //   });
  //   //Search Result page viewed event
  //   window.FastSimonSDK.event({
  //     eventName: window.FastSimonEventName.SearchPerformed,
  //     data: {
  //       query: searchQuery, // (Required)
  //       narrowBy: currentNarrow,
  //       sortBy: sortBy
  //     }
  //   });
  // }
  // searchForm.addEventListener('submit', function (event) {
  //   event.preventDefault();
  //   localStorage.removeItem('checkboxState');
  //   searchResultsContainer.classList.add('fs_search');
  //   if (searchResultsContainer.classList.contains('fs_collections')) {
  //     searchResultsContainer.classList.remove('fs_collections');
  //   }
  //   currentNarrow = [];
  //   fullSearchInit();

  // });

  // let allProductsBtn = document.querySelectorAll('.fs_collections_btn');

  // allProductsBtn.forEach((btn) => {
  //   btn.addEventListener('click', function (event) {
  //     console.log('collection btn clicked');
  //     event.preventDefault();
  //     localStorage.removeItem('checkboxState');
  //     searchResultsContainer.classList.add('fs_collections');
  //     if (searchResultsContainer.classList.contains('fs_search')) {
  //       searchResultsContainer.classList.remove('fs_search');
  //     }
  //     currentNarrow = [];
  //     smartCollectionsInit();
  //   });
  // });

  // function displaySearchResults(results, container, searchQuery) {

  //   // Clear previous search results
  //   container.innerHTML = '';
  //   const searchResultsTitle = document.createElement('div');
  //   searchResultsTitle.classList.add('fs_search_results_title');
  //   if (searchQuery) {
  //     searchResultsTitle.innerText = `Results for: ${searchQuery}, ${results.length} results`;
  //   }
  //   container.appendChild(searchResultsTitle);

  //   const searchResultsWrapper = document.createElement('div');
  //   searchResultsWrapper.classList.add('fs_search_results_wrapper');
  //   // Iterate over the results and create the necessary HTML elements
  //   results.forEach((product) => {
  //     // Create a container for each product
  //     const productContainer = document.createElement('div');
  //     productContainer.classList.add('fs_product');

  //     // Add product information to the container
  //     const productImage = document.createElement('img');
  //     productImage.classList.add('fs_product_image');
  //     // product.t is an image URL
  //     if (product.t) {
  //       productImage.src = product.t;
  //     } else {
  //       productImage.src = 'https://acp-magento.appspot.com/images/missing.gif';
  //     }

  //     productContainer.appendChild(productImage);

  //     if (product.l) {
  //       const productName = document.createElement('h3');
  //       productName.classList.add('fs_product_title');
  //       productName.textContent = product.l;
  //       productContainer.appendChild(productName);
  //     }

  //     if (product.p && product.c) {
  //       const productPrice = document.createElement('p');
  //       productPrice.classList.add('fs_product_price');
  //       productPrice.textContent = `${product.p} ${product.c}`;
  //       productContainer.appendChild(productPrice);
  //     }


  //     // Append the product container to the search results container
  //     searchResultsWrapper.appendChild(productContainer);
  //     container.appendChild(searchResultsWrapper);
  //   });
  //   localStorage.setItem('searchResults', JSON.stringify(results));
  //   searchResultsContainer.classList.add('fs_products_loaded');
  // }

  // // Function to save the state of filters checkboxes
  // function saveCheckboxState() {
  //   const checkboxes = document.querySelectorAll('.fs_filter_checkbox');
  //   const checkboxState = {};

  //   checkboxes.forEach((checkbox) => {
  //     checkboxState[checkbox.value] = checkbox.checked;
  //   });

  //   localStorage.setItem('checkboxState', JSON.stringify(checkboxState));
  // }

  // // Function to load the state of filters checkboxes
  // function loadCheckboxState() {
  //   const checkboxState = JSON.parse(localStorage.getItem('checkboxState'));

  //   if (checkboxState) {
  //     const checkboxes = document.querySelectorAll('.fs_filter_checkbox');

  //     checkboxes.forEach((checkbox) => {
  //       checkbox.checked = checkboxState[checkbox.value] || false;
  //     });
  //   }
  // }

  // //creating price slider
  // function createPriceSlider() {
  //   // Create the parent container element
  //   priceSlider = document.createElement('div');

  //   const elementString = '<div class="range_container"><div class="sliders_control"><input id="fromSlider" type="range" value="10" min="0" max="100"/><input id="toSlider" type="range" value="40" min="0" max="100"/></div ><div class="form_control"><div class="form_control_container"><div class="form_control_container__time">Min</div><input class="form_control_container__time__input" type="number" id="fromInput" value="10" min="0" max="100" /></div><div class="form_control_container"><div class="form_control_container__time">Max</div><input class="form_control_container__time__input" type="number" id="toInput" value="40" min="0" max="100" /></div></div></div >';

  //   // Create a temporary container element
  //   const container = document.createElement('div');

  //   // Set the HTML content of the container to the element string
  //   container.innerHTML = elementString;

  //   // Access the created element
  //   const createdElement = container.firstChild;

    

  //   //set min and max values
  //   let fromSlider = createdElement.querySelector('#fromSlider');
  //   fromSlider.setAttribute('value', `${minPrice}`);
  //   fromSlider.setAttribute('min', `${minPrice}`);
  //   fromSlider.setAttribute('max', `${maxPrice}`);
  //   let toSlider = createdElement.querySelector('#toSlider');
  //   toSlider.setAttribute('value', `${maxPrice}`);
  //   toSlider.setAttribute('min', `${minPrice}`);
  //   toSlider.setAttribute('max', `${maxPrice}`);
  //   let fromInput = createdElement.querySelector('#fromInput');
  //   fromInput.setAttribute('value', `${minPrice}`);
  //   fromInput.setAttribute('min', `${minPrice}`);
  //   fromInput.setAttribute('max', `${maxPrice}`);
  //   let toInput = createdElement.querySelector('#toInput');
  //   toInput.setAttribute('value', `${maxPrice}`);
  //   toInput.setAttribute('min', `${minPrice}`);
  //   toInput.setAttribute('max', `${maxPrice}`);

  //   // Function to update the URL query parameters
  //   function updatePriceRangeParams() {
  //     const minPriceValue = fromSlider.value;
  //     const maxPriceValue = toSlider.value;
  //     url.searchParams.set('min_price', minPriceValue);
  //     url.searchParams.set('max_price', maxPriceValue);
  //     window.history.replaceState(null, null, url.toString());
  //   }

  //   // Add event listeners to update the URL when the price range changes
  //   fromSlider.addEventListener('input', updatePriceRangeParams);
  //   toSlider.addEventListener('input', updatePriceRangeParams);
  //   fromInput.addEventListener('input', updatePriceRangeParams);
  //   toInput.addEventListener('input', updatePriceRangeParams);

  //   priceSlider.appendChild(createdElement);
  // }

  // //all functions for slider
  // function priceSliderHandle() {
  //   function controlFromInput(fromSlider, fromInput, toInput, controlSlider) {
  //     const [from, to] = getParsed(fromInput, toInput);
  //     fillSlider(fromInput, toInput, '#C6C6C6', '#25daa5', controlSlider);
  //     if (from > to) {
  //       fromSlider.value = to;
  //       fromInput.value = to;
  //     } else {
  //       fromSlider.value = from;
  //     }
  //   }

  //   function controlToInput(toSlider, fromInput, toInput, controlSlider) {
  //     const [from, to] = getParsed(fromInput, toInput);
  //     fillSlider(fromInput, toInput, '#C6C6C6', '#25daa5', controlSlider);
  //     setToggleAccessible(toInput);
  //     if (from <= to) {
  //       toSlider.value = to;
  //       toInput.value = to;
  //     } else {
  //       toInput.value = from;
  //     }
  //   }

  //   function controlFromSlider(fromSlider, toSlider, fromInput) {
  //     const [from, to] = getParsed(fromSlider, toSlider);
  //     fillSlider(fromSlider, toSlider, '#C6C6C6', '#25daa5', toSlider);
  //     if (from > to) {
  //       fromSlider.value = to;
  //       fromInput.value = to;
  //     } else {
  //       fromInput.value = from;
  //     }
  //   }

  //   function controlToSlider(fromSlider, toSlider, toInput) {
  //     const [from, to] = getParsed(fromSlider, toSlider);
  //     fillSlider(fromSlider, toSlider, '#C6C6C6', '#25daa5', toSlider);
  //     setToggleAccessible(toSlider);
  //     if (from <= to) {
  //       toSlider.value = to;
  //       toInput.value = to;
  //     } else {
  //       toInput.value = from;
  //       toSlider.value = from;
  //     }
  //   }

  //   function getParsed(currentFrom, currentTo) {
  //     const from = parseInt(currentFrom.value, 10);
  //     const to = parseInt(currentTo.value, 10);
  //     return [from, to];
  //   }

  //   function fillSlider(from, to, sliderColor, rangeColor, controlSlider) {
  //     const rangeDistance = to.max - to.min;
  //     const fromPosition = from.value - to.min;
  //     const toPosition = to.value - to.min;
  //     controlSlider.style.background = `linear-gradient(
  //           to right,
  //           ${sliderColor} 0%,
  //           ${sliderColor} ${(fromPosition) / (rangeDistance) * 100}%,
  //           ${rangeColor} ${((fromPosition) / (rangeDistance)) * 100}%,
  //           ${rangeColor} ${(toPosition) / (rangeDistance) * 100}%, 
  //           ${sliderColor} ${(toPosition) / (rangeDistance) * 100}%, 
  //           ${sliderColor} 100%)`;
  //   }

  //   function setToggleAccessible(currentTarget) {
  //     const toSlider = document.querySelector('#toSlider');
  //     if (Number(currentTarget.value) <= 0) {
  //       toSlider.style.zIndex = 2;
  //     } else {
  //       toSlider.style.zIndex = 0;
  //     }
  //   }

  //   const fromSlider = document.querySelector('#fromSlider');
  //   const toSlider = document.querySelector('#toSlider');
  //   const fromInput = document.querySelector('#fromInput');
  //   const toInput = document.querySelector('#toInput');
  //   fillSlider(fromSlider, toSlider, '#C6C6C6', '#25daa5', toSlider);
  //   setToggleAccessible(toSlider);

  //   fromSlider.oninput = () => controlFromSlider(fromSlider, toSlider, fromInput);
  //   toSlider.oninput = () => controlToSlider(fromSlider, toSlider, toInput);
  //   fromInput.oninput = () => controlFromInput(fromSlider, fromInput, toInput, toSlider);
  //   toInput.oninput = () => controlToInput(toSlider, fromInput, toInput, toSlider);
  // }

  // //Show filters
  // function displayFilters(facets) {
  //   console.log('facets', facets);
  //   const filtersContainer = document.getElementById("filters");
  //   if (facets.length > 0) {
  //     filtersContainer.style.display = 'block';
  //   } else {
  //     filtersContainer.style.display = 'none';
  //   }
  //   // Clear previous filters
  //   filtersContainer.innerHTML = '';
  //   for (let i = 0; i < facets.length; i++) {
  //     const facet = facets[i];
  //     if (facet[0] == "Price") {
  //       continue;
  //     }

  //     // Create a container div for the filter
  //     const filterContainer = document.createElement("div");
  //     filterContainer.classList.add('fs_filter_container');

  //     // Create a label element for the filter
  //     const labelElement = document.createElement("label");
  //     labelElement.classList.add('fs_label_element');
  //     labelElement.setAttribute("name", `${facet[0]}`);
  //     labelElement.textContent = facet[2]; // Assuming the first element of the facet array represents the filter label
  //     filterContainer.appendChild(labelElement);

  //     //price slider
  //     if (facet[0] == "Price_min") {
  //       minPrice = facet[1][0];
  //       console.log(facet[0], facet[1][0]);
  //       continue;
  //     }
  //     if (facet[0] == "Price_max") {
  //       maxPrice = facet[1][0];
  //       if (minPrice && maxPrice) {
  //         console.log('prices', minPrice, maxPrice);
  //         createPriceSlider();
  //         filterContainer.appendChild(priceSlider);
  //       }
  //       // continue;
  //     }

  //     //colorswatches
  //     if (facet[0] == "Isp-color-family") {
  //       console.log('colors', facet);
  //       const colorData = facet;
  //       // Get the container element to hold the color swatches
  //       const colorSwatchesContainer = document.createElement('div');
  //       colorSwatchesContainer.classList.add('fs_color_swatches_wrap');

  //       // Get the array of color swatches from the data
  //       const colorSwatches = colorData[1];

  //       // Iterate over the color swatches array and create the HTML elements
  //       colorSwatches.forEach(swatch => {
  //         const [colorName, count, colorCode] = swatch;

  //         // Create the color swatch element
  //         const swatchElement = document.createElement('div');
  //         swatchElement.classList.add('fs_color_swatch');
  //         swatchElement.style.backgroundColor = colorCode;

  //         // Add event listener to the color swatch
  //         swatchElement.addEventListener('click', () => {
  //           // Perform actions when color swatch is clicked
  //           console.log(`Selected color: ${colorName}`);
  //           const selectedColor = `${colorName}`;
  //           if(swatchElement.classList.contains('fs_colorswatch_selected')) {
  //             swatchElement.classList.remove('fs_colorswatch_selected');
  //           } else {
  //             swatchElement.classList.add('fs_colorswatch_selected');
              
  //             // Get the existing color query parameter values
  //             const existingColors = url.searchParams.getAll('color');
              
  //             // Append the new color to the list
  //             const updatedColors = [...existingColors, selectedColor];
              
  //             // Update the URL query parameters with the updated colors list
  //             url.searchParams.set('color', updatedColors);
              
  //             // Update the URL in the browser's address bar
  //             window.history.replaceState(null, null, url.toString());
  //           }
  //         });

  //         // Add the color swatch to the container
  //         colorSwatchesContainer.appendChild(swatchElement);
  //       });
  //       filterContainer.appendChild(colorSwatchesContainer);
  //     } else {

  //       // Create checkboxes for each filter option
  //       for (let j = 0; j < facet[1].length; j++) {
  //         const option = facet[1][j][0]; // Assuming the filter options are strings
  //         const count = facet[1][j][1];

  //         const checkboxWrap = document.createElement("div");
  //         checkboxWrap.classList.add('fs_filter_checkbox_wrap');
  //         const checkboxCount = document.createElement("span");
  //         checkboxCount.classList.add('fs_filter_checkbox_count');
  //         checkboxCount.innerText = `(${count})`;
  //         const checkboxElement = document.createElement("input");
  //         checkboxElement.type = "checkbox";
  //         checkboxElement.classList.add('fs_filter_checkbox');
  //         checkboxElement.value = option;
  //         checkboxElement.setAttribute("key", `${facet[0]}`);
  //         checkboxElement.setAttribute("name", `${facet[2]}`);
  //         // Add event listener to handle checkbox selection
  //         checkboxElement.addEventListener("change", () => handleCheckboxSelection(checkboxElement));

  //         const optionLabel = document.createElement("label");
  //         optionLabel.classList.add('fs_filter_checkbox_label');
  //         if (checkboxElement.getAttribute("key") == 'Categories') {
  //           optionLabel.textContent = facet[1][j][2];
  //         } else {
  //           optionLabel.textContent = option;
  //         }

  //         checkboxWrap.appendChild(checkboxElement);
  //         checkboxWrap.appendChild(optionLabel);
  //         checkboxWrap.appendChild(checkboxCount);
  //         filterContainer.appendChild(checkboxWrap);
  //       }
  //     }
  //     // Append the filter container to the filters container
  //     filtersContainer.appendChild(filterContainer);
  //   }
  //   priceSliderHandle();
  //   // Event listener for checkbox selection

  //   function handleCheckboxSelection(checkboxElement) {
  //     const isChecked = checkboxElement.checked;
  //     let key = checkboxElement.getAttribute("key");
  //     let value = checkboxElement.getAttribute("value");
  //     if (isChecked) {
  //       checkboxElement.classList.add('fs_checkbox_selected');
  //       let selectedFilters = [];
  //       selectedFilters.push(key);
  //       selectedFilters.push(value);
  //       currentNarrow.push(selectedFilters);
  //       // localStorage.setItem('selectedFilters', JSON.stringify(currentNarrow));
  //       console.log('selectedFilters', currentNarrow);
  //       saveCheckboxState();
  //     } else {
  //       checkboxElement.classList.remove('fs_checkbox_selected');
  //       let unselectedFilters = [];
  //       unselectedFilters.push(key);
  //       unselectedFilters.push(value);
  //       const jsonunselectedFilters = JSON.stringify(unselectedFilters);
  //       // currentNarrow.push(unselectedFilters);
  //       for (let i = 0; i < currentNarrow.length; i++) {
  //         console.log('compare', currentNarrow[i], unselectedFilters);
  //         const jsonunselectedFilters = JSON.stringify(unselectedFilters);
  //         if (JSON.stringify(currentNarrow[i]) == jsonunselectedFilters) {
  //           currentNarrow.splice(i, 1);
  //         }
  //       }
  //       // localStorage.setItem('savedFacets', JSON.stringify(facets));
  //       console.log('selectedFilters', currentNarrow);
  //       saveCheckboxState();
  //     }
  //     if (searchResultsContainer.classList.contains('fs_search')) {
  //       fullSearchInit();
  //     } else {
  //       smartCollectionsInit(collectionID);
  //     }
  //     // Filter items based on selectedValue
  //     // Perform the necessary actions when the checkbox is checked
  //   }
  //   loadCheckboxState();
  //   localStorage.setItem('savedFacets', JSON.stringify(facets));
  // }

  // //Autocomplete
  // const searchInput = document.getElementById('searchInput');

  // searchInput.addEventListener('input', function (event) {
  //   const searchTerm = event.target.value;
  //   // Use the following code for every keystroke shoppers perform in a searchbox.
  //   window.FastSimonSDK.instantSearch({
  //     query: searchTerm,
  //     callback: (response) => {
  //       console.log(response);
  //       displayAutocomplete(response.payload.products);
  //     }
  //   });
  //   console.log(searchTerm);
  // });
  // function displayAutocomplete(response) {
  //   productList.innerHTML = '';

  //   // Add products to the modal
  //   response.forEach(function (product) {
  //     // Create a container for each product
  //     const productContainer = document.createElement('li');
  //     productContainer.classList.add('fs_product_ac');

  //     // Add product information to the container
  //     const productImage = document.createElement('img');
  //     productImage.classList.add('fs_product_image_ac');
  //     // product.t is an image URL
  //     if (product.t) {
  //       productImage.src = product.t;
  //     } else {
  //       productImage.src = 'https://acp-magento.appspot.com/images/missing.gif';
  //     }

  //     productContainer.appendChild(productImage);

  //     if (product.l) {
  //       const productName = document.createElement('h3');
  //       productName.classList.add('fs_product_title_ac');
  //       productName.textContent = product.l;
  //       productContainer.appendChild(productName);
  //     }

  //     if (product.p && product.c) {
  //       const productPrice = document.createElement('p');
  //       productPrice.classList.add('fs_product_price_ac');
  //       productPrice.textContent = `${product.p} ${product.c}`;
  //       productContainer.appendChild(productPrice);
  //     }


  //     // Append the product container to the search results container
  //     productList.appendChild(productContainer);
  //   });

  //   // Show the modal
  //   if (response.length > 0) {
  //     productModal.style.display = 'block';
  //   } else {
  //     productModal.style.display = 'none';
  //   }
  // }

  // // Close the modal when the user clicks outside the modal
  // window.addEventListener('click', function (event) {
  //   if (event.target !== productModal) {
  //     productModal.style.display = 'none';
  //   }
  // });
}
