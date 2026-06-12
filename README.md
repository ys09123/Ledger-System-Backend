# 🏦 Backend Ledger — Bank Transaction System

A production-style banking backend built with **Node.js**, **Express**, and **MongoDB**. Covers the full lifecycle of a real-world banking system — OAuth authentication, account management, credit/debit transactions, ledger-based balance tracking, and email notifications.

---

## 🚀 Features

- **User Authentication** — Register and login with OAuth & JWT-based sessions
- **Password Security** — Bcrypt hashing
- **Email Notifications** — Nodemailer integration for registration and transaction emails
- **Account Management** — Create and manage bank accounts tied to authenticated users
- **Credit & Debit Transactions** — Full transaction flow from pending state to completion
- **Ledger System** — Double-entry style ledger for consistent balance tracking
- **Account Status Check** — Guards transactions against inactive or frozen accounts
- **Logout** — Token blacklisting on logout for secure session termination

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express v5 |
| Database | MongoDB (via Mongoose) |
| Authentication | OAuth + JWT + Cookie Parser |
| Password Hashing | bcryptjs |
| Email | Nodemailer |

---

## 📁 Project Structure

```
backend-ledger/
├── src/
│   ├── models/
│   │   ├── userModel.js         # User schema with bcrypt + email validation
│   │   ├── accountModel.js      # Bank account schema
│   │   ├── transactionModel.js  # Transaction schema (pending → complete)
│   │   ├── ledgerModel.js       # Ledger entry schema (credit/debit records)
│   │   └── blacklistModel.js    # Blacklisted JWT tokens
│   ├── controllers/
│   │   ├── authController.js    # Register, Login
│   │   ├── accountController.js # Create account, fetch details
│   │   └── transactionController.js  # Transaction flow, balance fetch
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── accountRoutes.js
│   │   └── transactionRoutes.js
│   ├── middlewares/
│   │   └── authMiddleware.js    # JWT verification middleware
│   ├── config/
│   │   └── db.js                 # MongoDB Atlas connection
│   └── services/
│       └── emailService.js             # Nodemailer email helper
├── server.js                     # Entry point
├── package.json
└── .env
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js v18+
- MongoDB Atlas account (or local MongoDB)
- Gmail account (or SMTP provider) for Nodemailer

### Installation

```bash
git clone https://github.com/ankurdotio/backend-ledger.git
cd backend-ledger
npm install
```

### Environment Variables

Create a `.env` file in the root:

```env
PORT=3000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
CLIENT_ID=your_google_clientid
CLIENT_SECRET=your_google_clientid
REFRESH_TOKEN=refresh_token_for_oauth
EMAIL_USER=your_email@gmail.com
```

### Run the Server

```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

---

## 📡 API Endpoints

### Auth

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and receive JWT cookie |
| POST | `/api/auth/logout` | Blacklist token and clear cookie |

### Account

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/accounts/` | Create a bank account | ✅ |
| GET | `/api/account/balance/:id` | Get account info | ✅ |

### Transactions

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/transactions/` | Initiate a credit/debit transaction | ✅ |

---

## 🔄 How the Transaction Flow Works

```
Client Request
     │
     ▼
Idempotency Check  ──── Duplicate? ──► Return response
     │
     ▼
Account Status Check ── Inactive? ──► Reject transaction
     │
     ▼
Derive Balance from Ledger
     │
     ▼
Create Transaction (Pending state)
     │
     ▼
Create Ledger Entry (Credit / Debit)
     │
     ▼
Update Transaction → Completed
     │
     ▼
Send Email Notification
```

---

## 🧠 Key Concepts Covered

**Ledger-based balance** — Balance is never stored directly. It is always computed by aggregating all ledger entries for an account using a MongoDB `$group` pipeline. This ensures consistency and a full audit trail.

**Idempotency** — Each transaction request carries a unique idempotency key. If the same key is seen again, the original response is returned without re-processing, preventing duplicate charges.

**JWT Blacklisting** — On logout, the token is stored in a `Blacklist` collection. The auth middleware checks this collection on every request, effectively invalidating the token before its natural expiry.

**Pending transactions** — Transactions are created in a `pending` state first, only marked `completed` after the ledger entry is successfully written. This prevents data inconsistency if something fails mid-flow.

---

## 📦 Dependencies

```json
{
  "bcryptjs": "^3.0.3",
  "cookie-parser": "^1.4.7",
  "dotenv": "^17.2.3",
  "express": "^5.2.1",
  "jsonwebtoken": "^9.0.3",
  "mongoose": "^9.1.5",
  "nodemailer": "^7.0.12"
}
```

---

## 📺 Reference

This project was built following the tutorial:
**Advanced Backend Project | Bank Transaction System with Node.js, Express & MongoDB**
by Sheryians Coding School — [Watch on YouTube](https://www.youtube.com/watch?v=NQOAQP0mow0)

---

## 📄 License

MIT
