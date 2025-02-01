// backend/api/index.js
const express = require('express');
const z = require('zod')
const { User, Account } = require("../db");
const {authMiddleware} = require("../middleware")
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config");
const router = express.Router();

module.exports = router;

const signupBody = z.object({
    username : z.string().email(),
    firstName : z.string(),
    lastName : z.string(),
    password : z.string()
})
router.post('/signup', async(req, res) => {
    const { success } = signupBody.safeParse(req.body)
    if(!success) {
        return res.status(411).json({msg : 'Invalid input'})
    }
    const username = req.body.username
    const existingUser = await User.findOne({username : username})
    if(existingUser) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }
    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })
    const userId = user._id;
    await Account.create({
        userId,
        balance: (1+Math.random())*10000
    })

    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    res.json({
        message: "User created successfully",
        token: token
    })
})


const signinBody = z.object({
    username: z.string().email(),
	password: z.string()
})
router.post('/signin', async(req, res)=> {
    const { success } = signinBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }
    const username = req.body.username
    const password = req.body.password
    const findUser = await User.findOne({username, password})

    if(!findUser) {
        return res.status(411).json({message: "Error while logging in"});
    }
    const decoded = jwt.sign({userId: findUser._id}, JWT_SECRET, { expiresIn: "1h" })
    return res.status(200).json({ token: decoded })
})


const updateBody = z.object({
    password: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
});
router.put('/', authMiddleware, async(req, res) => {
    const { success } = updateBody.safeParse(req.body)
    if(!success) {
        return res.status(411).json({
            message: "Error while updating information"
        })
    }
    await User.updateOne({_id: req.userId}, req.body)
    return res.status(200).json({ message: "Updated successfully" });

})

router.get('/bulk', authMiddleware, async(req, res)=>{
    const friend = req.query.filter
    const users = await User.find({
        $or: [
            { firstName: { "$regex": friend, "$options": "i" } },
            { lastName: { "$regex": friend, "$options": "i" } }
        ]
    });
        res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

router.get('/all', authMiddleware, async(req, res)=>{
    const users = await User.find({})
    res.json(users)
})