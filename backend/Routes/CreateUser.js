const express = require('express')
const  router = express.Router()
const User = require("../models/User")

const { body , validationResult} = require("express-validator") // for validation



// E.g. body('password').isLength({min : 5})    if pswd length is less than 5, in error it will give 'Invalid value' as msg , to change this we can use
// body('password', 'Incorrect Password').isLength({min : 5}) now it pswd is invalid, it will show "incorrect password" in msg feild of error


router.post("/createuser", [body('email').isEmail(), body('name').isLength({min : 5}) ,body('password', 'Incorrect Password').isLength({min : 5}) ],async (req,res)=>{

    const errors = validationResult(req) // validating request
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors : errors.array() });
    }

    try{
        await User.create({
           
            // name : "Simran"     // static values for testing purposes only

            // values from request body
            name : req.body.name ,
            password: req.body.password ,
            email : req.body.email ,
            location : req.body.location
        })

        .then(res.json({success : true}));
    }

    catch (error){
        console.log(error);
        res.json({success : false});
    }
})


router.post("/loginuser" ,[body('email').isEmail(),body('password', 'Incorrect Password').isLength({min : 5}) ],async (req,res)=>{

    const errors = validationResult(req) // validating request
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors : errors.array() });
    }


    try{
        let userData = await User.findOne({email : req.body.email});  // find user by his email in the database

        if(!userData){
            return res.status(400).json({Error : "Invalid Email ID Entered"})
        }

        if(req.body.password !== userData.password){
            return res.status(400).json({Error : "Invalid Password Entered"})
        }

        return res.json({success : true})
    }
        

    catch (error){
        console.log(error);
        res.json({success : false});
    }
})

module.exports = router;