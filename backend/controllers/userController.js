const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const ApiError = require('../error/ApiError')

//  GENERATE JWT
function generateToken(id) {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
}

//  Register User
//  POST /api/users
//  Public Route
const registerUser = async (req, res, next) => {
    const { name, email, password, profileImage } = req.body;

    //  CHECK FIELDS AREN'T BLANK
    if(!name || !email || !password) {
        next(ApiError.badRequest('Please include a name, email and password.'));
        return;
    }
    //  CHECK USER EXISTS
    const userExists = await User.findOne({ email });
    if(userExists){
        next(ApiError.badRequest('A user with this email already exists.'));
        return;
    }
    //  HASH PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);
    //  CREATE USER & STORE IN DB
    const user = await User.create({
        username: name,
        email,
        password: hashedPass
    });
    //  CHECK USER IS CREATED & STORED IN DB
    if(user){
        res.status(201).json({
            _id: user.id,
            name: user.username,
            email: user.email,
            token: user._id
        })
    } else {
        next(ApiError.badRequest('Could not create user.'));
    }
}

//  Authenticate User
//  POST /api/users/login
//  Public Route
const loginUser = async (req, res, next) => {
    const {email, password} = req.body
    //  CHECK FIELDS AREN'T BLANK
    if(!email || !password) {
        next(ApiError.badRequest('Please fill in all required fields.'));
        return;
    }
    //  IF USER EXISTS
    const user = await User.findOne({ email });
    if(!user){
        next(ApiError.badRequest('Your email or password is invalid.'));
        return;
    }
    //  CHECK PASSWORD MATCHES HASHED PASS IN DB
    const passwordMatch = await bcrypt.compare(password, user.password);
    //  HANDLE RESULT OF PASSWORD COMPARISON
    if(passwordMatch){
        res.status(201).json({
            _id: user.id,
            name: user.username,
            email: user.email,
            token: generateToken(user._id)
        })
    }
    else {
        next(ApiError.badRequest('Your email or password is invalid.'));
        return;
    }
}

//  Get User
//  GET /api/users/current
const getCurrentUser = async (req, res) => {
    res.status(200).json({message: 'get current user'})
}

//  Delete User
//  DELETE /api/users/current
//  Private Route
const deleteCurrentUser = async (req, res) => {
    res.status(200).json({message: 'deleted current user'})
}


module.exports = { 
    registerUser, 
    loginUser,
    getCurrentUser,
    deleteCurrentUser
}