const {User, validate} = require('../models/users');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');


router.post('/', async(req, res)=>{
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ username: req.body.username});
     if(user) return res.status(400).send('User Already Registered');

    user = new User({
        username: req.body.username,
        password: req.body.password
    });
    user = await user.save();
    const token = user.generateToken()
    res.header('x-auth-token', token).send(token)

});

module.exports = router