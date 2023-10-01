const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken') 
const User = require('../model/User')
const AuthController = {
    checkAuth:async (req, res) => {
        try {
            const id = req.user._id;
            const user = await User.findById(id)
            res.status(200).json(user)
        } catch (error) {
            res.status(401).json({message: error.message})
        }
    },
    register : async (req, res) => {
        const {
            username,
            email,
            password,
            address,
            work,
            profile_picture_path
        } = req.body
        const salt = await bcrypt.genSalt()
        const hashPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            username,
            email,
            password: hashPassword,
            address,
            work,
            profile_picture_path
        })
        try {
            await newUser.save()
            return res.status(201).json(newUser)
        } catch (error) {
            return res.json(error)
        }
    },

    login: async (req, res) => {

       try {
        const { email, password } = req.body
        const user = await User.findOne({email})
        if(!user) return res.status(401).json({message : "Unauthentication"})
        const compare = await bcrypt.compare(password, user.password)
        if(!compare) return res.status(401).json({message: "Password is incorrect"})
        const token = getToken(user);
        
        return res.status(200).json({
            user,
            token,
            message: 'login success'
        })
       } catch (error) {
            return res.status(400).json(error.message)
       }
    }

}
module.exports = AuthController

function getToken (user) {
        return jwt.sign({
            data: user,
        },process.env.SECRET_JWT_KEY, { expiresIn: '5h'})
}
