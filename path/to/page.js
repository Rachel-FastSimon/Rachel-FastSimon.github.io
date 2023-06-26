function isSearchPage() {
    return getUrlParam('search');
}

function setUrlParam(paramName, paramValue) {
    url.searchParams.set(paramName, paramValue);
    window.history.replaceState(null, null, url.toString());
}

function getUrlParam(param) {
    return url.searchParams.get(param);
}

function initPage() {
    if (isSearchPage()) {
        fullSearchInit();
    } else {
        smartCollectionsInit();
    }
}

//listening for changes in the URL
var _wr = function (type) {
    var orig = history[type];
    return function () {
        var rv = orig.apply(this, arguments);
        var e = new Event(type);
        e.arguments = arguments;
        window.dispatchEvent(e);
        return rv;
    };
};
history.pushState = _wr('pushState'), history.replaceState = _wr('replaceState');

window.addEventListener('replaceState', function (e) {
    initPage();
});