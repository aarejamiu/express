const UserModel = require("../models/user.model");

const getDbUserPage =(req,res) => {
    let message = " "
    res.render('addDbUser', { message })
}

const saveDbUser = async (req, res) => {
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
};

const getDbUser = async (req, res) => {
    try {
        const users = await UserModel.find().select("-password");
        res.render("dbUsers", { users });
    } catch (error) {
        console.log(error);
        users=[]
        res.render("dbUsers", { users });
    }
};

module.exports = {
    getDbUserPage,
    saveDbUser,
    getDbUser
}