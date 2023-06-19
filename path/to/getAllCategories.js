//Get all categories
function getAllCategories() {
    window.FastSimonSDK.getAllCategories((response) => {
        console.log(response);
        // Assuming there's a container element in your HTML to hold the buttons
        const container = document.getElementById('button-container');

        // Iterate over the response array and create buttons
        response.forEach(item => {
            const collectionButton = document.createElement('button');
            collectionButton.classList.add('fs_collections_btn');
            collectionButton.textContent = item.l;
            collectionButton.setAttribute('id', item.id);
            collectionButton.addEventListener('click', function (event) {
                console.log('collection btn clicked');
                event.preventDefault();
                collectionID = collectionButton.getAttribute("id");
                localStorage.setItem('collectionID', collectionID);
                localStorage.removeItem('checkboxState');
                searchResultsContainer.classList.add('fs_collections');
                if (searchResultsContainer.classList.contains('fs_search')) {
                    searchResultsContainer.classList.remove('fs_search');
                }
                currentNarrow = [];
                // url.searchParams.forEach((value, key) => {
                //     url.searchParams.delete(key);
                // });
                // url.searchParams.delete('color');
                // url.searchParams.delete('min_price');
                // url.searchParams.delete('max_price');
                // url.searchParams.delete('checkboxState');
                // url.searchParams.delete('checkboxState2');
                // url.searchParams.delete('size');
                // url.searchParams.delete('search');
                // searchInput.value = '';
                clearFilters();
                setUrlParam('collectionID', collectionID, true);
                // smartCollectionsInit(collectionID);
            });

            // Add the button to the container
            container.appendChild(collectionButton);
        });
    }, true);
};

function clearFilters() {
    url.searchParams.delete('color');
    url.searchParams.delete('min_price');
    url.searchParams.delete('max_price');
    url.searchParams.delete('checkboxState');
    url.searchParams.delete('checkboxState2');
    url.searchParams.delete('size');
    url.searchParams.delete('search');
    searchInput.value = '';
}