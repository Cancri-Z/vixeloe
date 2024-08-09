
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


document.addEventListener('DOMContentLoaded', () => {
  const hiddenBrands = document.getElementById('hidden-brands');

  hiddenBrands.addEventListener('animationstart', () => {
      hiddenBrands.classList.add('no-scale');
  });

  hiddenBrands.addEventListener('animationend', () => {
      hiddenBrands.classList.remove('no-scale');
  });

  // Example function to show/hide the #hidden-brands div
  function toggleHiddenBrands() {
      if (hiddenBrands.classList.contains('show')) {
          hiddenBrands.classList.remove('show');
          hiddenBrands.classList.add('hide');
      } else {
          hiddenBrands.classList.remove('hide');
          hiddenBrands.classList.add('show');
      }
  }

  // Call the toggle function based on some event, e.g., button click
  document.getElementById('toggle-button').addEventListener('click', toggleHiddenBrands);
});



//for accessories
document.addEventListener('DOMContentLoaded', function() {
  const accessoryTypeSelect = document.getElementById('accessoryType');
  const accessoryDetailsDiv = document.getElementById('accessoryDetails');

  const accessoryFields = {
      headphones: [
          {type: 'select', name: 'headphoneType', label: 'Headphone Type', options: ['Over-ear', 'On-ear', 'In-ear', 'True Wireless']},
          {type: 'checkbox', name: 'features', label: 'Features', options: ['Noise Cancellation', 'Bluetooth', 'Wired', 'Microphone']},
          {type: 'number', name: 'batteryLife', label: 'Battery Life (hours)'},
          {type: 'text', name: 'connectionType', label: 'Connection Type'}
      ],
      screenProtector: [
          {type: 'select', name: 'material', label: 'Material', options: ['Tempered Glass', 'PET', 'TPU']},
          {type: 'checkbox', name: 'features', label: 'Features', options: ['Anti-Fingerprint', 'Anti-Glare', 'Privacy']},
          {type: 'text', name: 'compatibility', label: 'Compatible Phone Models'},
          {type: 'number', name: 'thickness', label: 'Thickness (mm)'}
      ],
      phoneCase: [
          {type: 'select', name: 'material', label: 'Material', options: ['Silicone', 'Leather', 'Plastic', 'Metal']},
          {type: 'checkbox', name: 'features', label: 'Features', options: ['Shockproof', 'Waterproof', 'Kickstand', 'Card Holder']},
          {type: 'text', name: 'compatibility', label: 'Compatible Phone Models'},
          {type: 'color', name: 'color', label: 'Color'}
      ],
      charger: [
          {type: 'select', name: 'chargerType', label: 'Charger Type', options: ['Wall Charger', 'Car Charger', 'Portable Charger']},
          {type: 'number', name: 'outputWattage', label: 'Output Wattage'},
          {type: 'checkbox', name: 'features', label: 'Features', options: ['Fast Charging', 'Multiple Ports', 'Foldable Plug']},
          {type: 'text', name: 'cableType', label: 'Cable Type (if included)'}
      ],
      powerBank: [
          {type: 'number', name: 'capacity', label: 'Capacity (mAh)'},
          {type: 'number', name: 'outputPorts', label: 'Number of Output Ports'},
          {type: 'checkbox', name: 'features', label: 'Features', options: ['Fast Charging', 'Wireless Charging', 'LED Indicator', 'Compact Design']},
          {type: 'text', name: 'compatibleDevices', label: 'Compatible Devices'}
      ],
      selfieStick: [
        {type: 'select', name: 'stickType', label: 'Stick Type', options: ['Wired', 'Bluetooth']},
        {type: 'checkbox', name: 'features', label: 'Features', options: ['Foldable', 'Extendable', 'Tripod Mode']},
        {type: 'number', name: 'maxLength', label: 'Max Length (cm)'},
        {type: 'text', name: 'compatibility', label: 'Compatible Phone Models'}
    ],
      wirelessCharger: [
          {type: 'number', name: 'chargingSpeed', label: 'Charging Speed (W)'},
          {type: 'checkbox', name: 'features', label: 'Features', options: ['Fast Charging', 'Multiple Device Charging', 'Compact Design']},
          {type: 'text', name: 'compatibleDevices', label: 'Compatible Devices'},
          {type: 'text', name: 'inputType', label: 'Input Type (e.g., USB-C, Micro USB)'}
      ],
      bluetoothSpeaker: [
          {type: 'number', name: 'batteryLife', label: 'Battery Life (hours)'},
          {type: 'checkbox', name: 'features', label: 'Features', options: ['Waterproof', 'Bluetooth 5.0', 'Built-in Microphone']},
          {type: 'number', name: 'outputPower', label: 'Output Power (W)'},
          {type: 'text', name: 'connectionType', label: 'Connection Type (e.g., Bluetooth, Aux)'}
      ],
      smartWatch: [
          {type: 'select', name: 'watchType', label: 'Watch Type', options: ['Fitness Tracker', 'Smartwatch', 'Hybrid']},
          {type: 'checkbox', name: 'features', label: 'Features', options: ['Heart Rate Monitor', 'GPS', 'Waterproof', 'Sleep Tracking']},
          {type: 'number', name: 'batteryLife', label: 'Battery Life (days)'},
          {type: 'text', name: 'compatibility', label: 'Compatible Devices'}
      ],
      memoryCard: [
          {type: 'select', name: 'cardType', label: 'Card Type', options: ['SD', 'microSD', 'CF']},
          {type: 'number', name: 'capacity', label: 'Capacity (GB)'},
          {type: 'number', name: 'readSpeed', label: 'Read Speed (MB/s)'},
          {type: 'number', name: 'writeSpeed', label: 'Write Speed (MB/s)'}
      ],
      others: [
        {type: 'text', name: 'name', label: 'Accessory Name'},
        {type: 'text', name: 'description', label: 'Description'},
        {type: 'text', name: 'brand', label: 'Brand'},
        {type: 'text', name: 'model', label: 'Model'},
        {type: 'checkbox', name: 'features', label: 'Features', options: ['Feature 1', 'Feature 2', 'Feature 3']},
        {type: 'number', name: 'price', label: 'Price (₦)'},
        {type: 'color', name: 'color', label: 'Color'}
    ]
      // Add more accessory types here...
  };




  

//for color picker
document.addEventListener('DOMContentLoaded', function() {
  const colorInput = document.getElementById('colorBar');
  const colorDisplay = document.getElementById('colorDisplay');

  colorInput.addEventListener('input', function() {
      colorDisplay.style.backgroundColor = colorInput.value;
  });
});




  accessoryTypeSelect.addEventListener('change', function() {
      const selectedType = this.value;
      if (selectedType && accessoryFields[selectedType]) {
          accessoryDetailsDiv.innerHTML = generateFields(accessoryFields[selectedType]);
      } else {
          accessoryDetailsDiv.innerHTML = '';
      }
  });

  function generateFields(fields) {
      return fields.map(field => {
          switch(field.type) {
              case 'select':
                  return `
                      <div class="form-group">
                          <label for="${field.name}">${field.label}</label>
                          <select name="${field.name}" id="${field.name}" class="select-styled">
                              ${field.options.map(option => `<option value="${option}">${option}</option>`).join('')}
                          </select>
                      </div>
                  `;
              case 'checkbox':
                  return `
                      <div class="form-group">
                          <label>${field.label}</label>
                          <div class="checkbox-group">
                              ${field.options.map(option => `
                                  <label>
                                      <input type="checkbox" name="${field.name}" value="${option}">
                                      ${option}
                                  </label>
                              `).join('')}
                          </div>
                      </div>
                  `;
              case 'number':
              case 'text':
              case 'color':
                  return `
                      <div class="form-group">
                          <label for="${field.name}">${field.label}</label>
                          <input type="${field.type}" name="${field.name}" id="${field.name}" class="input-styled">
                      </div>
                  `;
          }
      }).join('');
  }
});




document.addEventListener('DOMContentLoaded', function() {
  const statesAndLcdas = {
    'Abia': ['Aba North', 'Aba South', 'Arochukwu', 'Bende', 'Ikwuano', 'Isiala Ngwa North', 'Isiala Ngwa South', 'Isuikwuato', 'Obi Ngwa', 'Ohafia', 'Osisioma Ngwa', 'Ugwunagbo', 'Ukwa East', 'Ukwa West', 'Umuahia North', 'Umuahia South', 'Umu Nneochi'],

    'Adamawa': ['Demsa', 'Fufore', 'Ganye', 'Girei', 'Gombi', 'Guyuk', 'Hong', 'Jada', 'Lamurde', 'Madagali', 'Maiha', 'Mayo Belwa', 'Michika', 'Mubi North', 'Mubi South', 'Numan', 'Shelleng', 'Song', 'Toungo', 'Yola North', 'Yola South'],

    'Akwa Ibom': ['Abak', 'Eastern Obolo', 'Eket', 'Esit Eket', 'Essien Udim', 'Etim Ekpo', 'Etinan', 'Ibeno', 'Ibesikpo Asutan', 'Ibiono Ibom', 'Ika', 'Ikono', 'Ikot Abasi', 'Ikot Ekpene', 'Ini', 'Itu', 'Mbo', 'Mkpat Enin', 'Nsit Atai', 'Nsit Ibom', 'Nsit Ubium', 'Obot Akara', 'Okobo', 'Onna', 'Oron', 'Oruk Anam', 'Udung Uko', 'Ukanafun', 'Uruan', 'Urue-Offong/Oruko', 'Uyo'],

    'Anambra': ['Aguata', 'Anambra East', 'Anambra West', 'Anaocha', 'Awka North', 'Awka South', 'Ayamelum', 'Dunukofia', 'Ekwusigo', 'Idemili North', 'Idemili South', 'Ihiala', 'Njikoka', 'Nnewi North', 'Nnewi South', 'Ogbaru', 'Onitsha North', 'Onitsha South', 'Orumba North', 'Orumba South', 'Oyi'],

    'Bauchi': ['Alkaleri', 'Bauchi', 'Bogoro', 'Damban', 'Darazo', 'Dass', 'Gamawa', 'Ganjuwa', 'Giade', 'Itas/Gadau', 'Jama\'are', 'Katagum', 'Kirfi', 'Misau', 'Ningi', 'Shira', 'Tafawa Balewa', 'Toro', 'Warji', 'Zaki'],

    'Bayelsa': ['Brass', 'Ekeremor', 'Kolokuma/Opokuma', 'Nembe', 'Ogbia', 'Sagbama', 'Southern Ijaw', 'Yenagoa'],

    'Benue': ['Ado', 'Agatu', 'Apa', 'Buruku', 'Gboko', 'Guma', 'Gwer East', 'Gwer West', 'Katsina-Ala', 'Konshisha', 'Kwande', 'Logo', 'Makurdi', 'Obi', 'Ogbadibo', 'Ohimini', 'Oju', 'Okpokwu', 'Otukpo', 'Tarka', 'Ukum', 'Ushongo', 'Vandeikya'],

    'Borno': ['Abadam', 'Askira/Uba', 'Bama', 'Bayo', 'Biu', 'Chibok', 'Damboa', 'Dikwa', 'Gubio', 'Guzamala', 'Gwoza', 'Hawul', 'Jere', 'Kaga', 'Kala/Balge', 'Konduga', 'Kukawa', 'Kwaya Kusar', 'Mafa', 'Magumeri', 'Maiduguri', 'Marte', 'Mobbar', 'Monguno', 'Ngala', 'Nganzai', 'Shani'],

    'Cross River': ['Abi', 'Akamkpa', 'Akpabuyo', 'Bakassi', 'Bekwarra', 'Biase', 'Boki', 'Calabar Municipal', 'Calabar South', 'Etung', 'Ikom', 'Obanliku', 'Obubra', 'Obudu', 'Odukpani', 'Ogoja', 'Yakuur', 'Yala'],

    'Delta': ['Aniocha North', 'Aniocha South', 'Bomadi', 'Burutu', 'Ethiope East', 'Ethiope West', 'Ika North East', 'Ika South', 'Isoko North', 'Isoko South', 'Ndokwa East', 'Ndokwa West', 'Okpe', 'Oshimili North', 'Oshimili South', 'Patani', 'Sapele', 'Udu', 'Ughelli North', 'Ughelli South', 'Ukwuani', 'Uvwie', 'Warri North', 'Warri South', 'Warri South West'],

    'Ebonyi': ['Abakaliki', 'Afikpo North', 'Afikpo South', 'Ebonyi', 'Ezza North', 'Ezza South', 'Ikwo', 'Ishielu', 'Ivo', 'Izzi', 'Ohaozara', 'Ohaukwu', 'Onicha'],

    'Edo': ['Akoko-Edo', 'Egor', 'Esan Central', 'Esan North-East', 'Esan South-East', 'Esan West', 'Etsako Central', 'Etsako East', 'Etsako West', 'Igueben', 'Ikpoba-Okha', 'Oredo', 'Orhionmwon', 'Ovia North-East', 'Ovia South-West', 'Owan East', 'Owan West', 'Uhunmwonde'],

    'Ekiti': ['Ado Ekiti', 'Efon', 'Ekiti East', 'Ekiti South-West', 'Ekiti West', 'Emure', 'Gbonyin', 'Ido Osi', 'Ijero', 'Ikere', 'Ikole', 'Ilejemeje', 'Irepodun/Ifelodun', 'Ise/Orun', 'Moba', 'Oye'],

    'Enugu': ['Aninri', 'Awgu', 'Enugu East', 'Enugu North', 'Enugu South', 'Ezeagu', 'Igbo Etiti', 'Igbo Eze North', 'Igbo Eze South', 'Isi Uzo', 'Nkanu East', 'Nkanu West', 'Nsukka', 'Oji River', 'Udenu', 'Udi', 'Uzo-Uwani'],

    'Gombe': ['Akko', 'Balanga', 'Billiri', 'Dukku', 'Funakaye', 'Gombe', 'Kaltungo', 'Kwami', 'Nafada', 'Shongom', 'Yamaltu/Deba'],

    'Imo': ['Aboh Mbaise', 'Ahiazu Mbaise', 'Ehime Mbano', 'Ezinihitte', 'Ideato North', 'Ideato South', 'Ihitte/Uboma', 'Ikeduru', 'Isiala Mbano', 'Isu', 'Mbaitoli', 'Ngor Okpala', 'Njaba', 'Nkwerre', 'Nwangele', 'Obowo', 'Oguta', 'Ohaji/Egbema', 'Okigwe', 'Onuimo', 'Orlu', 'Orsu', 'Oru East', 'Oru West', 'Owerri Municipal', 'Owerri North', 'Owerri West'],

    'Jigawa': ['Auyo', 'Babura', 'Biriniwa', 'Birnin Kudu', 'Buji', 'Dutse', 'Gagarawa', 'Garki', 'Gumel', 'Guri', 'Gwaram', 'Gwiwa', 'Hadejia', 'Jahun', 'Kafin Hausa', 'Kaugama', 'Kazaure', 'Kiri Kasama', 'Kiyawa', 'Maigatari', 'Malam Madori', 'Miga', 'Ringim', 'Roni', 'Sule Tankarkar', 'Taura', 'Yankwashi'],

    'Kaduna': ['Birnin Gwari', 'Chikun', 'Giwa', 'Igabi', 'Ikara', 'Jaba', 'Jema\'a', 'Kachia', 'Kaduna North', 'Kaduna South', 'Kagarko', 'Kajuru', 'Kaura', 'Kauru', 'Kubau', 'Kudan', 'Lere', 'Makarfi', 'Sabon Gari', 'Sanga', 'Soba', 'Zangon Kataf', 'Zaria'],

    'Katsina': ['Batagarawa', 'Batsari', 'Baure', 'Bindawa', 'Charanchi', 'Dutsi', 'Dutsin-Ma', 'Funtua', 'Ingawa', 'Jibia', 
      'Kafur', 'Kaita', 'Kankara', 'Kankia', 'Kurfi', 'Kusada', 'Mai’adua', 'Malumfashi', 'Mani', 'Mashi', 
      'Matazu', 'Musawa', 'Rimi', 'Sabuwa', 'Safana', 'Sandamu', 'Zango'],

    'Kano': ['Ajingi', 'Albasu', 'Bagwai', 'Bebeji', 'Bichi', 'Bunkure', 'Dala', 'Dambatta', 'Dawakin Kudu', 'Dawakin Tofa', 'Doguwa', 'Fagge', 'Gabasawa', 'Garko', 'Garun Mallam', 'Gaya', 'Gezawa', 'Gwale', 'Kano Municipal', 'Kano South', 'Kano North', 'Karaye', 'Kibiya', 'Kiru', 'Kumbotso', 'Kunchi', 'Madobi', 'Makoda', 'Minjibir', 'Rano', 'Rimin Gado', 'Rogo', 'Shanono', 'Sumaila', 'Tarauni', 'Tofa', 'Tsanyawa', 'Warawa', 'Wudil'],

    'Kogi': ['Adavi', 'Ajaokuta', 'Ankpa', 'Bassa', 'Dekina', 'Ibaji', 'Idah', 'Igalamela Odolu', 'Ijumu', 'Kabba/Bunu', 'Kogi', 'Mopa-Muro', 'Ofu', 'Ogori/Magongo', 'Okehi', 'Okene', 'Olamaboro', 'Omala', 'Yagba East', 'Yagba West'],
    'Kwara': ['Asa', 'Baruten', 'Ekiti', 'Ifelodun', 'Ilorin East', 'Ilorin South', 'Ilorin West', 'Irepodun', 'Ishin', 'Kaiama', 'Moro', 'Offa', 'Oke-Ero', 'Oyun', 'Pategi'],

    'Lagos': ['Agege', 'Ajeromi-Ifelodun', 'Alimosho', 'Amuwo-Odofin', 'Apapa', 'Badagry', 'Epe', 'Eti-Osa', 'Ibeju-Lekki', 'Ifako-Ijaiye', 'Ikeja', 'Ikorodu', 'Kosofe', 'Lagos Island', 'Lagos Mainland', 'Mushin', 'Ojo', 'Oshodi-Isolo', 'Shomolu', 'Surulere'],

    'Nasarawa': ['Akwanga', 'Ankpa', 'Doma', 'Karu', 'Keana', 'Keffi', 'Kokona', 'Lafia', 'Nasarawa', 'Nassarawa-Eggon', 'Obi', 'Toto', 'Wamba'],

    'Niger': ['Agwara', 'Bida', 'Borgu', 'Bosso', 'Chanchaga', 'Edati', 'Gbako', 'Gbagyi', 'Katcha', 'Lavun', 'Magama', 'Mariga', 'Mokwa', 'Pailoro', 'Rafi', 'Rijau', 'Shiroro', 'Suleja', 'Wushishi'],

    'Ogun': ['Abeokuta North', 'Abeokuta South', 'Ado-Odo/Ota', 'Ewekoro', 'Ifo', 'Ijebu East', 'Ijebu North', 'Ijebu North East', 'Ijebu Ode', 'Ikenne', 'Imeko/Afon', 'Ipokia', 'Obafemi-Owode', 'Odeda', 'Odogbolu', 'Ogun Waterside', 'Ota', 'Remo North', 'Remo South', 'Yewa North', 'Yewa South'],
    
    'Ondo': ['Akoko North East', 'Akoko North West', 'Akoko South East', 'Akoko South West', 'Akure North', 'Akure South', 'Odigbo', 'Okitipupa', 'Ondo East', 'Ondo West', 'Ose', 'Owo'],
    
    'Osun': ['Atakunmosa East', 'Atakunmosa West', 'Ayedaade', 'Ayedire', 'Boluwaduro', 'Boripe', 'Ekiti', 'Ifelodun', 'Ife Central', 'Ife East', 'Ife North', 'Ife South', 'Ilesa East', 'Ilesa West', 'Irepodun', 'Irewole', 'Isokan', 'Iwo', 'Obokun', 'Odo-Otin', 'Ola-Oluwa', 'Oriade', 'Orolu', 'Osogbo'],
    
    'Oyo': ['Akinyele', 'Atiba', 'Atisbo', 'Egbeda', 'Ibadan North', 'Ibadan North East', 'Ibadan North West', 'Ibadan South East', 'Ibadan South West', 'Ibarapa Central', 'Ibarapa East', 'Ibarapa North', 'Ido', 'Iseyin', 'Itesiwaju', 'Kajola', 'Lagelu', 'Ogbomosho North', 'Ogbomosho South', 'Olorunda', 'Oyo East', 'Oyo West'],
    
    'Plateau': ['Barkin Ladi', 'Bassa', 'Bokkos', 'Jos East', 'Jos North', 'Jos South', 'Kanam', 'Kanke', 'Langtang North', 'Langtang South', 'Mangu', 'Pankshin', 'Qua\'an Pan', 'Riyom', 'Wase'],
    
    'Rivers': ['Abua/Odual', 'Ahoada East', 'Ahoada West', 'Akuku-Toru', 'Andoni', 'Asari-Toru', 'Bonny', 'Emohua', 'Etche', 'Ikwerre', 'Khana', 'Obio/Akpor', 'Ogba/Egbema/Ndoni', 'Okrika', 'Ogu/Bolo', 'Port Harcourt', 'Tai'],
    
    'Sokoto': ['Binji', 'Dange/Shuni', 'Gada', 'Goronyo', 'Gudu', 'Gwadabawa', 'Illela', 'Kebbe', 'Kware', 'Rabah', 'Sokoto North', 'Sokoto South', 'Tambuwal', 'Wamako', 'Wurno', 'Yabo'],
    
    'Taraba': ['Ardo-Kola', 'Bali', 'Donga', 'Gashaka', 'Gassol', 'Ibi', 'Jalingo', 'Karin-Lamido', 'Kurmi', 'Lau', 'Sardauna', 'Takum', 'Ussa', 'Wukari', 'Yorro'],
    
    'Yobe': ['Bade', 'Bursari', 'Damaturu', 'Fika', 'Fune', 'Geidam', 'Gujba', 'Gulani', 'Jakusko', 'Karasuwa', 'Machina', 'Nangere', 'Nguru', 'Potiskum', 'Tarmuwa', 'Yunusari', 'Yusufari'],
    
    'Zamfara': ['Anka', 'Bakura', 'Birnin Magaji', 'Bukkuyum', 'Bugundu', 'Chafe', 'Gummi', 'Gusau', 'Isa', 'Kaura Namoda', 'Maru', 'Shinkafi', 'Talata Mafara', 'Zurmi']
  };
  

  const stateSelect = document.getElementById('state');
  const lcdaSelect = document.getElementById('lcda');
  const locationDisplay = document.getElementById('locationDisplay');

  // Populate the states dropdown
  Object.keys(statesAndLcdas).forEach(state => {
      const option = document.createElement('option');
      option.value = state;
      option.textContent = state;
      stateSelect.appendChild(option);
  });

  // Update LCDAs when a state is selected
  stateSelect.addEventListener('change', function() {
      const selectedState = this.value;
      const lcdas = statesAndLcdas[selectedState] || [];
      
      // Clear previous LCDA options
      lcdaSelect.innerHTML = '<option value="" disabled selected hidden>Select LCDA</option>';

      // Populate LCDA dropdown
      lcdas.forEach(lcda => {
          const option = document.createElement('option');
          option.value = lcda;
          option.textContent = lcda;
          lcdaSelect.appendChild(option);
      });

      // Clear location display
      locationDisplay.textContent = '';
  });

  // Display selected state and LCDA
  lcdaSelect.addEventListener('change', function() {
      const selectedLcda = this.value;
      const selectedState = stateSelect.value;
      locationDisplay.textContent = `${selectedLcda}, ${selectedState}`;
  });
});






//SELL SEQUENCE JS
// document.getElementById('sellForm').addEventListener('submit', function(event) {
//   event.preventDefault();

//   const formData = new FormData(this);

//   fetch('/submit-sell-form', {
//     method: 'POST',
//     body: formData
//   })
//   .then(response => {
//     console.log('Form submitted to /submit-sell-form');
//     if (response.ok) {
//       window.location.href = '/publish';
//     } else {
//       return response.text().then(text => { throw new Error(text); });
//     }
//   })
//   .catch(error => {
//     console.error('Error submitting form:', error);
//     alert('There was an error submitting the form.');
//   });
// });

document.getElementById('sellForm').addEventListener('submit', function(event) {
  event.preventDefault();
  
  const formData = new FormData(this);
  const productData = Object.fromEntries(formData);

  // Send data to server
  fetch('/submit-product', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productData),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
    // Show success message to user
  })
  .catch((error) => {
    console.error('Error:', error);
    // Show error message to user
  });
});

