const express = require("express")
const cookieParser = require("cookie-parser")

// Require Routes

const authRouter = require("./routes/authRoutes")
const accountRouter = require("./routes/accountRoutes")
const transactionRoutes = require("./routes/transactionRoutes")

const app = express()

app.use(express.json())
app.use(cookieParser())

// Use Routes

app.use("/api/auth", authRouter)
app.use("/api/accounts", accountRouter)
app.use("/api/transactions", transactionRoutes)

module.exports = app

