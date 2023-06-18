  function displaySearchResults(results, container, searchQuery) {

    // Clear previous search results
    container.innerHTML = '';
    const searchResultsTitle = document.createElement('div');
    searchResultsTitle.classList.add('fs_search_results_title');
    if (searchQuery) {
      searchResultsTitle.innerText = `Results for: ${searchQuery}, ${results.length} results`;
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

      //colorswatches
      if(product.vra.length > 1) {
        showColorswatches(product, productContainer);

      }

      // Append the product container to the search results container
      searchResultsWrapper.appendChild(productContainer);
      container.appendChild(searchResultsWrapper);
    });
    localStorage.setItem('searchResults', JSON.stringify(results));
    searchResultsContainer.classList.add('fs_products_loaded');
  }