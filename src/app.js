const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieParser());

// Require Routes

const authRouter = require("./routes/authRoutes");
const accountRouter = require("./routes/accountRoutes");
const transactionRoutes = require("./routes/transactionRoutes");

// Use Routes

app.get("/", (req, res) => {
  res.send("Ledger service is up and running.");
});

app.use("/api/auth", authRouter);
app.use("/api/accounts", accountRouter);
app.use("/api/transactions", transactionRoutes);

module.exports = app;
