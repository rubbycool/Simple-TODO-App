const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
const connectDB = require('./db')
const dotenv = require("dotenv");

//models
const TodoTask = require("./models/TodoTask");


dotenv.config();

app.set("view engine", "ejs");

app.use("/static", express.static("public"));
app.use(express.urlencoded({ extended: true }));

// connect to db
connectDB();

// Post Method
app.post('/',async (req, res) => {
    const todoTask = new TodoTask({
        content: req.body.content
    });
        try {
            await todoTask.save();
        res.redirect("/");
            } catch (err) {
        res.redirect("/");
            }
});

// Get Method
app.get("/", (req, res) => {
    TodoTask.find({}, (err, tasks) => {
    res.render("todo.ejs", { todoTasks: tasks });
    });
});

//Update method on a task
app
.route("/edit/:id")
.get((req, res) => {
    const id = req.params.id;
    TodoTask.find({}, (err, tasks) => {
    res.render("todoEdit.ejs", { todoTasks: tasks, idTask: id });
});
})
.post((req, res) => {
    const id = req.params.id;
    TodoTask.findByIdAndUpdate(id, { content: req.body.content }, err => {
        if (err) return res.send(500, err);
    res.redirect("/");
    });
});

//Delete method on task
app.route("/remove/:id").get((req, res) => {
    const id = req.params.id;
    TodoTask.findByIdAndRemove(id, err => {
    if (err) return res.send(500, err);
    res.redirect("/");
    });
    });

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
