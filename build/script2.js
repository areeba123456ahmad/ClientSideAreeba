let email = '';
let password = '';

async function login(endpoint) {
    const messageElement = document.getElementById('message');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    console.log("script2 file reached");

    try {
        if (!email || !password) {
            email = emailInput.value;
            password = passwordInput.value;
        }

        console.log("Sending login request to:", endpoint);
        console.log("Email:", email, "Password:", password);

        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        console.log('Response received:', response);

        const data = await response.json();
        console.log('Data received:', data);

        if (response.ok) {
            messageElement.textContent = data.message;
            // Redirect or perform other actions upon successful login
        } else {
            messageElement.textContent = data.message;
        }
    } catch (error) {
        console.error('Error:', error);
        messageElement.textContent = 'An error occurred. Please try again.';
    }
}
