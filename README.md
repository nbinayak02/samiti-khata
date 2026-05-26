# Samiti Khata

![samiti-khata](https://socialify.git.ci/nbinayak02/samiti-khata/image?custom_language=Express&language=1&logo=https%3A%2F%2Fcdn-icons-png.flaticon.com%2F128%2F3459%2F3459528.png&theme=Dark)

A transaction-safe digital ledger system for Nepalese community organizations.

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

### 🔒 Data Integrity

* ❌ No hard deletion
* ✅ Void mechanism for corrections
* Complete audit trail

### 📊 Reporting

* Filter records
* Export data to Excel
* Searchable digital ledger


### 🧾 Activity Logging (Audit System)

Every financial action is logged.

---

## 🧱 Tech Stack (PERN)

| Layer    | Technology                    |
| -------- | ----------------------------- |
| Frontend | React                         |
| Backend  | Node.js + Express             |
| Database | PostgreSQL                    |
| Auth     | JWT (Access + Refresh Tokens) |

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
