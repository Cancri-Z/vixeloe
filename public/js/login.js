// document.addEventListener('DOMContentLoaded', function() {
//   // Check login state on page load
//   const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
//   updateUIForLoginState(isLoggedIn);

//   // Login functionality
//   const loginForm = document.getElementById('login');
//   if (loginForm) {
//     loginForm.addEventListener('submit', async function(e) {
//       e.preventDefault();
//       const usernameOrEmailInput = document.getElementById('username');
//       const passwordInput = document.getElementById('password');
//       const loginMessage = document.getElementById('login-message');

//       if (!usernameOrEmailInput || !passwordInput) {
//         console.error('Username/Email or password input not found');
//         return;
//       }

//       const identifier = usernameOrEmailInput.value.trim();
//       const password = passwordInput.value;

//       if (identifier === '' || password === '') {
//         if (loginMessage) {
//           loginMessage.textContent = 'Please enter both username/email and password.';
//           loginMessage.style.color = 'red';
//         }
//         return;
//       }

//       try {
//         const response = await fetch('/api/user/login', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({ username: identifier, password })
//         });

//         if (!response.ok) {
//           const errorData = await response.json();
//           throw new Error(errorData.message || 'An error occurred.');
//         }

//         const data = await response.json();
//         window.location.href = data.redirect;
//       } catch (error) {
//         console.error('Login error:', error);
//         if (loginMessage) {
//           loginMessage.textContent = error.message || 'An error occurred. Please try again.';
//           loginMessage.style.color = 'red';
//         }
//       }
//     });
//   }

//   // Logout functionality
//   const logoutButton = document.getElementById('logout');
//   if (logoutButton) {
//     logoutButton.addEventListener('click', async function(e) {
//       e.preventDefault();
//       console.log('Logout button clicked');
//       try {
//         console.log('Sending logout request');
//         const response = await fetch('/api/user/logout', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json'
//           }
//         });
  
//         console.log('Logout response received:', response);
//         const data = await response.json();
//         console.log('Logout data:', data);
  
//         if (data.success) {
//           alert(data.message);
//           window.location.href = data.redirect;
//         } else {
//           alert(data.message || 'Logout failed. Please try again.');
//         }
//       } catch (error) {
//         console.error('Logout error:', error);
//         alert('An error occurred during logout. Please try again.');
//       }
//     });
//   } else {
//     console.log('Logout button not found');
//   }
// });


document.addEventListener('DOMContentLoaded', function() {
  const logoutLink = document.getElementById('logoutLink');

  function updateUIForLoginState(isLoggedIn) {
    const authLinks = document.getElementById('auth-links');
    const icons = document.querySelector('.icons');
  }

  // Check login state on page load
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  updateUIForLoginState(isLoggedIn);

  // Login functionality
const loginForm = document.getElementById('login');
if (loginForm) {
  loginForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    const usernameOrEmailInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginMessage = document.getElementById('login-message');

    if (!usernameOrEmailInput || !passwordInput) {
      console.error('Username/Email or password input not found');
      return;
    }

    const identifier = usernameOrEmailInput.value.trim();
    const password = passwordInput.value;

    if (identifier === '' || password === '') {
      if (loginMessage) {
        loginMessage.textContent = 'Please enter both username/email and password.';
        loginMessage.style.color = 'red';
      }
      return;
    }

    try {
      const response = await fetch('/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: identifier, password })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'An error occurred.');
      }

      const data = await response.json();
      if (data.success) {
        localStorage.setItem('isLoggedIn', 'true');
        window.location.href = data.redirect;
      } else {
        throw new Error(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      if (loginMessage) {
        loginMessage.textContent = error.message || 'An error occurred. Please try again.';
        loginMessage.style.color = 'red';
      }
    }
  });
}

  // Logout functionality
    if (logoutLink) {
        logoutLink.addEventListener('click', async function(e) {
            e.preventDefault();
            console.log('Logout link clicked');
            
            try {
                const response = await fetch('/api/user/logout', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'same-origin'
                });

                const contentType = response.headers.get("content-type");
                if (contentType && contentType.indexOf("application/json") !== -1) {
                    const data = await response.json();

                    if (response.ok && data.success) {
                        console.log('Logout successful');
                        localStorage.removeItem('isLoggedIn');
                        window.location.href = data.redirect;
                    } else {
                        console.error('Logout failed:', data.message);
                        alert(data.message || 'Logout failed. Please try again.');
                    }
                } else {
                    console.error('Received non-JSON response');
                    alert('An error occurred during logout. Please try again.');
                }
            } catch (error) {
                console.error('Logout error:', error);
                alert('An error occurred during logout. Please try again.');
            }
        });
    } else {
        console.error('Logout link not found');
    }

  // Listen for storage events to sync login state across tabs
  window.addEventListener('storage', function(event) {
    if (event.key === 'isLoggedIn') {
      updateUIForLoginState(event.newValue === 'true');
    }
  });
});