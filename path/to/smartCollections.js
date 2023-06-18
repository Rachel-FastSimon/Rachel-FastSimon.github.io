  // SDK Fast Simon collections usage
  function smartCollectionsInit(collectionID) {

    // console.log('checkboxState44433', currentNarrow);
    let narrowBy = getNarrowBy();
    // console.log('checkboxState44455', currentNarrow2);

    window.FastSimonSDK.smartCollections({
      // showing All-products category
      categoryID: collectionID,
    //   narrowBy: currentNarrow,
      narrowBy: narrowBy,
      sortBy: sortBy,
      callback: (response) => {
        console.log(response);
        if (searchResultsContainer.classList.contains('fs_products_loaded')) {
          searchResultsContainer.classList.remove('fs_products_loaded')
        }
        collectionTitle = `Collection "${response.payload.name}"`;
        localStorage.setItem('collectionTitle', collectionTitle);
        collectionResults = response.payload.products;
        collectionFilters = response.payload.facets;
        console.log(collectionFilters);
        // there are 2 actions: we use here only one that contains facets
        if (response.action == fastSimonResponseAction) {
          console.log(fastSimonResponseAction);
          displayFilters(collectionFilters);
          if (!searchResultsContainer.classList.contains('fs_products_loaded')) {
            displaySearchResults(collectionResults, searchResultsContainer, collectionTitle);
          }
        } else {
          console.log('products only');
          displaySearchResults(collectionResults, searchResultsContainer, collectionTitle);
        }
      }
    });
    //Collection Viewed event
    window.FastSimonSDK.event({
      eventName: window.FastSimonEventName.SmartCollectionPreformed,
      data: {
        categoryID: collectionID, // (Required)
        narrowBy: narrowBy,
        sortBy: sortBy
      }
    });
  }


function getNarrowBy() {
    let narrowBy = JSON.parse(url.searchParams.get('checkboxState2'));
    if(!narrowBy) {
        narrowBy = [];
    }
    let minPriceValue = getMinPriceValue(false);
    let maxPriceValue = getMaxPriceValue(false);
    if(minPriceValue && maxPriceValue) {
        let selectedFilters = [];
        selectedFilters.push('Price_from_to');
        selectedFilters.push(minPriceValue + '-' + maxPriceValue);
        narrowBy.push(selectedFilters);
    }
    let selectedColors = getSelectedColors();
    if(selectedColors && selectedColors.size) {
        selectedColors.forEach(color => {
          let selectedFilters = [];
          // selectedFilters.push('Colour');
          // selectedFilters.push('colour:' + color.toLowerCase());
          selectedFilters.push('Colors');
          selectedFilters.push(color);
          // selectedFilters.push(color);
          narrowBy.push(selectedFilters);
        });
    }
    return narrowBy;
}

function getMinPriceValue(useCatalog = true) {
    let minPriceValue = url.searchParams.get('min_price');
    if(!minPriceValue && minPrice && useCatalog) {
        minPriceValue = minPrice;
    }
    return minPriceValue;
}
function getMaxPriceValue(useCatalog = true) {
    let maxPriceValue = url.searchParams.get('max_price');
    if(!maxPriceValue && maxPrice && useCatalog) {
        maxPriceValue = maxPrice;
    }
    return maxPriceValue;
}
