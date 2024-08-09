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
  const successMessage = document.getElementById('success-message');

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

      const contentType = response.headers.get("content-type");
      const textContent = await response.text();

      if (contentType && contentType.indexOf("application/json") !== -1) {
        const result = JSON.parse(textContent);
        if (response.ok) {
          showNotification('Profile updated successfully');
          // Refresh the page to reflect updated profile information
          setTimeout(() => {
            window.location.reload();
          }, 2000); // Adjust the delay as needed
        } else {
          showNotification(`Error updating profile: ${result.message || 'Unknown error'}`);
          console.error('Profile update error:', result);
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

    // Hide the notification modal after 5 seconds (5000 milliseconds)
    setTimeout(() => {
      hideNotification();
    }, 5000);
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
