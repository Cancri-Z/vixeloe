/* document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const suggestionsList = document.getElementById('suggestions-list');

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

    // Hide the suggestions list when clicking outside of it
    document.addEventListener('click', (e) => {
        if (!suggestionsList.contains(e.target) && e.target !== searchInput) {
            suggestionsList.style.display = 'none';
        }
    });
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
    const uniqueSuggestions = [...new Set(suggestions)]; // Remove duplicates
    if (uniqueSuggestions.length > 0) {
        uniqueSuggestions.forEach(suggestion => {
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
 */

/* document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const suggestionsList = document.getElementById('suggestions-list');

    console.log('searchForm:', searchForm);
    console.log('searchInput:', searchInput);
    console.log('searchButton:', searchButton);
    console.log('suggestionsList:', suggestionsList);

    if (searchInput) {
        searchInput.addEventListener('input', debounce(fetchSuggestions, 300));
    } else {
        console.error('searchInput element not found');
    }

    if (searchButton) {
        searchButton.addEventListener('click', (e) => {
            e.preventDefault();
            performSearch();
        });
    } else {
        console.error('searchButton element not found');
    }

    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            performSearch();
        });
    } else {
        console.error('searchForm element not found');
    }

    // Hide the suggestions list when clicking outside of it
    document.addEventListener('click', (e) => {
        if (!suggestionsList.contains(e.target) && e.target !== searchInput) {
            suggestionsList.style.display = 'none';
        }
    });
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
        suggestionsList.style.display = 'none';
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
        suggestionsList.style.display = 'block';
    }
}

function displaySuggestions(suggestions) {
    const suggestionsList = document.getElementById('suggestions-list');
    suggestionsList.innerHTML = '';
    const uniqueSuggestions = [...new Set(suggestions)]; // Remove duplicates
    if (uniqueSuggestions.length > 0) {
        uniqueSuggestions.forEach(suggestion => {
            const div = document.createElement('div');
            div.textContent = suggestion;
            div.classList.add('suggestion');
            div.tabIndex = 0;
            div.addEventListener('click', () => {
                document.getElementById('searchInput').value = suggestion;
                suggestionsList.style.display = 'none';
                performSearch();
            });
            div.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    document.getElementById('searchInput').value = suggestion;
                    suggestionsList.style.display = 'none';
                    performSearch();
                }
            });
            suggestionsList.appendChild(div);
        });
        suggestionsList.style.display = 'block';
    } else {
        suggestionsList.innerHTML = '<p>No suggestions found.</p>';
        suggestionsList.style.display = 'block';
    }
}

function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
} */

    document.addEventListener('DOMContentLoaded', () => {
        const searchForm = document.getElementById('searchForm');
        const searchInput = document.getElementById('searchInput');
        const searchButton = document.getElementById('searchButton');
        const suggestionsList = document.getElementById('suggestions-list');
    
        if (searchInput) {
            searchInput.addEventListener('input', debounce(fetchSuggestions, 300));
        } else {
            console.error('searchInput element not found');
        }
    
        if (searchButton) {
            searchButton.addEventListener('click', (e) => {
                e.preventDefault();
                performSearch();
            });
        } else {
            console.error('searchButton element not found');
        }
    
        if (searchForm) {
            searchForm.addEventListener('submit', (e) => {
                e.preventDefault();
                performSearch();
            });
        } else {
            console.error('searchForm element not found');
        }
    
        // Hide the suggestions list when clicking outside of it
        document.addEventListener('click', (e) => {
            if (!suggestionsList.contains(e.target) && e.target !== searchInput) {
                suggestionsList.style.display = 'none';
            }
        });
    });
    
    function performSearch() {
        const query = document.getElementById('searchInput').value.trim();
        if (query) {
            window.location.href = `/search-results?query=${encodeURIComponent(query)}`;
        }
    }
    
    async function fetchSuggestions() {
        const searchInput = document.getElementById('searchInput');
        const suggestionsList = document.getElementById('suggestions-list');
        const query = searchInput.value.trim();
        if (query.length < 2) {
            suggestionsList.innerHTML = '';
            suggestionsList.style.display = 'none';
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
            suggestionsList.style.display = 'block';
        }
    }
    
    function displaySuggestions(suggestions) {
        const suggestionsList = document.getElementById('suggestions-list');
        suggestionsList.innerHTML = '';
        const uniqueSuggestions = [...new Set(suggestions)];
        if (uniqueSuggestions.length > 0) {
            uniqueSuggestions.forEach(suggestion => {
                const div = document.createElement('div');
                div.textContent = suggestion;
                div.classList.add('suggestion');
                div.tabIndex = 0;
                div.addEventListener('click', () => {
                    document.getElementById('searchInput').value = suggestion;
                    suggestionsList.style.display = 'none';
                    performSearch();
                });
                div.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter') {
                        document.getElementById('searchInput').value = suggestion;
                        suggestionsList.style.display = 'none';
                        performSearch();
                    }
                });
                suggestionsList.appendChild(div);
            });
            suggestionsList.style.display = 'block';
        } else {
            suggestionsList.innerHTML = '<p>No suggestions found.</p>';
            suggestionsList.style.display = 'block';
        }
    }
    
    function debounce(func, delay) {
        let timeoutId;
        return function (...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    }
    
