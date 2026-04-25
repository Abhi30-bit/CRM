const express = require('express')
const centerModal = require('../Modals/centerModal');
const userModal = require('../Modals/userModal');
const stEnqModal = require('../Modals/stEnqModal');
const centerRoute = express.Router()

centerRoute.get('/', async (req, res) => {
    try {
        const center = await centerModal.find();
        return res.json({ "msg": "success", "center": center })
    } catch (err) {
        return res.status(500).json({ "msg": "error" })
    }
});

centerRoute.post('/', async (req, res) => {
    try {
        await centerModal.create(req.body);
        return res.json({ "msg": "success" })
    } catch (err) {
        return res.status(500).json({ "msg": "error" })
    }
});

centerRoute.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const center = await centerModal.findById(id);
        return res.json({ "msg": "success", "center": center })
    } catch (err) {
        return res.status(500).json({ "msg": "error" })
    }
});

centerRoute.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const center = await centerModal.findByIdAndUpdate(id, req.body);
        return res.json({ "msg": "success" });
    } catch (err) {
        return res.status(500).json({ "msg": "error" })
    }
});

centerRoute.put('/:id/:st', async (req, res) => {
    try {
        const { id, st } = req.params;
        let status = st == "Active" ? "Deactive" : "Active";
        let ust = st == "Active" ? "b" : "u";
        let est = st == "Active" ? "b" : "u";
        const center = await centerModal.findByIdAndUpdate(id, { status });
        await userModal.updateMany({ center: center.name }, { $set: { status: ust } })
        await stEnqModal.updateMany({ center: center.name }, { $set: { status: est } })
        return res.json({ "msg": "success" });
    } catch (err) {
        return res.status(500).json({ "msg": "error" })
    }
})

centerRoute.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await centerModal.findByIdAndDelete(id);
        return res.json({ "msg": "success" });
    } catch (err) {
        return res.status(500).json({ "msg": "error" })
    }
});

module.exports= centerRoute;