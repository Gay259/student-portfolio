const express = require("express");

const router = express.Router();

// Test contact API
router.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Contact API is working!"
    });
});

// Receive contact form data
router.post("/", (req, res) => {
    const { name, email, message } = req.body;

    // Check required fields
    if (!name || !email || !message) {
        return res.status(400).json({
            success: false,
            message: "Please fill all fields."
        });
    }

    console.log("New Contact Message:");
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Message:", message);

    res.status(201).json({
        success: true,
        message: "Your message was received successfully! 🎉"
    });
});

module.exports = router;