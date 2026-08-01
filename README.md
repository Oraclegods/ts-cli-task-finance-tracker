# TS Task & Financial CLI Manager (SQL Relational Edition)

## Overview

This software is a robust command-line interface utility engineered in TypeScript to track project management milestones and monitor real-time financial cash flows[cite: 1, 4]. Originally built in Module 1, this project was refactored in Module 2 to upgrade the data persistence layer from local JSON files to a fully normalized **SQLite relational database** (`app_data.db`) using `better-sqlite3`[cite: 1, 2, 4].

The application utilizes strict static type boundaries, generic class systems, recursive search utilities, and a parameterized SQL interface to execute full CRUD operations, perform relational `INNER JOIN` queries, and output aggregate summary reports using `GROUP BY` and `SUM()` functions[cite: 1, 2, 4].

## Development Environment

* **Language:** TypeScript / Node.js (ES Modules)[cite: 1]
* **Database Engine:** SQLite 3[cite: 2]
* **Driver / Library:** `better-sqlite3`[cite: 2]
* **Execution Utility:** `tsx` (TypeScript Execution Engine)
* **IDE:** Visual Studio Code
* **Version Control:** Git & GitHub[cite: 1]

## Relational Database Design

The relational database schema is defined in `schema.sql` and consists of 4 normalized tables:

1. **`users`**: Stores user account profiles with primary keys and unique email constraints[cite: 2].
2. **`categories`**: Categorizes financial line items into 'Income' or 'Expense' types[cite: 2].
3. **`items`**: Tracks physical or educational resources linked to users via foreign keys[cite: 2].
4. **`transactions`**: Records income and expense entries with foreign keys referencing `users(id)` and `categories(id)`[cite: 2].

### Key Database Features
* **Referential Integrity:** Enforces foreign key constraints with `ON DELETE CASCADE` and `RESTRICT` actions[cite: 2].
* **Parameterized Queries:** Protects all CRUD operations against SQL injection vulnerabilities using positional placeholders (`?`)[cite: 2, 4].
* **Relational JOINs:** Merges transaction records with category metadata using `INNER JOIN` queries[cite: 2, 4].
* **Aggregations:** Generates financial summary tables using `GROUP BY`, `SUM()`, and `COUNT()`[cite: 2, 4].

## Video Demonstration

[Watch Software Demonstration Video](https://youtu.be/-L5gpFuy7Lk)[cite: 1]

*(Module 1 Video Archive: [Watch Module 1 Video](https://youtu.be/hmcEdsrDtcc))*[cite: 1]

## Instructions to Run the Code

1. **Clone the repository:**
   ```bash
   git clone <https://github.com/Oraclegods/ts-cli-task-finance-tracker>
   cd ts-cli-task-finance-tracker