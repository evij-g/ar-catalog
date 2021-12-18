const Element = require("../models/element.model");
const User = require("../models/user.model");
const Marker = require("../models/markers.model");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

async function getHome(req, res) {
    try {
        const {
            ...allElements
        } = await Element.find();
        res.render("catalog", {allElements});
    } catch (error) {
        console.error(error);
    }
}

function getLogin(req, res) {
    res.render("login");
}

function getSignup(req, res) {
    res.render("signup");
}

function getCreateForm(req, res) {
    try {
        const admin = "info@evij.de";
        const isAdmin = req.session.currentUser === admin;

        res.render("upload", {isAdmin});
    } catch (error) {
        console.error(error);
    }
}
async function getAllUsers(req, res) {
    try {
        const admin = "info@evij.de";
        const isAdmin = req.session.currentUser === admin;
        const {
            ...allElements
        } = await Element.find();
        const {
            ...allUsers
        } = await User.find();
        //res.render("private", { allElements, allUsers, isAdmin });
        res.render("userlist", {allUsers, isAdmin});
    } catch (error) {
        console.error(error);
    }
}

async function getCatalogElements(req, res) {
    try {
        const admin = "info@evij.de";
        const isAdmin = req.session.currentUser === admin;
        const {
            ...allElements
        } = await Element.find();
        res.render("catalog", {allElements, isAdmin});

    } catch (error) {
        console.error(error);
    }
}

async function signup(req, res, next) {
    try {
        const {email, password} = req.body;
        const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
        if (!regex.test(password)) {
            res
                .status(500)
                .render("signup", {
                    errorMessage: "Password needs to have at least 6 chars and must contain at least one number, " +
                                "one lowercase and one uppercase letter."
                });
            return;
        }
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);

        const hashedPassword = await bcrypt.hash(password, salt);
        await User.create({email, passwordHash: hashedPassword});
        res.redirect("/");
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            res
                .status(500)
                .render("signup", {errorMessage: error.message});
        } else if (error.code === 11000) {
            res
                .status(500)
                .render("signup", {
                    errorMessage: "Username and email need to be unique. Either username or email is already used" +
                                "."
                });
        } else {
            console.error(error);
            res.redirect("/signup");
        }
    }
}
async function login(req, res) {
    try {
        const {email, password} = req.body;
        if (email === "" || password === "") {
            res.render(
                "login",
                {errorMessage: "Please enter both, email and password to login."}
            );
            return;
        }
        const foundUser = await User.findOne({email});
        const isVerifiedUser = await bcrypt.compare(password, foundUser.passwordHash);
        if (isVerifiedUser) {
            req.session.currentUser = email;
            res.redirect("/catalog");
        } else {
            res.render("login", {errorMessage: "Login failed. Try again."});
        }
    } catch (error) {
        console.error("An error occured while trying to login:", error);
    }
}

async function private(req, res) {
    try {} catch (error) {
        console.error(`An error occured while getting all elements from DB: ${error}`);
    }
}

async function getMarker(){
    try {

        const markerElement = await Marker.findOneAndUpdate({
            inUse: "false"
        }, {inUse: "true"});
        const markerId = markerElement.markerId;
        console.log("markerid: " + markerId);

        const markerLink = markerElement.markerLink;
        console.log("markerlink: " + markerLink);

        return markerElement;
    } catch (error) {
        console.error(`An error occured while getting element from DB ${error}`);
    }
}

async function createElement(req, res) {
    try {
        const {title, width, height, material} = req.body;

        const markerElement = await getMarker();

        await Element.create({
            markerId: markerElement.markerId,
            markerLink: markerElement.markerLink,
            title,
            width,
            height,
            material,
            imageUrl: req.file.path
        });
        res.redirect("/catalog");
    } catch (error) {
        console.error(`An error occured while adding element to DB ${error}`);
    }
}

async function logout(req, res) {
    try {
        req
            .session
            .destroy(() => {
                res.redirect("/");
            });
    } catch (error) {
        console.error(`An Error occured while trying to logout ${error}`);
    }
}

async function deleteUser(req, res) {
    try {
        const userId = req.params.id;
        await User.findByIdAndRemove(userId);
        res.redirect("/userlist");
    } catch (error) {
        console.error(`An Error occured while trying to delete user:  ${error}`);
    }
}

async function getEditElement(req, res) {
    const elementId = req.params.id;
    const element = await Element.findById(elementId);
    res.render("edit-element", {element});
}

async function editElement(req, res) {
    try {
        const elementId = req.params.id;
        const {title, height, width, material} = req.body;
        await Element.findByIdAndUpdate(elementId, {
            title: title,
            height: height,
            width: width,
            material: material,
            imageUrl: req.file.path
        });
        res.redirect("/catalog");
    } catch (error) {
        console.error(`An error occured while trying to edit element: ${error}`);
    }
}

async function resetMarker(markerId){
    try {

        const markerElement = await Marker.findOneAndUpdate({
            markerId: markerId,
        }, {inUse: "false"});
        
        console.log("markerElement updated" + markerElement);
        
    } catch (error) {
        console.error(`An error occured while getting element from DB ${error}`);
    }

}

async function deleteElement(req, res) {
    try {
        const elementId = req.params.id;
        
        const foundElement = await Element.findByIdAndDelete(elementId);
        console.log(foundElement);
        resetMarker(foundElement.markerId);
        res.redirect("/catalog");
    } catch (error) {
        console.error(`An error occured while trying to delete element: ${error}`);
    }
}

async function getCatalogElements(req, res) {
    try {
        const admin = "info@evij.de";
        const isAdmin = req.session.currentUser === admin;
        const {
            ...allElements
        } = await Element.find();
        res.render("catalog", {allElements, isAdmin});

    } catch (error) {
        console.error(error);
    }
}

async function getSingleElement(req, res) {
    try {
        const admin = "info@evij.de";
        const isAdmin = req.session.currentUser === admin;
    const elementId = req.params.id;
    const element = await Element.findById(elementId);
    
    res.render("single-element", {element, isAdmin});
    }
    catch (error) {
        console.error(`An error occured while trying to get element: ${error}`);
    }
}

module.exports = {
    getHome,
    getLogin,
    getSignup,
    getCatalogElements,
    getAllUsers,
    getCreateForm,
    getSingleElement,
    login,
    signup,
    //private,
    createElement,
    logout,
    deleteUser,
    getEditElement,
    editElement,
    deleteElement
};
