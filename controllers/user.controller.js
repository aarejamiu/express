const bcrypt = require("bcryptjs");
const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { request } = require("express");

const getDbUserPage =(req,res) => {
    let message = " "
    res.render('addDbUser', { message })
}

const getLoginPage = (req, res) => {
    let message = "";
    res.render('login', { message });
};

const saveDbUser = async (req, res) => {
    const { fullname, email, password, age } = req.body;

    let message;
    try {
        let salt = 20;
        let saltRounds = await bcrypt.genSalt(salt);
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        
        let user = await UserModel.create({ fullname, email, password: hashedPassword, age });
        message = "User added successfully";
        // res.render('addDbUser', { message });
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).send({
            message,
            token,
            data:{
                fullname,
                email,
                age
            }
        })
    } catch (error) {
        if (error.code === 11000) {
            message = "Email already exists";
            return res.status(409).send({ message });
        }

        console.log(error);
        message = "Error adding user";
        res.status(500).send({ message });
    }
};

const loginDbUser = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send({ message: "Invalid Email or Password" });
        }

        res.status(200).send({ 
            message: "Login successful",
            user,
            data: {
                fullname: user.fullname,
                email: user.email,
                course: user.course,
                age: user.age
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error logging in" });
    }
};

const getDbUser = async (req, res) => {
    let users = [];
    try {
        users = await UserModel.find().select("-password");
    } catch (error) {
        console.log(error);
    }
    res.render("dbUsers", { users });
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

const verifyUser = async (req, res,next)=> {
    const token = req.headers.authorization?.split(" ")[1]?req.header.authorization.split(" ")[1]:req.header.authorization.split(" ")[0];
    try {
        await jwt.verify(token, process.env.JWT_SECRET, function(err, decoded)) {
            if (err) {
                console.log(err);
                res.status(401).send({ message: "Unauthorized" });
                return;
            }

            console.log(decoded);
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error verifying user" });
    }
}

module.exports = {
    getDbUserPage,
    getLoginPage,
    saveDbUser,
    getDbUser,
    deleteDbUser,
    updateDbUser,
    loginDbUser,
    verifyUser
}

