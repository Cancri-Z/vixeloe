document.addEventListener('DOMContentLoaded', () => {
    const profilePicture = document.getElementById('profilePicture');
    const fullName = document.getElementById('fullName');
    const userGender = document.getElementById('userGender');
    const userDOB = document.getElementById('userDOB');
    const userMaritalStatus = document.getElementById('userMaritalStatus');
    const userOccupation = document.getElementById('userOccupation');
    const userStatus = document.getElementById('userStatus');
    const userBio = document.getElementById('userBio');
    const userEmail = document.getElementById('userEmail');
    const homeAddress = document.getElementById('homeAddress');
    const officeAddress = document.getElementById('officeAddress');
    const homePhone = document.getElementById('homePhone');
    const mobilePhone = document.getElementById('mobilePhone');
    const officePhone = document.getElementById('officePhone');
    const editButton = document.getElementById('editButton');
    const editForm = document.getElementById('editForm');
    const profilePictureInput = document.getElementById('profilePictureInput');
    const firstNameInput = document.getElementById('firstNameInput');
    const middleNameInput = document.getElementById('middleNameInput');
    const lastNameInput = document.getElementById('lastNameInput');
    const userGenderInput = document.getElementById('userGenderInput');
    const userDOBInput = document.getElementById('userDOBInput');
    const userMaritalStatusInput = document.getElementById('userMaritalStatusInput');
    const userOccupationInput = document.getElementById('userOccupationInput');
    const userStatusInput = document.getElementById('userStatusInput');
    const userBioInput = document.getElementById('userBioInput');
    const userEmailInput = document.getElementById('userEmailInput');
    const homeAddressInput = document.getElementById('homeAddressInput');
    const officeAddressInput = document.getElementById('officeAddressInput');
    const homePhoneInput = document.getElementById('homePhoneInput');
    const mobilePhoneInput = document.getElementById('mobilePhoneInput');
    const officePhoneInput = document.getElementById('officePhoneInput');
    const saveButton = document.getElementById('saveButton');
    const cancelButton = document.getElementById('cancelButton');

    // Fetch user data from the server or load from local storage
    const userData = {
      profilePicture: '../public/img/placeholderpic.jpg',
      firstName: 'John',
      middleName: 'David',
      lastName: 'Doe',
      gender: 'male',
      dateOfBirth: '1990-05-15',
      maritalStatus: 'single',
      occupation: 'Software Engineer',
      status: 'active',
      bio: 'Experienced software engineer with a passion for building innovative solutions.',
      email: 'john@example.com',
      homeAddress: '123 Main St, City, State, ZIP',
      officeAddress: '456 Office Rd, City, State, ZIP',
      homePhone: '555-555-5555',
      mobilePhone: '555-555-5556',
      officePhone: '555-555-5557'
    };

    // Populate user data on the page
    populateUserData();

    // Show edit form when "Edit Profile" button is clicked
    editButton.addEventListener('click', () => {
      showEditForm();
      editForm.scrollIntoView({ behavior: 'smooth' });
    });

    // Hide edit form and update user data when "Save Changes" button is clicked
    saveButton.addEventListener('click', () => {
      updateUserData();
      hideEditForm();
      showNotification('Profile update successful ✔');
    });

    // Hide edit form and show notification when "Cancel" button is clicked
    cancelButton.addEventListener('click', () => {
        hideEditForm();
        showNotification('Process ended!');
      });

    // Hide notification modal when "Close" button is clicked
    closeModalButton.addEventListener('click', () => {
        hideNotification();
      });

    // Function to populate user data on the page
    function populateUserData() {
      profilePicture.src = userData.profilePicture;
      fullName.textContent = `${userData.firstName} ${userData.middleName} ${userData.lastName}`;
      userGender.textContent = userData.gender;
      userDOB.textContent = userData.dateOfBirth;
      userMaritalStatus.textContent = userData.maritalStatus;
      userOccupation.textContent = userData.occupation;
      userStatus.textContent = userData.status;
      userBio.textContent = userData.bio;
      userEmail.textContent = userData.email;
      homeAddress.textContent = userData.homeAddress;
      officeAddress.textContent = userData.officeAddress;
      homePhone.textContent = userData.homePhone;
      mobilePhone.textContent = userData.mobilePhone;
      officePhone.textContent = userData.officePhone;
    }

    // Function to show the edit form and populate input fields
    function showEditForm() {
      editForm.classList.remove('hidden');
      firstNameInput.value = userData.firstName;
      middleNameInput.value = userData.middleName;
      lastNameInput.value = userData.lastName;
      userGenderInput.value = userData.gender;
      userDOBInput.value = userData.dateOfBirth;
      userMaritalStatusInput.value = userData.maritalStatus;
      userOccupationInput.value = userData.occupation;
      userStatusInput.value = userData.status;
      userBioInput.value = userData.bio;
      userEmailInput.value = userData.email;
      homeAddressInput.value = userData.homeAddress;
      officeAddressInput.value = userData.officeAddress;
      homePhoneInput.value = userData.homePhone;
      mobilePhoneInput.value = userData.mobilePhone;
      officePhoneInput.value = userData.officePhone;
    }

    // Function to update user data with the new values
    function updateUserData() {
      userData.firstName = firstNameInput.value;
      userData.middleName = middleNameInput.value;
      userData.lastName = lastNameInput.value;
      userData.gender = userGenderInput.value;
      userData.dateOfBirth = userDOBInput.value;
      userData.maritalStatus = userMaritalStatusInput.value;
      userData.occupation = userOccupationInput.value;
      userData.status = userStatusInput.value;
      userData.bio = userBioInput.value;
      userData.email = userEmailInput.value;
      userData.homeAddress = homeAddressInput.value;
      userData.officeAddress = officeAddressInput.value;
      userData.homePhone = homePhoneInput.value;
      userData.mobilePhone = mobilePhoneInput.value;
      userData.officePhone = officePhoneInput.value;

      // Update profile picture if a new one was selected
      if (profilePictureInput.files.length > 0) {
        const reader = new FileReader();
        reader.onload = () => {
          userData.profilePicture = reader.result;
          profilePicture.src = reader.result;
        };
        reader.readAsDataURL(profilePictureInput.files[0]);
      }

      populateUserData();

      // Save user data to the server or local storage
      // ...
    }

    // Function to hide the edit form
    function hideEditForm() {
      editForm.classList.add('hidden');
    }

   // Function to show notification modal
   function showNotification(message) {
    modalMessage.textContent = message;
    notificationModal.classList.remove('hidden');
    notificationModal.style.display = 'block';
  }

  // Function to hide notification modal
  function hideNotification() {
    notificationModal.classList.add('hidden');
    notificationModal.style.display = 'none';
  }
});

//For editing phone input fields
function formatPhoneNumber(input) {
  let sanitized = input.value.replace(/\D/g, ''); // Remove all non-digit characters
  let formattedNumber = '';

  if (sanitized.length > 0) {
      formattedNumber = sanitized.substring(0, 4); // First four digits
  }
  if (sanitized.length > 4) {
      formattedNumber += ' ' + sanitized.substring(4, 7); // Next three digits
  }
  if (sanitized.length > 7) {
      formattedNumber += ' ' + sanitized.substring(7, 11); // Last four digits
  }

  input.value = formattedNumber;
}

// Attach event listeners to all phone number inputs
document.getElementById('homePhoneInput').addEventListener('input', function (e) {
  formatPhoneNumber(e.target);
});
document.getElementById('mobilePhoneInput').addEventListener('input', function (e) {
  formatPhoneNumber(e.target);
});
document.getElementById('officePhoneInput').addEventListener('input', function (e) {
  formatPhoneNumber(e.target);
});


//For snapping profile picture
// Get references to the video element and capture button
const videoElement = document.getElementById('videoElement');
const captureButton = document.getElementById('captureButton');

// Capture the photo when the button is clicked
captureButton.addEventListener('click', () => {
    // Access the webcam and display the feed in the video element
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            videoElement.srcObject = stream;
        })
        .catch(error => {
            console.error('Error accessing webcam:', error);
        });

    // Capture the photo after the video stream is ready
    videoElement.addEventListener('loadeddata', () => {
        const canvas = document.createElement('canvas');
        canvas.width = videoElement.videoWidth;
        canvas.height = videoElement.videoHeight;
        canvas.getContext('2d').drawImage(videoElement, 0, 0, canvas.width, canvas.height);
        const capturedPhoto = canvas.toDataURL('image/png');

        // Update the profile picture with the captured photo
        userData.profilePicture = capturedPhoto;
        profilePicture.src = capturedPhoto;
    });
});
