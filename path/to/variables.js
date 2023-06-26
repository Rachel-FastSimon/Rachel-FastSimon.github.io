const fastSimonResponseAction = 'facets and products';
const searchForm = document.getElementById('searchForm');
const searchResultsContainer = document.getElementById('searchResults');
// let collectionID = localStorage.getItem('collectionID') || '292003643599';
let url = new URL(window.location.href);
let collectionTitle = localStorage.getItem('collectionTitle') || 'All products';
let currentNarrow = [];
let searchResults;
// let sortBy = localStorage.getItem('sortBy') || 'relevancy';
let minPrice;
let maxPrice;
let priceSlider;
// Get the current URL




