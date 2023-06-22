function isSearchPage() {
    return getUrlParam('search');
}

function setUrlParam(paramName, paramValue, refresh = false, delay = 0) {
    url.searchParams.set(paramName, paramValue);
    window.history.replaceState(null, null, url.toString());
    if (refresh) {
        refreshResults(delay);
    }
}

function getUrlParam(param) {
    return url.searchParams.get(param);
}

function initPage() {
    // if (searchResultsContainer.classList.contains('fs_search')) {
    if (isSearchPage()) {
        fullSearchInit();
    } else {
        smartCollectionsInit(collectionID);
    }
}