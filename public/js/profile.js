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
  const profileForm = document.getElementById('profile-form');
  const cancelButton = document.getElementById('cancelButton');
  const modalMessage = document.getElementById('modalMessage');
  const notificationModal = document.getElementById('notificationModal');
  const closeModalButton = document.getElementById('closeModalButton');

  // Show edit form when "Edit Profile" button is clicked
  editButton.addEventListener('click', () => {
    showEditForm();
    editForm.scrollIntoView({ behavior: 'smooth' });
  });

  // Hide edit form when "Cancel" button is clicked
  cancelButton.addEventListener('click', () => {
    hideEditForm();
    showNotification('Process ended!');
  });

  // Hide notification modal when "Close" button is clicked
  closeModalButton.addEventListener('click', () => {
    hideNotification();
  });

  // Handle form submission
  profileForm.addEventListener('submit', async (event) => {
    event.preventDefault();
  
    try {
      const formData = new FormData(profileForm);
      const response = await fetch('/api/user/profile', {
        method: 'POST',
        body: formData
      });
  
      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
  
      const contentType = response.headers.get("content-type");
      console.log('Content-Type:', contentType);
  
      const textContent = await response.text();
      console.log('Response text:', textContent);
  
      if (contentType && contentType.indexOf("application/json") !== -1) {
        try {
          const result = JSON.parse(textContent);
          if (response.ok) {
            showNotification('Profile updated successfully');
            hideEditForm();
            window.location.reload();
          } else {
            showNotification(`Error updating profile: ${result.message || 'Unknown error'}`);
            console.error('Profile update error:', result);
          }
        } catch (jsonError) {
          console.error('Error parsing JSON:', jsonError);
          showNotification('Error updating profile: Invalid JSON response');
        }
      } else {
        console.error('Non-JSON response:', textContent);
        showNotification('Error updating profile: Unexpected server response');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      showNotification(`Error updating profile: ${error.message}`);
    }
  });

  // Function to show the edit form
  function showEditForm() {
    editForm.classList.remove('hidden');
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

  // Function to update profile picture preview
  const profilePictureInput = document.querySelector('input[name="profilePicture"]');
  profilePictureInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        profilePicture.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  });

  // Optional: Add live updates for text inputs
  const textInputs = document.querySelectorAll('input[type="text"], input[type="email"], textarea');
  textInputs.forEach(input => {
    input.addEventListener('input', (event) => {
      const correspondingElement = document.getElementById(event.target.name);
      if (correspondingElement) {
        correspondingElement.textContent = event.target.value;
      }
    });
  });

  // Optional: Add live updates for select inputs
  const selectInputs = document.querySelectorAll('select');
  selectInputs.forEach(select => {
    select.addEventListener('change', (event) => {
      const correspondingElement = document.getElementById(event.target.name);
      if (correspondingElement) {
        correspondingElement.textContent = event.target.value;
      }
    });
  });
});