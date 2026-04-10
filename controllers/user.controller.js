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
        // res.render('addDbUser', { message });
        res.status(201).send({
            message,
            data:{
                fullname,
                email,
                age
            }
        })
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

const deleteDbUser = async (req, res) => {
    const { id } = req.params;
    try {
        await UserModel.findByIdAndDelete(id);
        res.status(200).send({
            message: "User deleted successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Error deleting user"
        });
    }
};

const updateDbUser = async (req, res) => {
    const { id } = req.params;
    const { fullname, email, password, age } = req.body;

    try {
        await UserModel.findByIdAndUpdate(id, req.body);
        res.status(200).send({
            message: "User updated successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Error updating user"
        });
    }
};

module.exports = {
    getDbUserPage,
    saveDbUser,
    getDbUser,
    deleteDbUser,
    updateDbUser
}