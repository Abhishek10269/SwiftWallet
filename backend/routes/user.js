const express = require('express');
const router = express.Router();

const jwt = require("jsonwebtoken");
const zod = require("zod");
const { JWT_SECRET } = require("../config");
const { User, Account } = require("../db");
const { authMiddleware } = require('../middleware');


const signupBody = zod.object({
    username: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string()
});


router.post('/signup', async (req, res) => {
    const { success } = signupBody.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "Incorrect input baby"
        })
    }

    const existingUser = await User.findOne({
        username: req.body.username
    })

    if (existingUser) {
        return res.status(411).json({
            message: "user with this username already exist"
        })
    }

    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    });

    const userId = user._id;

    await Account.create({
        userId,
        balance: 1+Math.random()*10000
    })

    const token = jwt.sign({ userId }, JWT_SECRET);

    res.json({
        message: "user created succesfully",
        token:`Bearer ${token}`
    });


});

const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string()
});

router.post('/signin', async (req, res) => {
    const { success } = signinBody.safeParse(req.body);
    if (!success) {
        res.status(411).json({ message: 'Invalid Inputs' })
    }
    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    })

    if (user) {
        const token = jwt.sign({ userId: user._id }, JWT_SECRET);
        res.json({
            token: token
        })
        return;
    }

    res.status(411).json({
        message: 'Error while logging in'
    })


});

const updateBody = zod.object({
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
    password: zod.string().optional()

});

router.put('/', authMiddleware, async (req, res) => {
    const { success } = updateBody.safeParse(req.body);
    if (!success) {
        res.status(411).json({
            message: "error while updating information"
        })
    }

    await User.update({ _id: req.userId }, req.body);
    res.json({
        message: "Updated successfully"
    })
});

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";
    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })
    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
});



module.exports = router;