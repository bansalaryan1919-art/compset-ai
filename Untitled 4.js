{\rtf1\ansi\ansicpg1252\cocoartf2870
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww28600\viewh17280\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 const express = require('express');\
const cors = require('cors');\
const \{ GoogleGenAI \} = require('@google/genai');\
\
const app = express();\
app.use(cors());\
app.use(express.json());\
\
// Initialize Gemini using your free API Key from AI Studio\
const ai = new GoogleGenAI(\{ apiKey: process.env.GEMINI_API_KEY \});\
\
const SYSTEM_INSTRUCTION = `\
You are AirBot, an expert technical assistant for Compset Air (located in Bawana, Delhi NCR).\
Your job is to answer ANY general, technical, or practical question related to air compressors.\
- You answer questions about screw compressors, piston compressors, air dryers, tanks, CFM sizing formulas, pressure units, troubleshooting, maintenance, and calculations.\
- Handle typos gracefully.\
- Keep answers concise (2-4 sentences max) and easy to read.\
- End helpful responses by suggesting they contact Director Mr. Rahul Bansal at +91 9811869030 for quotes or site visits.\
`;\
\
app.post('/api/chat', async (req, res) => \{\
    try \{\
        const \{ message \} = req.body;\
        const response = await ai.models.generateContent(\{\
            model: 'gemini-2.5-flash',\
            contents: message,\
            config: \{ systemInstruction: SYSTEM_INSTRUCTION \}\
        \});\
        res.json(\{ reply: response.text \});\
    \} catch (err) \{\
        res.status(500).json(\{ reply: "Sorry, I am having trouble connecting right now." \});\
    \}\
\});\
\
const PORT = process.env.PORT || 3000;\
app.listen(PORT, () => console.log(`Server running on port $\{PORT\}`));}