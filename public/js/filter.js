document.addEventListener('DOMContentLoaded', function() {
  const overlay = document.getElementById('overlay'); // Ensure this ID matches your HTML
  const filterTitle = document.getElementById('titleX');
  const filterAside = document.querySelector('.aside');
  const prdDisplay = document.getElementById('prd-display');
  const relatedSearch = document.getElementById('relatedsearch-section');
  const topSearchSection = document.getElementById('topsearch-section');
  const bannerImg = document.getElementById('banner-image');
  const footer = document.getElementById('footer');
  const result = document.getElementById('result');
  const closeBtn = filterAside.querySelector('.close-btn');
  const body = document.body;

  function toggleFilter() {
      filterAside.classList.toggle('show');
      body.classList.toggle('no-scroll');

      // Toggle the blur-fixed class on the divs
      prdDisplay.classList.toggle('blur-fixed');
      relatedSearch.classList.toggle('blur-fixed');
      topSearchSection.classList.toggle('blur-fixed');
      bannerImg.classList.toggle('blur-fixed');
      result.classList.toggle('blur-fixed');

      // Toggle the close-icon class on #titleX
      filterTitle.classList.toggle('close-icon');

      // Update the content of #titleX
      if (filterTitle.classList.contains('close-icon')) {
          filterTitle.innerHTML = '&times;';
      } else {
          filterTitle.innerHTML = '<i class="fa-solid fa-filter"></i> Filter';
      }
  }

  if (filterTitle) {
      filterTitle.addEventListener('click', toggleFilter);
  } else {
      console.error('Filter title element not found');
  }

  if (closeBtn) {
      closeBtn.addEventListener('click', () => {
          closeBtn.addEventListener('click', closeAside);
      });
  } else {
      console.error('Close button not found');
  }

  if (overlay) {
      overlay.addEventListener('click', closeAside);
  } else {
      console.error('Overlay element not found');
  }
});
