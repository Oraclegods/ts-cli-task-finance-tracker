# Overview

**Software Title:** TS Task & Financial CLI Manager (SQL Relational Edition)

**Software Description:**  
This application is a command-line interface utility engineered in TypeScript to manage tasks and track real-time financial cash flows. Built as an upgrade to Module 1, this project transitions data storage from local JSON files to a fully normalized **SQLite relational database** (`app_data.db`) using `better-sqlite3`[cite: 1, 2]. The system executes parameterized SQL CRUD operations, executes relational `INNER JOIN` queries across tables, and outputs aggregated financial reports using SQL `GROUP BY` and `SUM()` functions[cite: 2].

# Development Environment

* **Programming Language:** TypeScript / Node.js (ES Modules)[cite: 1]
* **Database Engine:** SQLite 3[cite: 2]
* **Driver / Library:** `better-sqlite3`[cite: 2]
* **Execution Environment:** `tsx` (TypeScript Execution Engine)
* **Integrated Development Environment:** Visual Studio Code
* **Version Control System:** Git & GitHub[cite: 1]

# DB Design

The relational database schema is configured in `schema.sql` and consists of 4 normalized tables:

1. **`users`**: Stores user profiles with primary keys and unique email constraints[cite: 2].
2. **`categories`**: Classifies transaction types as either 'Income' or 'Expense'[cite: 2].
3. **`items`**: Tracks resource items connected to users and categories via Foreign Keys[cite: 2].
4. **`transactions`**: Logs monetary entries with Foreign Key constraints referencing `users(id)` and `categories(id)`[cite: 2].

### Relational Features
* **Foreign Key Constraints:** Enforces referential integrity with `ON DELETE CASCADE` and `RESTRICT` rules[cite: 2].
* **Parameterized Queries:** Protects all database operations against SQL injection attacks using positional parameters (`?`)[cite: 2].
* **Relational Joins:** Pulls transaction records together with category names using `INNER JOIN` operations[cite: 2].
* **SQL Aggregation:** Computes category totals and record counts using `GROUP BY`, `SUM()`, and `COUNT()`[cite: 2].

# Useful Websites

* [SQLite Official Documentation](https://www.sqlite.org/docs.html)
* [better-sqlite3 API Reference](https://github.com/WiseLibs/better-sqlite3)
* [TypeScript Official Documentation](https://www.typescriptlang.org/docs/)
* [Node.js File System API Guide](https://nodejs.org/api/fs.html)

# Video Demonstration

[Watch the Software Demonstration Video](https://youtu.be/-L5gpFuy7Lk)[cite: 1]

# Future Work

* [ ] Add automated database migration scripts for schema version updates.
* [ ] Build a Web GUI front-end using React or Express.js.
* [ ] Integrate user authentication and encrypted session storage.