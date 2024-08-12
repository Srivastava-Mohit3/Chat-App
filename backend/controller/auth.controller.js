import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { errHandler } from '../utils/error.js'

export const signup = async(req, res, next) => {
    const {username, email, password, confirmPassword, gender} = req.body

    let validUser

    validUser = await User.findOne({email})

    if(validUser) {
        return next(errHandler(400, "User already exists"))
    }

    if(password !== confirmPassword) {
        return next(errHandler(400, "Password don't match"))
    }

    const hashshedPassword = bcryptjs.hashSync(password, 7)

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

    const newUSer = new User({
        username,
        email,
        password: hashshedPassword,
        gender,
        profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    })

    try {
        // generate jwt token
        const token = jwt.sign({id: newUSer._id}, process.env.JWT_SECRET)

        await newUSer.save()

        res.cookie("access_token", token, {httpOnly: true}).status(201).json({
            _id: newUSer._id,
            username: newUSer.username,
            email: newUSer.email,
            profilePic: newUSer.profilePic,
        })
    } catch (error) {
        next(error)
    }
}

export const login = async(req, res, next) => {
    try {
        const {email, password} = req.body

        const validUser = await User.findOne({email})

        if(!validUser) {
            return next(errHandler(404, "User not found"))
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password)

        if(!validPassword) {
            return next(errHandler(401, "Wrong Password"))
        }

        const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET)

        res.cookie("access_token", token, {httpOnly: true}).status(200).json({
            _id: validUser._id,
            username: validUser.username,
            email: validUser.email,
            profilePic: validUser.profilePic,
        })
    } catch (error) {
        next(error)
    }
}

export const logout = (req, res, next) => {
    try {
        res.clearCookie("access_token")

        res.status(200).json({
            message: "User successfully logout",
        })
    } catch (error) {
        next(error)
    }
}

