
//Toggle Phone/Accessories
document.addEventListener('DOMContentLoaded', function() {
    const phoneRadio = document.getElementById('phone');
    const accessoriesRadio = document.getElementById('accessories');
    const phoneDiv = document.getElementById('phoneDiv');
    const accessoriesDiv = document.getElementById('accessoriesDiv');
  
    function updateDisplay() {
      if (phoneRadio.checked) {
        phoneDiv.style.display = 'block';
        accessoriesDiv.style.display = 'none';
      } else if (accessoriesRadio.checked) {
        phoneDiv.style.display = 'none';
        accessoriesDiv.style.display = 'block';
      }
    }
  
    // Attach event listeners
    phoneRadio.addEventListener('change', updateDisplay);
    accessoriesRadio.addEventListener('change', updateDisplay);
  
    // Initial setup (in case page is refreshed with a selection)
    updateDisplay();
  });



  //Image Upload

  document.addEventListener('DOMContentLoaded', function() {
    const cameraInput = document.getElementById('camEra');
    const galleryInput = document.getElementById('gallEry');
    const imageContainer = document.getElementById('divImg1');
    let imageCounter = 0;
  
    function handleFiles(files, source) {
      for (let file of files) {
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = function(e) {
            createImageElement(e.target.result, source);
          };
          reader.readAsDataURL(file);
        } else {
          alert('Please select only image files.');
        }
      }
    }
  
    function createImageElement(imgSrc, source) {
      imageCounter++;
      const imgDiv = document.createElement('div');
      imgDiv.className = 'imgDiv';
      imgDiv.innerHTML = `
        <div class="imgNum">${imageCounter}</div>
        <div class="delete"><i class="fa-solid fa-trash"></i></div>
        <div class="edit"><i class="fa-solid fa-pen"></i></div>
        <img src="${imgSrc}" alt="Uploaded Image">
        <div class="imgSource">${source}</div>
      `;
      imageContainer.appendChild(imgDiv);
  
      // Setup delete functionality
      imgDiv.querySelector('.delete').addEventListener('click', function() {
        imageContainer.removeChild(imgDiv);
        updateImageNumbers();
      });
  
      // Setup edit functionality
      imgDiv.querySelector('.edit').addEventListener('click', function() {
        const tempInput = document.createElement('input');
        tempInput.type = 'file';
        tempInput.accept = 'image/*';
        tempInput.click();
  
        tempInput.addEventListener('change', function(e) {
          if (e.target.files.length > 0) {
            const file = e.target.files[0];
            if (file.type.startsWith('image/')) {
              const reader = new FileReader();
              reader.onload = function(event) {
                imgDiv.querySelector('img').src = event.target.result;
                imgDiv.querySelector('.imgSource').textContent = 'Gallery (Edited)';
              };
              reader.readAsDataURL(file);
            } else {
              alert('Please select only image files.');
            }
          }
        });
      });
    }
  
    function updateImageNumbers() {
      imageCounter = 0;
      imageContainer.querySelectorAll('.imgNum').forEach((numDiv, index) => {
        imageCounter = index + 1;
        numDiv.textContent = imageCounter;
      });
    }
  
    cameraInput.addEventListener('change', function(e) {
      handleFiles(e.target.files, 'Camera');
      this.value = ''; // Allow re-selecting the same file
    });
  
    galleryInput.addEventListener('change', function(e) {
      handleFiles(e.target.files, 'Gallery');
      this.value = ''; // Allow re-selecting the same file(s)
    });
  });


  //Toggle publish options
  document.addEventListener('DOMContentLoaded', function() {
    const businessOption = document.getElementById('popt-1');
    const individualOption = document.getElementById('popt-2');
    const optionField = document.getElementById('option-field');

    businessOption.addEventListener('click', function() {
        optionField.style.display = 'flex';
        businessOption.classList.add('selected');
        individualOption.classList.remove('selected');
    });

    individualOption.addEventListener('click', function() {
        optionField.style.display = 'none';
        individualOption.classList.add('selected');
        businessOption.classList.remove('selected');
    });
});
