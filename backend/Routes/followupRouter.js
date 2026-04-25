const express = require('express');
const followupModel = require('../Modals/followupModal');
const followupRoute = express.Router();

followupRoute.get('/', async (req, res) => {
    try {
        const followup = await followupModel.find().populate("enqid").populate("uid");
        return res.json({ "msg": "sucess", followup })
    } catch (err) {
        return res.status(500).json({ "msg": "error" })
    }
});

followupRoute.post('/', async (req, res) => {
    try {
        await followupModel.create(req.body);
        return res.json({ "msg": "sucess" });
    } catch (err) {
        return res.status(500).json({ "msg": "error" })
    }
})

module.exports=followupRoute