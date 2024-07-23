document.addEventListener('DOMContentLoaded', function() {
    const isLoggedIn = <%= isLoggedIn %>;

    if (isLoggedIn) {
        document.querySelector('.login-btn').style.display = 'none';
        document.querySelector('.signup-btn').style.display = 'none';
        document.querySelector('.profile-icon').style.display = 'block';
        document.querySelector('.message-icon').style.display = 'block';
    } else {
        document.querySelector('.login-btn').style.display = 'block';
        document.querySelector('.signup-btn').style.display = 'block';
        document.querySelector('.profile-icon').style.display = 'none';
        document.querySelector('.message-icon').style.display = 'none';
    }
});
