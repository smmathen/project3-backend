const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// middleware
app.use(cors());
app.use(express.json());

// Routes
// get all menu items
app.get("/menuUser", async (req, res) => {
  try {
    const allMenu = await pool.query(
      "SELECT name, ingredients, price FROM menu"
    );
    res.json(allMenu.rows);
    // console.log("Getting into menu");
    // res.json("howdy");
  } catch (err) {
    console.log(err.message);
  }
});

app.get("/restockReport", async (req, res) => {
  try {
    const resport = await pool.query("SELECT * FROM inventory WHERE quantity < low");
    res.json(allMenu.rows);
  } catch (err) {
    console.log(err.message);
  }
});

app.post("/userAuth", async (req, res) => {
  const { pin } = req.body;
  try {
    const employee = await pool.query(
      "SELECT name, role FROM staff WHERE pin = $1;",
      [pin]
    );
    if (employee.rowCount == 0) {
      const msg = {
        success: false,
        employee_info: [null]
      }
      res.status(500).send(msg);

    } else {
      const msg = {
        success: true,
        employee_info: employee.rows
      }
      res.status(200).send(msg);
    }
  } catch (err) {
    console.log(err.message);
  }
})


app.get("/menuOrder", async (req, res) => {
  try {
    const allMenu = await pool.query(
      "SELECT name, price FROM menu;"
    );
    res.json(allMenu.rows);
  } catch (err) {
    console.log(err.message);
  }
})
//Staff members ROUTES

//create a staff member
//this one might work but probally doesn't
app.post("/manStaff", async (req, res) => {
  try {
    console.log(req.body);
    const { name, role, pin } = req.body;
    const newStaff = await pool.query(
      "INSERT INTO staff(name,role,pin) VALUES ($1,$2,$3) Returning * ;", [name, role, pin]
    );
    console.log(req.body);
    res.json(newStaff.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
})

//delete a staff member
app.delete("/manStaff/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteStaff = await pool.query(
      "DELETE FROM staff where pin = $1;", [id]
    );
    res.json("Staff Member Removed");
  } catch (err) {
    console.log(err.message);
  }
})


//get all Staff
app.get("/manStaff", async (req, res) => {
  try {

    const allStaff = await pool.query(
      "SELECT * FROM staff;"
    );
    console.log(req.body);
    res.json(allStaff.rows);
  } catch (err) {
    console.log(err.message);
  }
})

//get 1 staff
app.get("/manStaff/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.body);
    const allStaff = await pool.query(
      "SELECT * FROM staff where pin  = $1;", [id]
    );
    res.json(allStaff.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
})

//TODO update 1 staff
app.put("/manStaff/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, role, pin } = req.body;
    const updateStaff = await pool.query(
      "UPDATE staff SET name=$1, role = $2 WHERE pin = $3;", [name, role, pin]
    );
    res.json("Staff member was updated");
  } catch (err) {
    console.log(err.message);
  }
})



const port = process.env.SERVER_PORT;
app.listen(port, () => {
  console.log(`Server has started on port ${port}`);
});
