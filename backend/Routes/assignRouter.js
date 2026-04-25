const express = require('express');
const assignModal = require('../Modals/assignModal');
const assignRouter = express.Router();

assignRouter.post('/', async (req, res) => {
    try {
        await assignModal.create(req.body);
        return res.json({ "msg": "Success" });
    } catch (err) {
        return res.status(500).json({ "msg": "error" })
    }
})

assignRouter.get('/', async (req, res) => {
    try {
        const assign = await assignModal.find();
        return res.json({ "msg": "Success", assign });
    } catch (err) {
        return res.status(500).json({ "msg": "error" })
    }
})

module.exports = assignRouter;