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

    const formData = new FormData(this);
    const data = {};
    formData.forEach((value, key) => (data[key] = value));

    try {
        const response = await fetch('/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (response.ok) {
            alert(result.message); // Optional: Show a success message
            this.reset(); // Clear the form inputs
            window.location.href = result.redirect; // Redirect to the login page
        } else {
            if (result.field === 'username') {
                document.getElementById('username-error').textContent = result.message;
            }
            if (result.field === 'email') {
                document.getElementById('email-error').textContent = result.message;
            }
            alert(result.message); // Show generic error message
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    }
});
