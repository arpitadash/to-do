const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.gptQuery = async (req, res) => {
    let response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          "role": "system",
          "content": "given the product, you return the shelf lives of the following where you return the average life in days. example return only 7 if the shelf life is 7 days\n"
        },
        {
          "role": "user",
          "content": "apple"
        }
      ],
      max_tokens: 256,
    })

    res.json({ message: "expiry date fetched successfully", response});
    return response;
};
