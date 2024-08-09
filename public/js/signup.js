const passwordInputs = document.querySelectorAll('.password-input input[type="password"]');
const togglePasswordIcons = document.querySelectorAll('.toggle-password');

togglePasswordIcons.forEach((toggleIcon, index) => {
    toggleIcon.addEventListener('click', function () {
        const passwordInput = passwordInputs[index];
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.classList.toggle('show-password');
        this.classList.toggle('hide-password');
    });
});

// Backend for the signup page
document.getElementById('signup-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    // Clear previous error messages
    document.getElementById('username-error').textContent = '';
    document.getElementById('email-error').textContent = '';
    document.getElementById('general-error').textContent = '';

    const formData = new FormData(this);
    const data = {};
    formData.forEach((value, key) => (data[key] = value));

    // Additional client-side validation (e.g., password match)
    if (data.password !== data.confirmPassword) {
        document.getElementById('general-error').textContent = 'Passwords do not match.';
        return;
    }

    try {
        const response = await fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (response.ok) {
            // Display the modal and then redirect after a short delay
            document.getElementById('success-message').textContent = result.message; // Show success message
            document.getElementById('success-modal').style.display = 'block'; // Display the modal
            
            setTimeout(() => {
                window.location.href = result.redirect; // Redirect to login page
            }, 2000); // Adjust the timeout as needed
        } else {
            // Display field-specific error messages
            if (result.field === 'username') {
                document.getElementById('username-error').textContent = result.message;
            } else if (result.field === 'email') {
                document.getElementById('email-error').textContent = result.message;
            } else {
                // Handle other errors or general error messages
                document.getElementById('general-error').textContent = result.message;
            }
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('general-error').textContent = 'An error occurred. Please try again.';
    }
});

// Modal handling
document.getElementById('ok-button').addEventListener('click', function() {
    window.location.href = '/login'; // Redirect to login page
});

document.getElementById('close-modal').addEventListener('click', function() {
    document.getElementById('success-modal').style.display = 'none'; // Close the modal
});
