const express = require('express')
const userModal = require('../Modals/userModal');
const stEnqModal = require('../Modals/stEnqModal');
const userRouter= express.Router();
const upload = require('../Middleware/upload');

userRouter.get('/', async (req, res) => {
    try {
        const adduser = await userModal.find();
        return res.json({ "msg": "success", "adduser": adduser })
    } catch (err) {
        return res.status(500).json({ "msg": "error" })
    }
})

userRouter.post('/', async (req, res) => {
    try {
        const adduser = await userModal.create(req.body);
        return res.json({ 'msg': "success" });
    } catch (err) {
        return res.status(500).json({ "msg": "error" })
    }
});

userRouter.patch('/:id', upload.single("profilePic"), async (req, res) => {
    try {
        const id = req.params.id;
        await userModal.findByIdAndUpdate(id, { 'profilePic': req.file.filename })
        return res.json({ 'msg': "success" });
    } catch (err) {
        return res.status(500).json({ "msg": "error" })
    }
});

userRouter.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const adduser = await userModal.findById(id);
        return res.json({ "msg": "success", "adduser": adduser })
    } catch (err) {
        return res.status(500).json({ "msg": "error" })
    }
});

userRouter.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await userModal.findByIdAndUpdate(id, req.body)
        return res.json({ "msg": "success" })
    } catch (err) {
        return res.status(500).json({ "msg": "error" })
    }
});

userRouter.put('/:id/:st', async (req, res) => {
    try {
        const { id, st } = req.params;
        const status = st == "u" ? "b" : "u"
        const user = await userModal.findByIdAndUpdate(id, { status })
        if (st == "u") {
            await stEnqModal.updateMany({ assignto: user._id }, { $set: { assignto: null } });
        }
        return res.json({ "msg": "success" })
    } catch (err) {
        return res.status(500).json({ "msg": "error" })
    }
})

userRouter.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await userModal.findByIdAndDelete(id)
        return res.json({ "msg": "success" })
    } catch (err) {
        return res.status(500).json({ "msg": "error" })
    }
})

module.exports= userRouter;