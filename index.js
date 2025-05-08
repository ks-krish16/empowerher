// server.js

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import OpenAI from 'openai';
import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from 'axios';

// Fix __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 8080;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");



   
const openai = new OpenAI({
  apiKey: "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",
});



app.get("/",(req,res)=>{
    res.render("home.ejs")
})
app.get("/services",(req,res)=>{
    res.render("learn.ejs")
})
app.get("/game",(req,res)=>{
  res.render("game.ejs")
})
app.get("/resume",(req,res)=>{
  res.render("resume.ejs")
})
app.get("/python",(req,res)=>{
    res.render("python.ejs")
})
app.get("/javascript",(req,res)=>{
  res.render("js.ejs")
})
app.get("/aiml",(req,res)=>{
  res.render("aiml.ejs")
})

app.post('/resume', async(req,res)=>{
  const {name,number,email,linkedin,location,workExp,education,project}=req.body;
  const genAI = new GoogleGenerativeAI("AIzaSyC1j32I0giko-ipdyowy2RCcWVKl5UtSPU"); 
  
  try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      const result = await model.generateContent(`
         "Create a professional resume based on the following details.
          Structure the resume into sections such as Summary, Skills, Experience, Education, and projects. Use concise bullet points where appropriate.
          write the summary according to user skills and projects made by them
          Ensure proper formatting and a formal tone. Here are the user details:
          name=${name}
          number=${number}
          email=${email}
          linkedin profile link= ${linkedin}
          location(city,state)=${location}
          work experience= ${workExp}
          education= ${education}
          projects=${project}
           Generate a resume in plain text format (no markdown, no asterisks, no bullet symbols like *, -, or ·).
          Do not use any formatting symbols or lines.
          Use only spacing and indentation for organization.
        `);
      const response = await result.response;
      const aiReply = response.text();

      res.json({ reply: aiReply });
  } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Failed to fetch response' });
  }  


})


app.post('/python', async (req, res) => {
  const userMessage = req.body.message;
  const genAI = new GoogleGenerativeAI("AIzaSyDeut_exL-wIC-2xa0PzGVuUR71mJyG-8g"); 
  
  try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      const result = await model.generateContent(`
        You are a Python programming tutor.
          Start teaching Python from a beginner level, assuming the user has no prior experience.
          Explain each concept clearly in 3-4 lines using simple language and code examples.
          After each topic, provide a short interactive quiz or ask if they understood.
          If the user says "no", explain it again more simply.
          User: ${userMessage}
        `);
      const response = await result.response;
      const aiReply = response.text();

      res.json({ reply: aiReply });
  } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Failed to fetch response' });
  }
});




app.post('/javascript', async (req, res) => {
const genAI = new GoogleGenerativeAI("AIzaSyCGwXRIkEzkR9HlZWFHufkOAJoBt4AwMt8"); 
  const userMessage = req.body.message;
  
  try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      const result = await model.generateContent(`
        You are a Javascript programming tutor.
          Start teaching javascript from a beginner level, assuming the user has no prior experience.
          Explain each concept clearly in 3-4 lines using simple language and code examples.
          After each topic, provide a short interactive quiz or ask if they understood.
          If the user says "no", explain it again more simply.
          User: ${userMessage}
        `);
      const response = await result.response;
      const aiReply = response.text();

      res.json({ reply: aiReply });
  } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Failed to fetch response' });
  }
});
app.post('/aiml', async (req, res) => {
  const userMessage = req.body.message;
  const genAI = new GoogleGenerativeAI("AIzaSyAYhwANi8H_hJkhywaefBm16Odkw8HMcWA"); 
  
  try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      const result = await model.generateContent(`
       You are an AI and ML programming tutor.
Teach AI and Machine Learning starting from beginner level.
The user already knows Python — do not teach or explain Python syntax, functions, or basic programming concepts.
Explain each AI/ML concept clearly in 3–4 lines using simple language. Include Python code examples only when demonstrating AI/ML techniques.
After each topic, provide a short interactive quiz or ask if the user understood.
If the user says "no", explain it again using even simpler language and more intuitive examples.
Avoid using bullets, asterisks, or decorative symbols in your response.
Only teach AI and ML — do not explain general Python programming.

User message: ${userMessage}
        `);
      const response = await result.response;
      const aiReply = response.text();

      res.json({ reply: aiReply });
  } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Failed to fetch response' });
  }
});

app.listen(port,()=>{
    console.log(`listening to ${port}`)
})

