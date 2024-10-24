document.addEventListener('DOMContentLoaded', () => {
    const successMessage = document.querySelector('#successMessage');
    console.log(successMessage);

    if (successMessage) {
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 3000);
    }
});