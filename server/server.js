require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db"); 
const todo = require("./routes/todo");
const cors = require("cors"); 
const app = express();
connectDB();
// initialize middleware
app.use(express.json({ extended: false }));
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
app.use(cors({ origin: ['http://localhost:3000'], credentials: true }));


app.get("/", (req, res) => res.send("Server up and running"));

// app.post("/api/todo/query/:task", async (req, res) => {
//     let response = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo",
//       messages: [
//         {
//           "role": "system",
//           "content": "given the product, you return the shelf lives of the following where you return the average life in days. example return only 7 if the shelf life is 7 days\n"
//         },
//         {
//           "role": "user",
//           "content": "apple"
//         }
//       ],
//       max_tokens: 256,
//     })

//     res.json({ message: "expiry date fetched successfully", response});
//     return response;
// })
app.use("/api/todo", todo);
// setting up port
const PORT = process.env.PORT || 8000;
app.use(function(req, res, next){
  res.status(404); 
  res.send({ error: 'API not found' });

  });
app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
});
