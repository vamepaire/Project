document.addEventListener("DOMContentLoaded", function () {
  const successMessage = document.getElementById("successMessage");
  if (successMessage) {
    setTimeout(() => {
      successMessage.style.display = "none";
    }, 2500);
  }
});
