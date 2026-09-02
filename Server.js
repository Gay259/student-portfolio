require("dotenv").config();

const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Student Portfolio Backend is Running 🚀"
    });
});

// Gmail configuration
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
});

// Contact API
app.post("/api/contact", async (req, res) => {

    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({
            success: false,
            message: "Please fill all fields."
        });
    }

    const mailOptions = {
        from: process.env.GMAIL_USER,
        to: process.env.GMAIL_USER,
        replyTo: email,
        subject: `New Portfolio Message from ${name}`,
        text: `
Name: ${name}
Email: ${email}

Message:
${message}
        `
    };

    try {
        await transporter.sendMail(mailOptions);

        console.log("Email sent successfully!");

        res.json({
            success: true,
            message: "Message sent successfully!"
        });

    } catch (error) {

        console.log("Email error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to send email."
        });
    }
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});;