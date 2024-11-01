require("dotenv").config()
const express = require("express")
const cors = require("cors")
const path = require('path')

const app = express()
const PORT = process.env.PORT || 3000

require("./db/db")

// MIDDLEWARES
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ limit: 10 * 1024 * 1024, extended: true }))
app.use('/static', express.static(path.join(__dirname, '../public')))

// ROUTES MIDDLEWARES
app.use("/", require("./routes/router"))

// LISTNING ON PORT
app.listen(PORT, () => console.log("SERVER STARTTED ON PORT " + PORT))