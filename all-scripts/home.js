const loginEl = document.getElementById("login");
const loginForm = document.getElementById('loginForm');

// Display login input
loginEl.addEventListener("click", () => {
    loginForm.style.display = "none"
    loginForm.style.display = loginForm.style.display === "none" ? "block" : "none";
})


    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const currentUserLp = document.getElementById('lp-number').value;
            const currentUserPassword = document.getElementById('login-password').value;

            const allUsersRecord = JSON.parse(localStorage.getItem('members')) || [];
            if (allUsersRecord.length === 0) {
                document.getElementById("status-message").textContent = "No users found. Please register first.";
                document.getElementById("status-message").style.color = "red";
                return;
            }

            const confirmUserRecord = allUsersRecord.find(
                (user) => user.lpNumber === currentUserLp && user.userPassword === currentUserPassword
            );

            if (confirmUserRecord) {
                // Create the alert div
                const alertDiv = document.createElement("div");
                alertDiv.className = "alert fade show position-fixed top-0 end-0 m-3 text-center adjustFailed";
                alertDiv.setAttribute("role", "alert");
                alertDiv.style.backgroundColor = "green"
                alertDiv.style.color = "whitesmoke"
                alertDiv.textContent = `Login successful!`;
            
                // Append alert to body
                document.body.appendChild(alertDiv);
            
                // Auto-remove the alert after 3 seconds
                setTimeout(() => {
                    alertDiv.classList.remove("show");  // Triggers Bootstrap fade-out
                    setTimeout(() => alertDiv.remove(), 500); // Removes from DOM after fade
                }, 2000);

                // Save user data for the next page
                localStorage.setItem('currentUser', JSON.stringify(confirmUserRecord));

                // Redirect after a delay
                setTimeout(() => {
                    const targetUrl = "members.html"; 
                    fetch(targetUrl, { method: 'HEAD' })
                        .then((response) => {
                            if (response.ok) {
                                console.log("File exists. Redirecting...");
                                window.location.href = targetUrl;
                            } else {
                                throw new Error(`Failed to load ${targetUrl}`);
                            }
                        })
                        .catch((error) => {
                            console.error("Navigation error:", error);
                            document.getElementById("status-message").textContent =
                                "Unable to redirect. Please contact support.";
                            document.getElementById("status-message").style.color = "red";
                        });
                }, 1500);
            } else {
                // Create the alert div
                const alertDiv = document.createElement("div");
                alertDiv.className = "alert fade show position-fixed top-0 end-0 m-3 text-center adjustFailed";
                alertDiv.setAttribute("role", "alert");
                alertDiv.style.backgroundColor = "red"
                alertDiv.style.color = "whitesmoke"
                alertDiv.textContent = `Invalid username or password. Please try again!`;
            
                // Append alert to body
                document.body.appendChild(alertDiv);
            
                // Auto-remove the alert after 3 seconds
                setTimeout(() => {
                    alertDiv.classList.remove("show");  // Triggers Bootstrap fade-out
                    setTimeout(() => alertDiv.remove(), 500); // Removes from DOM after fade
                }, 4000);
            }            
            
            e.target.reset();
        });
    }

     // Get the password input and the eye icon
  const passwordInput = document.getElementById('login-password');
  const togglePassword = document.getElementById('togglePassword');
  
  // Toggle visibility when the eye icon is clicked
  togglePassword.addEventListener('click', function () {
    // Check if the input is of type password
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';  // Show the password
      togglePassword.innerHTML = '<i class="fas fa-eye-slash"></i>';  // Change icon to "eye-slash"
    } else {
      passwordInput.type = 'password';  // Hide the password
      togglePassword.innerHTML = '<i class="fas fa-eye"></i>';  // Change icon to "eye"
    }
  });
