// Contact Form
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (contactForm) {
    contactForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;

        try {

            const response = await fetch("http://localhost:3000/api/contact", {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name: name,
                    email: email,
                    message: message
                })
            });

            const data = await response.json();

            if (data.success) {

                formMessage.textContent =
                    "Message sent successfully! ✅";

                contactForm.reset();

            } else {

                formMessage.textContent =
                    "Something went wrong. ❌";

            }

        } catch (error) {

            console.error(error);

            formMessage.textContent =
                "Backend is not connected. ❌";

        }

    });
}