const express = require("express");
const router = express.Router();

const sql = require("../db");


// CREATE EMPLOYEE
router.post("/", async (req, res) => {

    const { fullname, department, salary } = req.body;

    try {

        await sql.query`
            INSERT INTO employees(fullname, department, salary)
            VALUES(
                ${fullname},
                ${department},
                ${salary}
            )
        `;

        res.json({
            message: "Employee Added"
        });

    } catch(err){

        console.log(err);

        res.status(500).json({
            message: "Server Error"
        });

    }

});


// GET ALL EMPLOYEES
router.get("/", async (req, res) => {

    try {

        const result = await sql.query`
            SELECT * FROM employees
            ORDER BY id DESC
        `;

        res.json(result.recordset);

    } catch(err){

        console.log(err);

        res.status(500).json({
            message: "Server Error"
        });

    }

});


// UPDATE EMPLOYEE
router.put("/:id", async (req, res) => {

    const { id } = req.params;

    const { fullname, department, salary } = req.body;

    try {

        await sql.query`
            UPDATE employees
            SET
                fullname=${fullname},
                department=${department},
                salary=${salary}
            WHERE id=${id}
        `;

        res.json({
            message: "Employee Updated"
        });

    } catch(err){

        console.log(err);

        res.status(500).json({
            message: "Server Error"
        });

    }

});


// DELETE EMPLOYEE
router.delete("/:id", async (req, res) => {

    const { id } = req.params;

    try {

        await sql.query`
            DELETE FROM employees
            WHERE id=${id}
        `;

        res.json({
            message: "Employee Deleted"
        });

    } catch(err){

        console.log(err);

        res.status(500).json({
            message: "Server Error"
        });

    }

});

module.exports = router;