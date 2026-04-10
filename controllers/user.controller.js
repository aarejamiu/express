const UserModel = require("../models/user.model");

app.get('/addDbUser', (req,res) => {
    let message = " "
    res.render('addDbUser', { message })
})

app.post('/addDbUser', async (req, res) => {
    const { fullname, email, password, age } = req.body;

    let message;
    try {
        await UserModel.create(req.body);
        message = "User added successfully";
        res.render('addDbUser', { message });
    } catch (error) {
        console.log(error);
        message = "Error adding user"
        res.render('addDbUser', { message })
    }
});

app.get("/dbUsers", async(req,res) => {
    try {
        const users = await UserModel.find();
        res.render("dbUsers", { users });
    } catch (error) {
        console.log(error);
        users=[]
        res.render("dbUsers", { users });
    }
});