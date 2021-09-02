const express = require('express');
const router = new express.Router();
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const User = require('../models/user');
const Cart = require('../models/cart');
const auth = require('../middleware/auth');
const TOKEN_KEY = 'XjgPUoJWXV';

// Register user
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // check if user already exist
        // Validate if user exist in our database
        const userExist = await User.findOne({ email: email });

        if (userExist) {
            return res.status(409).send("User Already Exist. Please Login");
        }

        //Encrypt user password
        const encryptedPassword = await bcrypt.hash(password, 10);

        //create user
        const user = await User.create({
            name,
            email: email.toLowerCase(),
            password: encryptedPassword
        });
        res.status(201).json({registered: true});

    } catch (e) {
        res.status(400).json({
            registered: false,
            error: e.message
        });
    }
})

// Login
router.post("/login", async (req, res) => {
    try {
        const { email, password, userId } = req.body;
        //check if user exist
        const user = await User.findOne({ email: email });
        
        if (user && (await bcrypt.compare(password, user.password))) {
            //create token
            const token = jwt.sign(
                {email},
                TOKEN_KEY,
                {
                    expiresIn: 360000,
                }
            )
            if(userId){
                const res = await Cart.updateMany({userId: userId}, {userId: user.email});
            }
            res.status(200).json({
                auth: true,
                token: token,
                user
            })
        }
        else{
            //throw new Error("Invalid Credentials");
            res.status(404).send("Invalid Credentials");
        }
        
    } catch (e) {
        res.status(400).json({
            auth: false,
            error: e.message
        });
    }
});

router.get('/user', auth, async (req, res) => {
    try{
        const userEmail = req.user.email;
        const token = req.user.token;
        const user = await User.findOne({ email: userEmail });
        if(user){
            res.status(200).json({
                auth: true,
                token,
                user
            })
        }else{
            throw new Error('User not Found...');
        }
        
    }catch(e){
        res.status(400).json({
            auth: false,
            error: e.message
        });
    }
})

module.exports = router;