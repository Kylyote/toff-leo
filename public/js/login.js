const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const email = document.querySelector("#email-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();
  const emailLabel = document.querySelector("#email-login-label");
  const passwordLabel = document.querySelector("#password-login-label");
  if (email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace("/");
    } else {
      emailLabel.innerHTML = "Email <span style='color:red'>may be incorrect.</span>";
      passwordLabel.innerHTML = "Password <span style='color:red'>may be incorrect.</span>";
    }
  } else {
    if (!email){
      emailLabel.innerHTML = "Email <span style='color:red'> * </span>";
      }

      if (!password){
        passwordLabel.innerHTML = "Password <span style='color:red'> * </span>";
        }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector("#name-signup").value.trim();
  const email = document.querySelector("#email-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();
  const newEmailLabel = document.querySelector("#new-email-label");
  const newPasswordLabel = document.querySelector("#new-password-label");
  const newUserLabel = document.querySelector("#new-user-label");

  function checkPasswordStrength(password) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(password);
  }
  
  // Example usage:
  const isStrongPassword = checkPasswordStrength(password);
  console.log(isStrongPassword); 
console.log(email)
  if (name && email && password && isStrongPassword) { 
    
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      newEmailLabel.innerHTML = "Email <span style='color:red'> must not have been previously used.</span>";
      
    newUserLabel.innerHTML = "password <span style='color:red'>may already be in use.</span>";
    
      console.log(response)
    }
  
  } else {
    if (!email){
    newEmailLabel.innerHTML = "Email <span style='color:red'> * </span>";
    }
    if (!name){
      newUserLabel.innerHTML = "User Name <span style='color:red'> * </span>";
      }

      if (!password){
        newPasswordLabel.innerHTML = "Password <span style='color:red'> * </span>";
        }

    newPasswordLabel.innerHTML = "password <span style='color:red'>  Must have at least 8 characters, at least one Uppercase, one Lowercase, and one Number.</span>";

  }
};

document
  .querySelector("#login-form")
  .addEventListener("click", loginFormHandler);

document
  .querySelector("#signup-form")
  .addEventListener("click", signupFormHandler);
