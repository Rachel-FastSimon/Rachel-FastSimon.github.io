function isSearchPage() {
    return getUrlParam('search');
}

// function setUrlParam(paramName, paramValue, refresh = false, delay = 0) {
//     url.searchParams.set(paramName, paramValue);
//     window.history.replaceState(null, null, url.toString());
//     // if (refresh) {
//     //     refreshResults(delay);
//     // }
// }
function setUrlParam(paramName, paramValue) {
    url.searchParams.set(paramName, paramValue);
    window.history.replaceState(null, null, url.toString());
    // if (refresh) {
    //     refreshResults(delay);
    // }
}

function getUrlParam(param) {
    return url.searchParams.get(param);
}

function initPage() {
    // alert('a');
    // if (searchResultsContainer.classList.contains('fs_search')) {
    if (isSearchPage()) {
        fullSearchInit();
    } else {
        smartCollectionsInit();
    }
}

    //listening for changes in the URL
    window.addEventListener('popstate', function (event) {
        // Handle the URL change event here
        console.log('URL changed111:', window.location.href);
        // Perform any actions or updates based on the new URL
    });


    window.onpopstate = (event) => {
        console.log(
          `location222: ${document.location}, state: ${JSON.stringify(event.state)}`
        );
      };

      var _wr = function(type) {
        var orig = history[type];
        return function() {
            var rv = orig.apply(this, arguments);
            var e = new Event(type);
            e.arguments = arguments;
            window.dispatchEvent(e);
            return rv;
        };
    };
    history.pushState = _wr('pushState'), history.replaceState = _wr('replaceState');

      window.addEventListener('replaceState', function(e) {
        initPage();
    });