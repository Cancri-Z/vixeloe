document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const suggestionsContainer = document.getElementById('suggestions-container');

    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            performSearch();
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', debounce(fetchSuggestions, 300));
    }

    async function fetchSuggestions() {
        const query = searchInput.value.trim();
        if (query === '') {
            suggestionsContainer.innerHTML = '';
            return;
        }

        try {
            const response = await fetch(`/api/search-suggestions?query=${encodeURIComponent(query)}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const text = await response.text(); // Get the raw text first
            console.log('Raw response:', text); // Log the raw response
            const suggestions = JSON.parse(text); // Then parse it
            displaySuggestions(suggestions);
        } catch (error) {
            console.error('Error fetching suggestions:', error);
            suggestionsContainer.innerHTML = '<p>Error fetching suggestions. Please try again.</p>';
        }
    }

    function displaySuggestions(suggestions) {
        suggestionsContainer.innerHTML = '';
        if (suggestions.length > 0) {
            suggestions.forEach(suggestion => {
                const suggestionElement = document.createElement('div');
                suggestionElement.className = 'suggestion-item';
                suggestionElement.textContent = suggestion;
                suggestionElement.addEventListener('click', () => {
                    searchInput.value = suggestion;
                    suggestionsContainer.innerHTML = '';
                    performSearch();
                });
                suggestionsContainer.appendChild(suggestionElement);
            });
        } else {
            suggestionsContainer.innerHTML = '<p>No suggestions found.</p>';
        }
    }

    function performSearch() {
        const query = searchInput.value.trim();
        if (query !== '') {
            window.location.href = `/search-results?query=${encodeURIComponent(query)}`;
        }
    }

    function debounce(func, wait) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }
});
