const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const sql = require("../db");

router.post("/login", async (req, res) => {

    const { username, password } = req.body;

    try {

        // CHECK USERNAME
        const result = await sql.query`
            SELECT * FROM users
            WHERE username=${username}
        `;

        // IF USER NOT FOUND
        if(result.recordset.length === 0){

            return res.status(401).json({
                message: "Invalid Username"
            });

        }

        // GET USER
        const user = result.recordset[0];

        // CHECK PASSWORD
        const validPassword = await bcrypt.compare(
            password,
            user.password
        );

        // IF PASSWORD WRONG
        if(!validPassword){

            return res.status(401).json({
                message: "Invalid Password"
            });

        }

        // CREATE JWT TOKEN
        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        // SEND TOKEN
        res.json({
            token
        });

    } catch(err){

        console.log(err);

        res.status(500).json({
            message: "Server Error"
        });

    }

});

module.exports = router;