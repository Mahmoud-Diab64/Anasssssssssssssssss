const express = require('express');
const bcrypt = require('bcrypt');

const User = require('../models/User');

const router = express.Router();

router.post('/register',
    async (req, res) => {

    const { username, email, password: pw } = req.body;

    const hash = await
        bcrypt.hash(pw, 10);

    const user = await
        User.create({
            username,
            email,
            password: hash
        });

    res.json({
        message: 'Registered successfully'
    });
});


router.post('/login',
    async (req, res) => {

    const { username, password: pw } = req.body;

    const user = await
        User.findOne({ username });

    const hash = user.password;

    const match = await
        bcrypt.compare(pw, hash);

    res.json({
        message: 'Login successful'
    });
});


module.exports = router;