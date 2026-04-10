const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const UserModel = require('./models/user.model');
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}))

// let gender = "Male";
// app.get("/users",(req,res)=>{
//     res.render("allUsers", { gender });
// })


mongoose.connect(process.env.MONGODB_URI)
.then(() =>
    {console.log("Connected to MongoDB")
})
.catch((error) =>{
    console.log("Error connecting to MongoDB:", error)
});

const users = [
        { fullname: "John Doe", age: 30, email: "john.doe@example.com", course: "Software Engineering" },
        { fullname: "Jane Smith", age: 25, email: "jane.smith@example.com", course: "Data Science" },
        { fullname: "Alice Johnson", age: 28, email: "alice.johnson@example.com", course: "Web Development" },
        { fullname: "Bob Brown", age: 35, email: "bob.brown@example.com", course: "Mobile Development" }
    ];

app.get('/users', (req, res) => {
    res.render("allUsers", { users });
});

app.get('/adduser', (req,res) => {
    res.render('addUser')
})
app.post('/adduser', (req,res) =>{
    console.log(req.body)

    const { fullname, email, course, age } = req.body

    users.push(req.body)

    res.render('allUsers', { users })
})

app.post('/deleteuser/:id', (req,res) => {
    console.log(req.params);
    const { id } = req.params;
    users.splice(id, 1)
    res.render('allUsers', { users })
    
})

app.get('/edituser/:id', (req,res) => {
    const { id } = req.params;
    res.render('editUser', { user: users[id], id })
})

app.post('/edituser/:id', (req,res) => {
    const { id } = req.params;
    const { fullname, email, course, age } = req.body;
    users[id] = { fullname, email, course, age }
    res.redirect('/users')
})

app.get('/addDbUser', (req,res) => {
    let message = " "
    res.render('addDbUser', { message })
})

app.post('/addDbUser', async(req,res) => {
    const { fullname, email, password, age } = req.body;

    let message;
    try {
        await UserModel.create(req.body)
        res.send("User added successfully")
        message = "User added successfully"
        res.render('addDbUser', { message })
    } catch (error) {
        console.log(error);
        message = "Error adding user"
        res.render('addDbUser', { message })
    }
})























app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
}).on('error', (error) => {
    console.log(`Error occurred while starting the server: ${error}`);
});
