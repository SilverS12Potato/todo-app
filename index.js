const express = require("express");
const bodyParser = require("body-parser");
const app = express();

//Middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public")); //serve static files
app.set("view engine", "ejs"); //set ejs template

let todos =[];

//routes
app.get('/', (req, res) => {
    res.render("index", {todos});
});

app.post("/add", (req, res)=> {
    const newToDo = req.body.todo;
    if(newToDo) todos.push(newToDo);
    res.redirect("/");
});

app.post("/delete", (req, res) => {
    const index = req.body.index;
    if (index !== undefined) {
      todos.splice(index, 1); 
    }
    res.redirect("/");
  });

//Start server
const PORT = 3000;
app.listen(PORT, ()=> {
    console.log(`Server is running at http://localhost:${PORT} `)
});