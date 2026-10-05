lucide.createIcons();

const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("password");

togglePassword.addEventListener("click", () => {
    const isHidden = passwordInput.type === "password";

    passwordInput.type = isHidden ? "text" : "password";
    togglePassword.classList.toggle("showing", isHidden);
    togglePassword.setAttribute("aria-label", isHidden ? "Hide password" : "Show password");
});