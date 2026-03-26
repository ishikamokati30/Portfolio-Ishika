const contactForm = document.getElementById("contactForm");
const successMessage = document.getElementById("successMessage");

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function showError(field, message) {
  const formGroup = field.parentElement;
  const errorText = formGroup.querySelector(".error-message");

  formGroup.classList.add("error");
  errorText.textContent = message;
}

function clearError(field) {
  const formGroup = field.parentElement;
  const errorText = formGroup.querySelector(".error-message");

  formGroup.classList.remove("error");
  errorText.textContent = "";
}

function validateField(field) {
  const value = field.value.trim();

  if (!value) {
    showError(field, "This field is required.");
    return false;
  }

  if (field.type === "email" && !emailPattern.test(value)) {
    showError(field, "Please enter a valid email address.");
    return false;
  }

  clearError(field);
  return true;
}

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const fields = Array.from(contactForm.querySelectorAll("input, textarea"));
  let isFormValid = true;

  fields.forEach((field) => {
    const isFieldValid = validateField(field);

    if (!isFieldValid) {
      isFormValid = false;
    }
  });

  if (!isFormValid) {
    successMessage.textContent = "";
    return;
  }

  successMessage.textContent =
    "Message sent successfully! I will get back to you soon.";
  contactForm.reset();
  fields.forEach(clearError);
});

contactForm.querySelectorAll("input, textarea").forEach((field) => {
  field.addEventListener("input", function () {
    validateField(field);
  });
});
