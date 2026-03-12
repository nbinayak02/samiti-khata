# 📘 Samiti Khata

> A transaction-safe digital ledger system for Nepalese community organizations.

Samiti Khata is a **System of Record** designed to digitize traditional *Khata* (ledger) bookkeeping used by community committees while preserving transparency, auditability, and financial integrity.

Instead of being a simple CRUD application, the system focuses on **trust, accountability, and traceable financial history**.

---

## 🚀 Features

### 🏛️ Committee Management

* Multiple independent committees
* Users can belong to multiple committees
* Role-based access control (RBAC)

### 💰 Financial Management

#### Income Tracking

* Bill & book number tracking
* Payer details
* Receipt-based recording

#### Expense Tracking

* Cash / Cheque / QR payments
* Bill/Voucher documentation
* Structured expense records

---

### 🔒 Data Integrity

* ❌ No hard deletion
* ✅ Void mechanism for corrections
* Complete audit trail

---

### 📊 Reporting

* Filter records by date & committee
* Export data to Excel
* Searchable digital ledger

---

### 🧾 Activity Logging (Audit System)

Every financial action is logged:

* CREATE
* UPDATE
* VOID

Logs are stored **within the same database transaction** as financial operations to guarantee consistency.

---

## 🧱 Tech Stack (PERN)

| Layer    | Technology                    |
| -------- | ----------------------------- |
| Frontend | React                         |
| Backend  | Node.js + Express             |
| Database | PostgreSQL                    |
| Auth     | JWT (Access + Refresh Tokens) |

---

## 🏗️ Architecture Overview

```
Client (React)
      ↓
Express API (RBAC + Validation)
      ↓
PostgreSQL (ACID Transactions)
      ├── Income
      ├── Expense
      └── Activity Logs
```

### Key Architectural Decisions

* PostgreSQL as single source of truth
* ACID transactions for financial safety
* Idempotent operations to prevent duplicates
* Audit-first system design

---

## 🗄️ Database Design

### Core Entities

* Users
* Organization
* Committees
* Income
* Expense
* ActivityLogs

---

## 🔐 Authentication & Authorization

### Authentication

* JWT Access Token (short-lived)
* Refresh Token (session renewal)

### Authorization (RBAC)

| Role    | Access              |
| ------- | ------------------- |
| Admin   | Global              |
| Officer | Assigned committees |

---

## ⚙️ Reliability Features

* ✅ ACID database transactions
* ✅ Idempotency protection
* ✅ Immutable financial history
* ✅ Audit logging

---

## 🎯 Design Philosophy

Samiti Khata follows:

* **Auditability First**
* **Immutable Financial Records**
* **Security by Design**
* **Domain-driven modeling**
* **Reliability over convenience**

---

## 📈 Future Improvements

* Audit history timeline UI
* PDF receipt generation
* Financial analytics dashboard
* Notification system
* Mobile optimization

---

## 🧠 Why This Project?

Many community organizations still rely on handwritten ledgers.
Samiti Khata bridges traditional accounting practices with modern software engineering while maintaining trust and transparency.

---

## 🛠️ Setup (Example)

```bash
# clone repository
git clone https://github.com/nbinayak02/samiti-khata.git

# install dependencies
npm install

# run development server
npm run dev
```

---

## 📄 License

MIT License

---

## 👨‍💻 Author

**Binayak Niraula**

Full Stack Developer (MERN/PERN)

---

⭐ If you like this project, consider starring the repository!
