const express = require("express");
const router = express.Router();
const {
    getAllTodo,
    postCreateTodo,
    putUpdateTodo,
    deleteTodo,
} = require("../controllers/todo");
const gptQuery = require("../controllers/openaiquery");
/**
 * @route GET api/todo
 * @description get all todo
 * @access public
 */
router.get("/", getAllTodo);

/**
 * @route POST api/todo
 * @description add a new todo
 * @access public
 */
router.post("/",postCreateTodo);

/**
 * @route PUT api/todo/:id
 * @description update todo
 * @access public
 */
router.put("/:id",putUpdateTodo);

/**
 * @route DELETE api/todo/:id
 * @description delete todo
 * @access public
 */
router.delete("/:id",deleteTodo);

// router.post('/query/:item', async (req, res) => {
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
// };);

module.exports = router;