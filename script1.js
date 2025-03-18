// script.js
document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const passwordError = document.getElementById('passwordError');

    // Password validation
    const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(password)) {
        passwordError.style.display = 'block';
        return;
    } else {
        passwordError.style.display = 'none';
    }

    // API Call Simulation
    async function generateAuthToken(username, password) {
        const apiEndpoint = 'https://learningmanager.adobe.com/oauth/o/authorize';  // Replace with your API endpoint
        const clientId = '<7594583f-8b95-4a67-aaca-a4bb24adf7bf>';
        const clientSecret = '<a12bba07-7b60-4f47-a8a4-2b7d89fbc84a>';
        const redirectUri = '<https://learningmanager.adobe.com>';
    
        try {
            const response = await fetch(apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    grant_type: 'password',   // Or 'client_credentials' depending on your flow
                    client_id: "7594583f-8b95-4a67-aaca-a4bb24adf7bf",
                    client_secret: "a12bba07-7b60-4f47-a8a4-2b7d89fbc84a",
                    username: username,
                    password: password,
                    redirect_uri: "https://learningmanager.adobe.com"
                })
            });
    
            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }
    
            const data = await response.json();
            const token = data.access_token;
    
            // Store token securely
            sessionStorage.setItem('authToken', token); 
    
            console.log('Token generated successfully:', token);
            return token;
    
        } catch (error) {
            console.error('Token generation failed:', error.message);
            return null;
        }
    }

    
    document.getElementById('loginForm').addEventListener('submit', async function(e) {
        e.preventDefault();  // Prevent form reload
    
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
    
        const token = await generateAuthToken(username, password);
    
        if (token) {
            alert('Login Successful!');
            // Redirect or perform further actions
            window.location.href = '/dashboard';
        } else {
            alert('Login Failed. Please try again.');
        }
    });
    
// signup_script.js
document.getElementById('signupForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordError = document.getElementById('passwordError');

    // Password validation
    const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(password)) {
        passwordError.style.display = 'block';
        return;
    } else {
        passwordError.style.display = 'none';
    }

    // API Call Simulation
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        });
        const data = await response.json();
        alert('Sign Up Successful! Welcome ' + username);
    } catch (error) {
        alert('Sign Up failed. Please try again.');
    }
});
