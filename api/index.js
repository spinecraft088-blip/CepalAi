const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Your API key is safely stored here
const GROQ_API_KEY = process.env.GROQ_API_KEY; 
// No more "gsk_..." here!
app.post('/v1/chat/completions', async (req, res) => {
    try {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${GROQ_API_KEY}`, // FIXED THIS LINE
                "Content-Type": "application/json"
            },
            body: JSON.stringify(req.body)
        });
        const data = await response.json();
        res.status(response.status).json(data);
    } catch (error) {
        console.error("Internal Error:", error);
        res.status(500).json({ error: { message: "Internal Server Error" } });
    }
});

module.exports = app;
