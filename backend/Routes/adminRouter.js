const express = require('express');
const adminModal = require('../Modals/adminModal');
const userModal = require("../Modals/userModal");
const stEnqModal = require("../Modals/stEnqModal");
const centerModal = require("../Modals/centerModal");
const followupModal = require('../Modals/followupModal')
const assignModal = require('../Modals/assignModal');
const  adminRoute= express.Router();

adminRoute.post('/log', async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await adminModal.findOne({ email })
        if (admin) {
            if (admin.password == password) {
                res.json({ msg: "success", role: "admin", id: admin._id, name: admin.name });
            }
            else {
                res.json({ msg: "Password Not Match" })
            }
        }
        else {
            const user = await userModal.findOne({ email });
            if (user) {
                if (user.password == password) {
                    if (user.status != "u") {
                        res.json({ msg: "Your Account is Blocked" })
                    }
                    res.json({ msg: "success", role: user.role, id: user._id });
                }
                else {
                    res.json({ msg: "Password Not Match" })
                }
            }
            else {
                res.json({ "msg": "User Not found" });
            }
        }
    } catch (err) {
        return res.status(500).json({ "msg": "error" })
    }
})

adminRoute.get('/stats', async (req, res) => {
    try {
        const enq = await stEnqModal.find();
        const user = await userModal.find();
        const center = await centerModal.find();
        const followup = await followupModal.find();
        const assign = await assignModal.find();
        const params = req.params;

        res.json({ "msg": "success", "allenq": enq, "user": user.length, "center": center, "followup": followup.length, "assign": assign.length, "params": params })
    } catch (err) {
        return res.status(500).json({ "msg": "error" })
    }
})

module.exports=adminRoute