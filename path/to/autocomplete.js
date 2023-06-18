//Autocomplete
const searchInput = document.getElementById('searchInput');
searchInput.value = getSearch();

searchInput.addEventListener('input', function (event) {
    const searchTerm = event.target.value;
    setUrlParam('search', searchTerm);
    // Use the following code for every keystroke shoppers perform in a searchbox.
    window.FastSimonSDK.instantSearch({
        query: searchTerm,
        callback: (response) => {
            console.log(response);
            displayAutocomplete(response.payload);
        }
    });
    console.log(searchTerm);
});
let linksContainer = document.createElement('div');
function displayAutocomplete(response) {
    productList.innerHTML = '';
    linksContainer.innerHTML = '';
    // Add products to the modal
    response.products.forEach(function (product) {
        // Create a container for each product
        const productContainer = document.createElement('li');
        productContainer.classList.add('fs_product_ac');

        // Add product information to the container
        const productImage = document.createElement('img');
        productImage.classList.add('fs_product_image_ac');
        // product.t is an image URL
        if (product.t) {
            productImage.src = product.t;
        } else {
            productImage.src = 'https://acp-magento.appspot.com/images/missing.gif';
        }

        productContainer.appendChild(productImage);

        if (product.l) {
            const productName = document.createElement('h3');
            productName.classList.add('fs_product_title_ac');
            productName.textContent = product.l;
            productContainer.appendChild(productName);
        }

        if (product.p && product.c) {
            const productPrice = document.createElement('p');
            productPrice.classList.add('fs_product_price_ac');
            productPrice.textContent = `${product.p} ${product.c}`;
            productContainer.appendChild(productPrice);
        }


        // Append the product container to the search results container
        productList.appendChild(productContainer);
    });

    //add links to the modal
    if (response.categories.length > 0 || response.popularSearches.length > 0 || response.turbolinks.length > 0) {
        
        linksContainer.classList.add('fs_links_container');
        productModal.querySelector('.modal-content').appendChild(linksContainer);
        if (response.categories.length > 0) {
            let collectionLinks = document.createElement('div');
            collectionLinks.classList.add('fs_collection_links');
            let collectionLinksTitle = document.createElement('div');
            collectionLinksTitle.classList.add('fs_collection_links_title');
            collectionLinksTitle.innerText = 'collections:';
            collectionLinks.appendChild(collectionLinksTitle);
            response.categories.forEach(category => {
                let collectionLink = document.createElement('div');
                collectionLink.classList.add('fs_collection_links_title');
                collectionLink.innerText = category.l;
                collectionLink.setAttribute('id', category.id);
                collectionLink.addEventListener('click', function (event) {
                    console.log('collection btn clicked');
                    event.preventDefault();
                    collectionID = collectionLink.getAttribute("id");
                    searchResultsContainer.classList.add('fs_collections');
                    if (searchResultsContainer.classList.contains('fs_search')) {
                        searchResultsContainer.classList.remove('fs_search');
                    }
                    currentNarrow = [];
                    smartCollectionsInit(collectionID);
                });
                collectionLinks.appendChild(collectionLink);
            })
            linksContainer.appendChild(collectionLinks);
        }

    }
    // Show the modal
    if (response.products.length > 0) {
        productModal.style.display = 'block';
    } else {
        productModal.style.display = 'none';
    }
}

// Close the modal when the user clicks outside the modal
window.addEventListener('click', function (event) {
    if (event.target !== productModal) {
        productModal.style.display = 'none';
    }
});