const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");

const accountController = require("../controllers/accountController");

const router = express.Router();

/*
  - POST /api/accounts/
  - Create a new account
  - Protected route
*/
router.post(
  "/",
  authMiddleware.authMiddleware,
  accountController.createAccountController,
);

/*
  - GET /api/accounts/
  - Get all accounts of the logged in users
  - Protected route
*/
router.get(
  "/",
  authMiddleware.authMiddleware,
  accountController.getUserAccountsController,
);

/*
  - GET /api/accounts/balance/:accountId
*/
router.get(
  "/balance/:accountId",
  authMiddleware.authMiddleware,
  accountController.getAccountBalanceController,
);

module.exports = router;
