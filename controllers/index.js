const Element = require("../models/element.model");
const User = require("../models/user.model");
const Marker = require("../models/markers.model");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
//const fileUploader = require("../config/cloudinary.config");

const Cloud = require('cloudinary').v2;

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

function getContact(req, res) {
    res.render("contact");
}

function getAbout(req, res) {
    res.render("about");
}

function getHowTo(req, res) {
    res.render("how-to");
}

function getIssue(req, res) {
    res.render("issue");
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



async function resetMarker(markerId){
    try {

        const markerElement = await Marker.findOneAndUpdate({
            markerId: markerId,
        }, {inUse: "false"});
        
        //console.log("markerElement updated" + markerElement);
        
    } catch (error) {
        console.error(`An error occured while getting element from DB ${error}`);
    }

}


async function deleteElement(req, res) {
    try {
        const elementId = req.params.id;
        const foundElement = await Element.findById(elementId);
        //console.log("element to delete", foundElement);
        
        const filepath = foundElement.imageUrl;
        console.log("filepath",filepath);
        let filename = filepath;
       
        let folderAndFilename = filename.replace(/.*\d\//,'');
        folderAndFilename = folderAndFilename.replace('.png','');
        folderAndFilename = folderAndFilename.replace('.jpg','');
        console.log("filename",folderAndFilename);

        await Cloud.uploader.destroy(folderAndFilename, function(result) { console.log("delete element:", result) });
        await Element.findByIdAndDelete(elementId);
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
        } = await Element.find().sort({ _id: -1});
        
        //console.log(allElements);
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
    const foundMarker = element.markerId;
    const marker = await Marker.findOne({markerId: foundMarker});
   
    res.render("single-element", {element, marker, isAdmin});
    }
    catch (error) {
        console.error(`An error occured while trying to get element: ${error}`);
    }
}

async function getARSingleElement(req, res) {
    try {
        //const admin = "info@evij.de";
        //const isAdmin = req.session.currentUser === admin;
    const elementId = req.params.id;
    const element = await Element.findById(elementId);
    console.log("element markerID",element.markerId);
    const foundMarker = element.markerId;
    const marker = await Marker.findOne({markerId: foundMarker});
    console.log("marker", marker);
    console.log(marker.inUse);
    
    res.render("ar-view", {element, marker, layout: false});
    }
    catch (error) {
        console.error(`An error occured while trying to get element: ${error}`);
    }
}

async function setMarker(update){
    //console.log("setMarker -> patternFileLink", patternFileLink);
    let markerElement ="";
    try {
        Marker.find().sort({markerId:1});    
        if(update){

        
        markerElement = await Marker.findOneAndUpdate({
            inUse: "false"
        }, {inUse: "true", 
        //markerLink: patternFileLink,
       });
    }else{
      
        markerElement = await Marker.findOne({
            inUse: "false",
        });
        
    }

        
        //const markerId = markerElement.markerId;
        //const markerLink = markerElement.markerLink;
        
        //const markerElement = Marker.patternLink;
        
       

        return markerElement;

        
    } catch (error) {
        console.error(`An error occured while getting Marker from DB ${error}`);
    }
}


async function uploadMarkerImage(base64){
    try {
        const str =base64;
         //console.log("fileStr", fileStr);
        const uploadResponse = await Cloud.uploader.upload(str, {resource_type: "image",format:"png"});
        console.log(uploadResponse);
        return uploadResponse.secure_url;
        //res.json({ msg: 'yaya' });
    } catch (err) {

        console.error("uploadMarkerImage",err);
        //res.status(500).json({ err: 'Something went wrong' });
    }
}


async function getCreateForm(req, res) {
    try {
        const admin = "info@evij.de";
        const isAdmin = req.session.currentUser === admin;

        const markerElement = await setMarker(false);
        

        res.render("upload", {isAdmin, markerElement});
    } catch (error) {
        console.error(error);
    }
}
  

async function createElement(req, res) {

    try {

    
        const {title, width, height, material, position, scale, markerSize, rotation} = req.body;
        const markerElement = await setMarker(true);


        await Element.create({
            markerId: markerElement.markerId,
            markerLink: markerElement.markerLink,
            markerSize,
            title,
            width,
            height,
            position,
            rotation,
            scale,
            
            material,
            imageUrl: req.file.path,
        });
        res.redirect("/catalog");
    } catch (error) {
        console.error(`An error occured while adding element to DB ${error}`);
    }
}

async function getEditElement(req, res) {
    const admin = "info@evij.de";
    const isAdmin = req.session.currentUser === admin;
    const elementId = req.params.id;
    const element = await Element.findById(elementId);
    res.render("edit-element", {element, isAdmin});
}

async function editElement(req, res) {
    try {
        const admin = "info@evij.de";
    const isAdmin = req.session.currentUser === admin;
        const elementId = req.params.id;
        const {title, height, width, position, rotation, scale, markerSize, material} = req.body; // position, rotation,
        console.log("req.body",req.body);
        await Element.findByIdAndUpdate(elementId, {
            title: title,
            height: height,
            width: width,
            position: position,
            rotation: rotation,
            scale: scale,
            markerSize: markerSize,
            material: material
        });
       
        const element = await Element.findById(elementId);
       res.render("edit-element", {element, isAdmin});
    } catch (error) {
        console.error(`An error occured while trying to edit element: ${error}`);
    }
}

async function editImage(req, res) {
    try {
      const imageId = req.params.id;
      console.log("imageId",imageId);
      console.log("filepath",req.file.path);
  
      await Element.findByIdAndUpdate(imageId, {
        imageUrl: req.file.path,
      });
      res.redirect('/catalog')
    } catch (error) {
      console.error(`An error occured while trying to edit image: ${error}`);
    }
  }

module.exports = {
    getHome,
    getLogin,
    getSignup,
    getContact,
    getIssue,
    getHowTo,
    getAbout,
    getCatalogElements,
    getAllUsers,
    getCreateForm,
    getSingleElement,
    getARSingleElement,
    login,
    signup,
    //private,
    createElement,
    logout,
    deleteUser,
    getEditElement,
    editElement,
    editImage,
    deleteElement
};
