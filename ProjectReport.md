# 📘 Samiti Khata — Final Project Report

---

# 1. Introduction

**Samiti Khata** is a digital financial record management system designed for **Nepalese community organizations (Samitis)**. These organizations traditionally maintain handwritten ledgers (“Khata”), which are difficult to manage, audit, and preserve.

The project digitizes this process while preserving the core principles of traditional bookkeeping:

* transparency
* accountability
* traceability
* permanence of financial records

Samiti Khata functions as a **System of Record**, meaning the platform becomes the authoritative source of financial truth for an organization.

---

# 2. Problem Statement

Traditional ledger systems suffer from:

* Manual calculation errors
* Data loss or physical damage
* Lack of audit trail
* Difficult reporting and filtering
* Unauthorized modifications
* Poor collaboration between officers

Community organizations require a secure yet simple system that mirrors familiar workflows while ensuring data integrity.

---

# 3. Project Objectives

## Primary Objectives

* Digitize income and expense bookkeeping.
* Maintain immutable financial history.
* Enable multi-user collaboration securely.
* Provide searchable and exportable financial data.

## Secondary Objectives

* Prevent accidental data deletion.
* Ensure reliable operations during unstable networks.
* Build scalable backend architecture using modern technologies.

---

# 4. System Overview

Samiti Khata is a **multi-committee financial management platform**.

### Core Concepts

* Multiple independent committees exist.
* Users may belong to multiple committees.
* Each committee maintains its own financial records.
* Access is controlled using role-based permissions.

---

# 5. Functional Requirements

## 5.1 Organizational Structure

* Flat hierarchy model.
* Committees operate independently.
* Many-to-many relationship between Users and Committees.

---

## 5.2 Financial Modules

### Income Management

Tracks money received.

**Stored Information**

* Bill Number
* Book Number
* Date
* Payer Details
* Amount
* Remarks

---

### Expense Management

Tracks money spent.

**Stored Information**

* Payment Mode (Cash / Cheque / QR)
* Particulars
* Document Type (Bill/Voucher)
* Amount
* Date

Income and Expense are stored in **separate tables** due to different domain rules and validations.

---

## 5.3 Data Integrity — Void Mechanism

Financial records are **never deleted**.

Instead:

* Records can be marked as **VOID**.
* Original data remains preserved.
* Audit trail remains intact.

This mirrors real-world accounting corrections.

---

## 5.4 Reporting

Users can:

* Filter records by committee and date.
* Export financial data to Excel format.
* Generate structured financial reports.

---

# 6. Technical Architecture

The system uses the **PERN Stack**.

| Layer          | Technology        |
| -------------- | ----------------- |
| Frontend       | React             |
| Backend        | Node.js + Express |
| Database       | PostgreSQL        |
| Authentication | JWT               |

---

# 7. Database Design

## Core Entities

* Users
* Committees
* UserCommittee (join table)
* Income
* Expense
* ActivityLogs

---

## Relationship Model

```
User ⇄ UserCommittee ⇄ Committee
```

Allows flexible officer assignments across committees.

---

# 8. Authentication & Authorization

## Authentication

JWT Dual Token Strategy:

* **Access Token** — short-lived API authorization.
* **Refresh Token** — secure session renewal.

---

## Authorization (RBAC)

| Role    | Access                   |
| ------- | ------------------------ |
| Admin   | Global access            |
| Officer | Assigned committees only |

Authorization enforced at API layer.

---

# 9. Reliability & Data Consistency

## ACID Transactions

All financial operations use PostgreSQL transactions ensuring:

* Atomicity
* Consistency
* Isolation
* Durability

---

## Idempotency

Prevents duplicate entries caused by:

* network retries
* slow connections
* repeated requests

Each operation is safely repeatable.

---

# 10. Activity Logging System (Audit Trail)

To ensure full accountability, Samiti Khata implements an **Activity Log System**.

### Design Principle

Every financial record lifecycle must be reconstructable.

---

## Activity Log Schema

```
activity_logs
--------------
id
user_id
committee_id
entity_type      (income | expense)
entity_id
action           (CREATE | UPDATE | VOID)
description
metadata (JSONB)
created_at
```

---

## Logging Strategy

| Action | Audit Level       |
| ------ | ----------------- |
| CREATE | Minimal log       |
| UPDATE | Detailed changes  |
| VOID   | Detailed + reason |

---

## Transaction Integration

Activity logs are stored **inside the same database transaction** as financial operations:

```
BEGIN;
Insert/Update Expense
Insert Activity Log
COMMIT;
```

This guarantees perfect consistency between records and audit history.

---

## Why PostgreSQL (Not MongoDB)

* ACID guarantees required for financial audit.
* Same-transaction logging.
* JSONB provides flexible metadata storage.
* Single source of truth.

---

# 11. System Design Principles

### 1. Auditability First

All changes must be traceable.

### 2. Immutable Financial History

Records are never permanently deleted.

### 3. Domain-Driven Design

System mirrors real accounting workflows.

### 4. Security by Design

RBAC and JWT integrated from architecture level.

### 5. Reliability Over Convenience

Consistency prioritized over speed.

---

# 12. Performance & Scalability Strategy

* Indexed activity logs.
* Append-only audit table.
* PostgreSQL JSONB metadata.
* Future partitioning support for large datasets.
* Archive strategy for historical logs.

---

# 13. User Experience Features

* Committee-scoped dashboards.
* Filterable financial records.
* Excel export capability.
* Record history timeline (audit view).

---

# 14. Expected Benefits

## Organizations

* Transparent bookkeeping.
* Reduced fraud risk.
* Easy auditing.
* Centralized records.

## Officers

* Secure collaboration.
* Faster reporting.
* Reliable data access.

---

# 15. Future Enhancements

* PDF receipt generation.
* Financial analytics dashboard.
* Audit timeline visualization.
* Notification system.
* Backup & restore module.
* Mobile-first interface.

---

# 16. Conclusion

Samiti Khata transforms traditional ledger bookkeeping into a secure digital platform while preserving accounting discipline. By combining strict audit mechanisms, role-based access control, and transactional consistency, the system ensures financial data remains accurate, traceable, and trustworthy.

The project goes beyond a CRUD application and establishes a **trust-centric financial infrastructure** tailored for Nepalese community organizations.

---

✅ **Final Architecture Identity**

Samiti Khata is:

> A transaction-safe, audit-driven, multi-committee financial system built using modern web technologies.

---
*Binayak Niraula*

*March 12, 2026*