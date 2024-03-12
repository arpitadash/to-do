const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
    title: {
        type: "String",
        required: true,
    },
    description: {
        type: "String",
    },
    completionDate: {
        type: "Date",
        required: true,
    },
    creationDate: {
        type: "Date",
        required: true,
    }
});

const Todo = mongoose.model("todo", TodoSchema);

module.exports = Todo;