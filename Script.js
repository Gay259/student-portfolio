// Contact Form
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

// Online backend URL
const API_URL = "https://student-portfolio-3na6.onrender.com";

if (contactForm) {
    contactForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        // Basic validation
        if (!name || !email || !message) {
            formMessage.textContent =
                "Please fill in all fields. ❌";
            return;
        }

        formMessage.textContent = "Sending message... ⏳";

        try {

            const response = await fetch(`${API_URL}/api/contact`, {
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

            if (response.ok && data.success) {

                formMessage.textContent =
                    "Message sent successfully! ✅";

                contactForm.reset();

            } else {

                formMessage.textContent =
                    data.message || "Something went wrong. ❌";
            }

        } catch (error) {

            console.error("Contact form error:", error);

            formMessage.textContent =
                "Unable to connect to the server. ❌";
        }
    });
}