require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);
const express = require('express');
const bcrypt = require('bcryptjs');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const UserModel = require('./models/user.model');
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}))
const userRoute = require("./routes/user.route");

// let gender = "Male";
// app.get("/users",(req,res)=>{
//     res.render("allUsers", { gender });
// })


const dbUri = process.env.MONGODB_URI;
if (!dbUri) {
    console.error("MONGODB_URI is not defined. Check your .env file.");
    process.exit(1);
}

mongoose.connect(dbUri)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    });

app.use("/", userRoute);

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



















const port = process.env.PORT || 3004;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}).on('error', (error) => {
    console.log(`Error occurred while starting the server: ${error}`);
});


// encription and decryption
// password hashing: BcriptJs is used to hash password before saving to the database and compare hashed password during login.