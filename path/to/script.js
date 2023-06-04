//show previous results after reloading
document.addEventListener('DOMContentLoaded', function () {
  const savedResults = localStorage.getItem('searchResults');
  if (savedResults) {
    const results = JSON.parse(savedResults);
    displaySearchResults(results, searchResultsContainer);
  }
});
//show previous filters after reloading
document.addEventListener('DOMContentLoaded', function () {
  //localStorage.setItem('savedFacets', JSON.stringify(facets));
  const savedFacets = localStorage.getItem('savedFacets');
  if (savedFacets) {
    const facets = JSON.parse(savedFacets);
    displayFilters(facets);
  }
});

// Define the valid sorting options
const validSortOptions = [
  "price_min_to_max",
  "price_max_to_min",
  "creation_date",
  "creation_date_oldest",
  "popularity",
  "reviews",
  "a_to_z",
  "z_to_a",
  "relevancy"
];

// Get the select element
const sortBySelect = document.getElementById('sortBy');
let sortBy = 'relevancy';
// Event listener for when the selection changes
sortBySelect.addEventListener('change', function () {
  // Get the selected value
  if(sortBySelect.value && validSortOptions.includes(sortBySelect.value)) {
    sortBy = sortBySelect.value;
  }
});
const fastSimonResponseAction = 'facets and products';
const searchForm = document.getElementById('searchForm');
const searchResultsContainer = document.getElementById('searchResults');
const recommendationContainer = document.getElementById('recomResults');
let selectedFiltersAll = [];
let searchResults;

// SDK Fast Simon collections usage
function smartCollectionsInit() {
  window.FastSimonSDK.smartCollections({
    // showing All-products category
    categoryID: "292003643599",
    narrowBy: selectedFiltersAll,
    sortBy: sortBy,
    callback: (response) => {
      console.log(response);
      // there are 2 actions: we use here only one that contains facets
      if (response.action == fastSimonResponseAction) {
        collectionResults = response.payload.products;
        collectionFilters = response.payload.facets;
        console.log(collectionFilters);
        displaySearchResults(collectionResults, searchResultsContainer);
        displayFilters(collectionFilters);
      }
    }
  });
}

// SDK Fast Simon search usage
function fullSearchInit() {
  const searchQuery = document.getElementById('searchInput').value;
  window.FastSimonSDK.fullTextSearch({
    term: searchQuery,
    narrowBy: selectedFiltersAll,
    sortBy: sortBy,
    callback: (response) => {
      console.log(response);
      // there are 2 actions: we use here only one that contains facets
      if (response.action == fastSimonResponseAction) {
        searchResults = response.payload.products;
        searchFilters = response.payload.facets;
        displaySearchResults(searchResults, searchResultsContainer, searchQuery);
        displayFilters(searchFilters)
      }
    }
  })
}
searchForm.addEventListener('submit', function (event) {
  event.preventDefault();
  localStorage.removeItem('checkboxState');
  searchResultsContainer.classList.add('fs_search');
  if (searchResultsContainer.classList.contains('fs_collections')) {
    searchResultsContainer.classList.remove('fs_collections');
  }
  fullSearchInit();
  //rec???
  // window.FastSimonSDK.contentSearch({
  //   query: searchQuery,
  //   callback: (response) => {
  //     console.log('rec', response);
  //     searchResults = response.payload.products;
  //     displaySearchResults(searchResults, recommendationContainer);
  //   }
  // });
});

const allProductsBtn = document.getElementById('allProducts');

allProductsBtn.addEventListener('click', function (event) {
  event.preventDefault();
  localStorage.removeItem('checkboxState');
  searchResultsContainer.classList.add('fs_collections');
  if (searchResultsContainer.classList.contains('fs_search')) {
    searchResultsContainer.classList.remove('fs_search');
  }
  smartCollectionsInit();
});

function displaySearchResults(results, container, searchQuery) {

  // Clear previous search results
  container.innerHTML = '';
  const searchResultsTitle = document.createElement('div');
  searchResultsTitle.classList.add('fs_search_results_title');
  if (searchQuery) {
    searchResultsTitle.innerText = `Search results for: "${searchQuery}", ${results.length} results`;
  } else {
    searchResultsTitle.innerText = `All products, ${results.length} results`;
  }
  container.appendChild(searchResultsTitle);

  const searchResultsWrapper = document.createElement('div');
  searchResultsWrapper.classList.add('fs_search_results_wrapper');
  // Iterate over the results and create the necessary HTML elements
  results.forEach((product) => {
    // Create a container for each product
    const productContainer = document.createElement('div');
    productContainer.classList.add('fs_product');

    // Add product information to the container
    const productImage = document.createElement('img');
    productImage.classList.add('fs_product_image');
    // product.t is an image URL
    if (product.t) {
      productImage.src = product.t;
    } else {
      productImage.src = 'https://acp-magento.appspot.com/images/missing.gif';
    }

    productContainer.appendChild(productImage);

    if (product.l) {
      const productName = document.createElement('h3');
      productName.classList.add('fs_product_title');
      productName.textContent = product.l;
      productContainer.appendChild(productName);
    }

    if (product.p && product.c) {
      const productPrice = document.createElement('p');
      productPrice.classList.add('fs_product_price');
      productPrice.textContent = `${product.p} ${product.c}`;
      productContainer.appendChild(productPrice);
    }


    // Append the product container to the search results container
    searchResultsWrapper.appendChild(productContainer);
    container.appendChild(searchResultsWrapper);
  });
  localStorage.setItem('searchResults', JSON.stringify(results));
}

// Function to save the state of filters checkboxes
function saveCheckboxState() {
  const checkboxes = document.querySelectorAll('.fs_filter_checkbox');
  const checkboxState = {};

  checkboxes.forEach((checkbox) => {
    checkboxState[checkbox.value] = checkbox.checked;
  });

  localStorage.setItem('checkboxState', JSON.stringify(checkboxState));
}

// Function to load the state of filters checkboxes
function loadCheckboxState() {
  const checkboxState = JSON.parse(localStorage.getItem('checkboxState'));

  if (checkboxState) {
    const checkboxes = document.querySelectorAll('.fs_filter_checkbox');

    checkboxes.forEach((checkbox) => {
      checkbox.checked = checkboxState[checkbox.value] || false;
    });
  }
}

function displayFilters(facets) {
  console.log('facets', facets);
  const filtersContainer = document.getElementById("filters");
  // Clear previous filters
  filtersContainer.innerHTML = '';
  for (let i = 0; i < facets.length; i++) {
    const facet = facets[i];
    if (facet[0] == "Price_max" || facet[0] == "Price_min" || facet[0] == "Price") {
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

    // Append the filter container to the filters container
    filtersContainer.appendChild(filterContainer);
  }

  // Event listener for checkbox selection

  function handleCheckboxSelection(checkboxElement) {
    const selectedValue = checkboxElement.value;
    const isChecked = checkboxElement.checked;

    // Perform filtering based on the selected checkbox value
    // You can implement your own filtering logic here
    // if (localStorage.getItem('selectedFilters')) {
    //   savedFilters = localStorage.getItem('selectedFilters');
    //   if (savedFilters) {
    //     selectedFiltersAll = JSON.parse(savedFilters);
    //     // displayFilters(facets);
    //   }
    // }
    let key = checkboxElement.getAttribute("key");
    let value = checkboxElement.getAttribute("value");
    if (isChecked) {
      checkboxElement.classList.add('fs_checkbox_selected');
      let selectedFilters = [];
      selectedFilters.push(key);
      selectedFilters.push(value);
      selectedFiltersAll.push(selectedFilters);
      // localStorage.setItem('selectedFilters', JSON.stringify(selectedFiltersAll));
      console.log('selectedFilters', selectedFiltersAll);
      saveCheckboxState();
    } else {
      checkboxElement.classList.remove('fs_checkbox_selected');
      let unselectedFilters = [];
      unselectedFilters.push(key);
      unselectedFilters.push(value);
      const jsonunselectedFilters = JSON.stringify(unselectedFilters);
      // selectedFiltersAll.push(unselectedFilters);
      for (let i = 0; i < selectedFiltersAll.length; i++) {
        console.log('compare', selectedFiltersAll[i], unselectedFilters);
        const jsonunselectedFilters = JSON.stringify(unselectedFilters);
        if (JSON.stringify(selectedFiltersAll[i]) == jsonunselectedFilters) {
          selectedFiltersAll.splice(i, 1);
        }
      }
      // localStorage.setItem('savedFacets', JSON.stringify(facets));
      console.log('selectedFilters', selectedFiltersAll);
      saveCheckboxState();
    }
    if (searchResultsContainer.classList.contains('fs_search')) {
      fullSearchInit();
    } else {
      smartCollectionsInit();
    }
    // Filter items based on selectedValue
    // Perform the necessary actions when the checkbox is checked
  }
  loadCheckboxState();
  localStorage.setItem('savedFacets', JSON.stringify(facets));
}


