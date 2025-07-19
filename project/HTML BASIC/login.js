document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent page refresh
  
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
  
    // Error elements
    const usernameError = document.getElementById('usernameError');
    const passwordError = document.getElementById('passwordError');
    const message = document.getElementById('message');
  
    // Clear previous errors
    usernameError.style.display = 'none';
    passwordError.style.display = 'none';
    message.textContent = '';
  
    let isValid = true;
  
    // Username validation
    if (username === '') {
      usernameError.textContent = 'Username is required.';
      usernameError.style.display = 'block';
      isValid = false;
    } else if (username.length < 3) {
      usernameError.textContent = 'Username must be at least 3 characters.';
      usernameError.style.display = 'block';
      isValid = false;
    }
  
    // Password validation
    if (password === '') {
      passwordError.textContent = 'Password is required.';
      passwordError.style.display = 'block';
      isValid = false;
    } else if (password.length < 6) {
      passwordError.textContent = 'Password must be at least 6 characters.';
      passwordError.style.display = 'block';
      isValid = false;
    }
  
    // Final validation
    if (isValid) {
      // Example credentials check (you can replace with API call)
      if (username === 'admin' && password === '123456') {
        message.style.color = 'green';
        message.textContent = 'Login successful!';
      } else {
        message.style.color = 'red';
        message.textContent = 'Invalid username or password!';
      }
    }
  });
  