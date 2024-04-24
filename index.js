document.addEventListener("DOMContentLoaded", function () {
  const signupLink = document.getElementById("signup-link");
  const loginLink = document.getElementById("login-link");
  const signupForm = document.getElementById("signup-form");
  const loginForm = document.getElementById("login-form");
const TitleDisplay = document.getElementById("head-body-main");
  signupLink.addEventListener("click", function (event) {
    event.preventDefault();
    signupForm.style.display = "block";
      loginForm.style.display = "none";
      TitleDisplay.style.display = "none";
  });

  loginLink.addEventListener("click", function (event) {
    event.preventDefault();
    loginForm.style.display = "block";
      signupForm.style.display = "none";
      TitleDisplay.style.display = "none";
  });

  document.getElementById("signup-btn").addEventListener("click", function () {
    const name = document.getElementById("signup-name").value;
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    const data = {
      name: name,
      email: email,
      password: password,
    };
//bbd-backend-task.onrender.com
    // Make AJAX POST request for signup
   // https://bbd-backend-task.onrender.com/
https: fetch("https://bbd-backend-task.onrender.com/api/auth/signup", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(data),
})
  .then((response) => {
    if (response.ok) {
      return response.json(); // Parse response JSON
    } else {
      throw new Error("Signup failed");
    }
  })
  .then((data) => {
    // Handle successful signup

    alert("Signup successful!");

    console.log("Signup response:", data); // Log the response data if needed
    // Redirect to the login page or perform any other action
    // Example: window.location.href = "/login";
  })
  .catch((error) => {
    // Handle errors
    console.error("Error:", error);
    alert("Signup failed: " + error.message);
  });
  });

document.getElementById("login-btn").addEventListener("click", function () {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;
  const data = {
    email: email,
    password: password,
  };

  // Make AJAX POST request for login
  fetch("https://bbd-backend-task.onrender.com/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        // Extract token from response
        return response.json();
      } else {
        throw new Error("Login failed");
      }
    })
    .then((data) => {
      // Store token in localStorage
      console.log(data);
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.user._id);
      localStorage.setItem("userName", data.user.name);
      // Show alert for login success
      alert("Login successful!");
      // Redirect to the task page
      window.location.href = "./taskPage.html";
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Login failed: " + error.message);
    });
});


});




// ////

// {token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2M…DIxfQ.CGPBa9OcZUdLtZaWnqu0d7YAOQbWNAkOJRyW3oHSjOg', user: {…}, status: true, msg: 'Login successful..'}
// msg
// : 
// "Login successful.."
// status
// : 
// true
// token
// : 
// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MjgxZTU3ZjQxOTFhYTQ5YzlmYWFjMCIsImlhdCI6MTcxMzkwNTYyMSwiZXhwIjoxNzE0MDc4NDIxfQ.CGPBa9OcZUdLtZaWnqu0d7YAOQbWNAkOJRyW3oHSjOg"
// user
// : 
// {_id: '66281e57f4191aa49c9faac0', name: 'hoho', email: 'hoho@gmail.com', password: '$2a$10$AjPBaVbdzWwimJXuzo1i0u0t3un94ptDAU1.IIm8Gv53AAOU0c1tG', joiningTime: '2024-04-23T20:47:19.874Z', …}
// [[Prototype]]
// : 
// Object