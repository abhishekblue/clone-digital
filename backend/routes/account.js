const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware')
const { Account } = require('../db')
const { mongoose } = require("mongoose");


router.get('/balance', authMiddleware, (req, res)=>{
    const account = Account.findOne({userId: req.userId})
    res.status(200).json({
        balance : accountccount.balance
    })
})

router.post('/transfer', authMiddleware, async(req, res)=>{
    const session = await mongoose.startSession()
    session.startTransaction()

    const {to, amount} = req.body
    const account = await Account.findOne({userId: req.userId}).session(session)
    if(!account || account.balance < amount ) {
        await session.abortTransaction()
        return res.status(400).json({
            message: "Insufficient balance"
        })
    }
    const toAccount = await Account.findOne({userId: to}).session(session);
    if(!toAccount){
        await session.abortTransaction()
        return res.status(400).json({
            message: "Invalid account"
        });
    }
    await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }, {session});
    await Account.updateOne({ userId: to }, { $inc: { balance: amount } }, {session});
    await session.commitTransaction();
    session.endSession();
})

module.exports = router;