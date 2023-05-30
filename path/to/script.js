document.addEventListener('DOMContentLoaded', function() {
  const savedResults = localStorage.getItem('searchResults');
  if (savedResults) {
    const results = JSON.parse(savedResults);
    displaySearchResults(results);
  }
});
const searchForm = document.getElementById('searchForm');
let searchResults;
searchForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const searchQuery = document.getElementById('searchInput').value;
  window.FastSimonSDK.fullTextSearch({
    term: searchQuery,
    callback: (response) => {
      console.log(response);
      searchResults = response.payload.products;
      displaySearchResults(searchResults, searchQuery)
    }
  })
  console.log('Search query:', searchQuery);
});

const allProductsBtn = document.getElementById('allProducts');

allProductsBtn.addEventListener('click', function (event) {
  event.preventDefault();
  window.FastSimonSDK.smartCollections({
    categoryID: "292003643599",
    callback: (response) => {
      console.log(response);
      collectionResults = response.payload.products;
      displaySearchResults(collectionResults)
    }
  });
});

function displaySearchResults(results, searchQuery) {
  const searchResultsContainer = document.getElementById('searchResults');

  // Clear previous search results
  searchResultsContainer.innerHTML = '';
  const searchResultsTitle = document.createElement('div');
  searchResultsTitle.classList.add('fs_search_results_title');
  if(searchQuery) {
    searchResultsTitle.innerText = `Search results for: "${searchQuery}", ${results.length} results`;
  } else {
    searchResultsTitle.innerText = `All products, ${results.length} results`;
  }
  searchResultsContainer.appendChild(searchResultsTitle);

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
    searchResultsContainer.appendChild(searchResultsWrapper);
  });
  localStorage.setItem('searchResults', JSON.stringify(results));
}