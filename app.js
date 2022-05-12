const express = require("express");
//const fs = require("fs");

//const db = require("./dataLink");

const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'me',
    host: 'localhost',
    database: 'students',
    password: 'password',
    port: 5432,
});

const app = express();

app.use(express.static(__dirname + "/public"));
app.get("/students", async function (req, res) {
    const Students = await pool.query("SELECT * FROM students;")
    res.json(Students.rows);
});
// получение одного пользователя по id
app.get("/students/:id", async function (req, res) {

    const id = Number(req.params.id);
    const newStudent = await pool.query(`SELECT * FROM students WHERE id = ${id};`);
    res.json(newStudent.rows);
});

// удаление пользователя по id
app.delete("/students/:id", async function (req, res) {
    const id = Number(req.params.id);
    const newStudent = await pool.query(`DELETE FROM students WHERE id = ${id}`);
    res.json((await db.query(`SELECT * FROM students;`)).rows);
});


// получение отправленных данных
app.post("/students", async function (req, res) {
    ({ id, first_name, last_name, group_name } = req.body);
    const newStudent = await pool.query(
        "INSERT INTO students (id, first_name, last_name, group_name) values ($1, $2, $3, $4) returning *",
        [id, first_name, last_name, group_name]
    );
    res.json((await db.query(`SELECT * FROM students;`)).rows);
});


// изменение пользователя
app.put("/students/:id", async function (req, res) {
    const id = Number(req.params.id);
    let { firstName, lastName, group } = req.body;
    const newStudent = await pool.query(
        `UPDATE students SET first_name = $2, last_name = $3, group_name = $4 where id = $1`,
        [id, firstName, lastName, group]
    );
    res.json((await db.query(`SELECT * FROM students;`)).rows);
});



app.listen(3000, function () {
    console.log("Сервер ожидает подключения...");
});