const router = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const {registerValidation, loginValidation} = require('../validation');
const bcrypt = require('bcryptjs')


router.post('/register', async (req, res) => {

    //LETS VALIDATE THE DATA BEFORE WE A USER
    const { error } = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //Checking if the user is already in the database
    const emailExist = await User.findOne( {email: req.body.email} );
    if(emailExist) return res.status(400).send('Email already exists');


    //Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    
    //Create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });

    try {
        const savedUser = await user.save();
        res.send( {user: user._id} );
    } catch (err) {
        res.status(400).send(err)
    }
})


// Login 

router.post('/login', async(req, res) => {
     //LETS VALIDATE THE DATA BEFORE WE A USER
     const { error } = loginValidation(req.body);
     if(error) return res.status(400).send(error.details[0].message);

     //Checking if the user is already in the database
    const user = await User.findOne( {email: req.body.email} );
    if(!user) return res.status(400).send('Email is not found');

    //Password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('Invalid Password')

    //create and assign a token
    const token = jwt.sign( {_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);
    
});



module.exports = router;
