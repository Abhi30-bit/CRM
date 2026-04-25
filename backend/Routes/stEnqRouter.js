const express = require('express');
const StEnqModal = require('../Modals/stEnqModal');
const stEnqRouter=  express.Router();

stEnqRouter.get('/', async (req, res) => {
    try {
        const user = await StEnqModal.find().populate('assignto')
        return res.json({ "msg": "sucess", 'enq': user });
    } catch (err) {
        return res.status(500).json({ "msg": "error" })
    }
})

stEnqRouter.post('/', async (req, res) => {
    try {
        const user = req.body;
        await StEnqModal.create(user)
        return res.json({ 'msg': 'succes' })
    } catch (err) {
        return res.status(500).json({ "msg": "error" })
    }
})

stEnqRouter.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const user = await StEnqModal.findById(id);
        res.json({ "msg": "success", "user": user });
    } catch (err) {
        return res.status(500).json({ "msg": "error" })
    }
})

stEnqRouter.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await StEnqModal.findByIdAndUpdate(id, req.body);
        res.json({ "msg": "Update" });
    } catch (err) {
        return res.status(500).json({ "msg": "error" })
    }
})

stEnqRouter.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await StEnqModal.findByIdAndDelete(id);
        res.json({ "msg": "Delete" });
    } catch (err) {
        return res.status(500).json({ "msg": "error" })
    }
})

module.exports= stEnqRouter;