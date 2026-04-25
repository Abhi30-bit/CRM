const express = require('express')
const visitorModal = require('../Modals/visitorModal')
const visitorRoute = express.Router()

visitorRoute.get('/', async (req, res) => {
    try {
        const visitor = await visitorModal.find();
        return res.json({ "msg": "success", "visitor": visitor })
    } catch (err) {
        return res.status(500).json({ "msg": "error" })
    }
});

visitorRoute.post('/', async (req, res) => {
    try {
        await visitorModal.create(req.body);
        return res.json({ "msg": "success" })
    } catch (err) {
        return res.status(500).json({ "msg": "error" })
    }
});

visitorRoute.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const visitor = await visitorModal.findById(id);
        return res.json({ "msg": "success", "visitor": visitor })
    } catch (err) {
        return res.status(500).json({ "msg": "error" })
    }
});

visitorRoute.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await visitorModal.findByIdAndUpdate(id, req.body);
        return res.json({ "msg": "success" });
    } catch (err) {
        return res.status(500).json({ "msg": "error" })
    }
});

visitorRoute.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await visitorModal.findByIdAndDelete(id);
        return res.json({ "msg": "success" });
    } catch (err) {
        return res.status(500).json({ "msg": "error" })
    }
});

module.exports = visitorRoute;