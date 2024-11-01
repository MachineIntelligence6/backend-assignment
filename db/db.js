const mongoose = require("mongoose")

mongoose.connect(process.env.MONGODB_URI, {})
.then((res) => {
    console.log("DATABASE CONNECTION SUCCESSFULL.")
})
.catch((err) => {
    console.log("DATABASE CONNECTION FAILED: " + err.message)
})