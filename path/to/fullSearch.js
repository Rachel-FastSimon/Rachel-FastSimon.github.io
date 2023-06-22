  // SDK Fast Simon search usage
  function fullSearchInit() {
    let searchQuery = document.getElementById('searchInput').value;
    searchQuery = `"${searchQuery}"`;
    let narrowBy = getNarrowBy();
    let sortBy = getSortBy();

    window.FastSimonSDK.fullTextSearch({
      term: searchQuery,
      narrowBy: narrowBy,
      sortBy: sortBy,
      callback: (response) => {
        console.log(response);
        if (searchResultsContainer.classList.contains('fs_products_loaded')) {
          searchResultsContainer.classList.remove('fs_products_loaded')
        }
        searchResults = response.payload.products;
        searchFilters = response.payload.facets;
        // there are 2 actions: we use here only one that contains facets
        if (response.action == fastSimonResponseAction) {
          console.log(fastSimonResponseAction);
          displayFilters(searchFilters);
          if (!searchResultsContainer.classList.contains('fs_products_loaded')) {
            displaySearchResults(searchResults, searchResultsContainer, searchQuery);
          }
        } else {
          displaySearchResults(searchResults, searchResultsContainer, searchQuery);
          console.log('products only');
        }
      }
    });
    //Search Result page viewed event
    window.FastSimonSDK.event({
      eventName: window.FastSimonEventName.SearchPerformed,
      data: {
        query: searchQuery, // (Required)
        narrowBy: currentNarrow,
        sortBy: sortBy
      }
    });
  }
  searchForm.addEventListener('submit', function (event) {
    event.preventDefault();
    localStorage.removeItem('checkboxState');
    searchResultsContainer.classList.add('fs_search');
    if (searchResultsContainer.classList.contains('fs_collections')) {
      searchResultsContainer.classList.remove('fs_collections');
    }
    currentNarrow = [];
    fullSearchInit();

  });