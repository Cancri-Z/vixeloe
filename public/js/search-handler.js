document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');

    if (searchInput) {
        searchInput.addEventListener('input', debounce(fetchSuggestions, 300));
    }

    if (searchButton) {
        searchButton.addEventListener('click', (e) => {
            e.preventDefault();
            performSearch();
        });
    }

    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            performSearch();
        });
    }
});

function performSearch() {
    const query = document.getElementById('searchInput').value.trim();
    if (query) {
        console.log('Performing search for:', query);
        window.location.href = `/search-results?query=${encodeURIComponent(query)}`;
    }
}



async function fetchSuggestions() {
    const searchInput = document.getElementById('searchInput');
    const suggestionsList = document.getElementById('suggestions-list');
    const query = searchInput.value.trim();
    if (query.length < 2) {
        suggestionsList.innerHTML = '';
        return;
    }

    try {
        const response = await fetch(`/api/search-suggestions?query=${encodeURIComponent(query)}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const suggestions = await response.json();
        displaySuggestions(suggestions);
    } catch (error) {
        console.error('Error fetching suggestions:', error);
        suggestionsList.innerHTML = '<p>Error fetching suggestions. Please try again.</p>';
    }
}

function displaySuggestions(suggestions) {
    const suggestionsList = document.getElementById('suggestions-list');
    suggestionsList.innerHTML = '';
    if (suggestions.length > 0) {
        suggestions.forEach(suggestion => {
            const div = document.createElement('div');
            div.textContent = suggestion;
            div.classList.add('suggestion');
            div.addEventListener('click', () => {
                document.getElementById('searchInput').value = suggestion;
                suggestionsList.style.display = 'none';
                performSearch();
            });
            suggestionsList.appendChild(div);
        });
        suggestionsList.style.display = 'block';
    } else {
        suggestionsList.style.display = 'none';
    }
}

function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

async function fetchSuggestions() {
    const searchInput = document.getElementById('searchInput');
    const suggestionsList = document.getElementById('suggestions-list');
    const query = searchInput.value.trim();
    if (query.length < 2) {
        suggestionsList.innerHTML = '';
        return;
    }

    try {
        const response = await fetch(`/api/search-suggestions?query=${encodeURIComponent(query)}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const suggestions = await response.json();
        displaySuggestions(suggestions);
    } catch (error) {
        console.error('Error fetching suggestions:', error);
        suggestionsList.innerHTML = '<p>Error fetching suggestions. Please try again.</p>';
    }
}

function displaySuggestions(suggestions) {
    const suggestionsList = document.getElementById('suggestions-list');
    suggestionsList.innerHTML = '';
    if (suggestions.length > 0) {
        suggestions.forEach(suggestion => {
            const div = document.createElement('div');
            div.textContent = suggestion;
            div.classList.add('suggestion');
            div.addEventListener('click', () => {
                document.getElementById('searchInput').value = suggestion;
                suggestionsList.style.display = 'none';
                performSearch();
            });
            suggestionsList.appendChild(div);
        });
        suggestionsList.style.display = 'block';
    } else {
        suggestionsList.style.display = 'none';
    }
}


