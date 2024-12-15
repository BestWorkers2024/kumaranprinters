const scriptURL = 'https://script.google.com/macros/s/AKfycby64_5qiZJRhd0KUKhnSPwI1Zxdpf970rBhQ_WkaowliRjzHX2RWgrFmM1hSf-toxAPoA/exec';
const form = document.forms['contact-form'];
const email = document.getElementById("email");
const phone = document.getElementById("mnumber");

// Email validation
function isValidEmail(emailValue) {
    const emailRegex = /^[a-zA-Z\d._%+-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(emailValue);
}

// Phone validation
function isValidPhone(phoneValue) {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phoneValue);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validate phone
    if (!isValidPhone(phone.value)) {
        Swal.fire({
            title: "Invalid Input",
            text: "Please enter a valid 10-digit mobile number.",
            icon: "warning",
        });
        return;
    }

    // Validate email
    if (!isValidEmail(email.value)) {
        Swal.fire({
            title: "Invalid Input",
            text: "Please enter a valid email address.",
            icon: "warning",
        });
        return;
    }

    // Submit form if validation passes
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then((response) => {
            if (response.ok) {
                Swal.fire({
                    title: "Success!",
                    text: "Thank you! Your form has been submitted successfully.",
                    icon: "success",
                });
                form.reset();
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Failed to submit the form. Please try again.",
                    icon: "error",
                });
            }
        })
        .catch((error) => {
            Swal.fire({
                title: "Error",
                text: "An unexpected error occurred. Please try again later.",
                icon: "error",
            });
        });
});

