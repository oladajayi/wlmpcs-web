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
                document.getElementById("status-message").textContent = "Login successful! Redirecting...";
                document.getElementById("status-message").style.color = "green";

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
                document.getElementById("status-message").textContent = "Invalid username or password. Please try again.";
                document.getElementById("status-message").style.color = "red";
            }
            e.target.reset();
        });
    }

    