import Database from 'better-sqlite3';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Interface representing a system user record.
 */
export interface User {
    id?: number;
    name: string;
    email: string;
    created_at?: string;
}

/**
 * Interface representing a transaction category.
 */
export interface Category {
    id?: number;
    name: string;
    type: 'Income' | 'Expense';
}

/**
 * Interface representing a financial transaction entity.
 */
export interface Transaction {
    id?: number;
    user_id: number;
    category_id: number;
    amount: number;
    description: string;
    transaction_date?: string;
    category_name?: string;
}

/**
 * Interface representing category summary aggregate results.
 */
export interface SpendingSummary {
    category_name: string;
    type: string;
    total_amount: number;
    transaction_count: number;
}

/**
 * Service class for handling all relational database connectivity, 
 * schema initialization, and parameterized CRUD operations.
 */
export class DatabaseService {
    private db: Database.Database;

    /**
     * Initializes the SQLite database connection and enables foreign key constraints.
     * @param dbPath The file system path to the SQLite database file.
     */
    constructor(dbPath: string = 'app_data.db') {
        this.db = new Database(dbPath);
        this.db.pragma('foreign_keys = ON');
    }

    /**
     * Reads and executes schema.sql and seed.sql to construct tables and populate test records.
     * Checks if data exists prior to running seed scripts to avoid duplicate key errors.
     * @returns void
     */
    public initializeDatabase(): void {
        const schemaPath = path.join(process.cwd(), 'schema.sql');
        const seedPath = path.join(process.cwd(), 'seed.sql');

        if (fs.existsSync(schemaPath)) {
            const schemaSql = fs.readFileSync(schemaPath, 'utf8');
            this.db.exec(schemaSql);
        }

        const userCount = this.db.prepare('SELECT COUNT(*) as count FROM users').get() as { count: number };
        if (userCount.count === 0 && fs.existsSync(seedPath)) {
            const seedSql = fs.readFileSync(seedPath, 'utf8');
            this.db.exec(seedSql);
        }
    }

    /**
     * Inserts a new transaction record into the database using parameterized bindings.
     * @param userId The foreign key ID of the user creating the transaction.
     * @param categoryId The foreign key ID of the transaction category.
     * @param amount The numeric monetary value of the transaction.
     * @param description A text summary describing the transaction.
     * @returns The newly created database primary key ID.
     */
    public addTransaction(userId: number, categoryId: number, amount: number, description: string): number {
        const stmt = this.db.prepare(`
            INSERT INTO transactions (user_id, category_id, amount, description)
            VALUES (?, ?, ?, ?)
        `);
        const info = stmt.run(userId, categoryId, amount, description);
        return info.lastInsertRowid as number;
    }

    /**
     * Inserts a new user record into the system with parameterized inputs.
     * @param name The full name of the user.
     * @param email The unique email address of the user.
     * @returns The generated primary key user ID.
     */
    public addUser(name: string, email: string): number {
        const stmt = this.db.prepare(`
            INSERT INTO users (name, email)
            VALUES (?, ?)
        `);
        const info = stmt.run(name, email);
        return info.lastInsertRowid as number;
    }

    /**
     * Retrieves all transactions for a specific user using an INNER JOIN to include category details.
     * @param userId The ID of the user whose records are being fetched.
     * @returns An array of Transaction objects containing joined category names.
     */
    public getAllTransactionsWithDetails(userId: number): Transaction[] {
        const stmt = this.db.prepare(`
            SELECT 
                t.id, 
                t.user_id, 
                t.category_id, 
                t.amount, 
                t.description, 
                t.transaction_date,
                c.name AS category_name
            FROM transactions t
            INNER JOIN categories c ON t.category_id = c.id
            WHERE t.user_id = ?
            ORDER BY t.transaction_date DESC
        `);
        return stmt.all(userId) as Transaction[];
    }

    /**
     * Retrieves all category records ordered by category type and name.
     * @returns An array of Category entities.
     */
    public getCategories(): Category[] {
        const stmt = this.db.prepare('SELECT * FROM categories ORDER BY type, name');
        return stmt.all() as Category[];
    }

    /**
     * Executes a relational aggregation query grouping transactions by category and summing total amounts.
     * @param userId The ID of the user to generate the summary report for.
     * @returns An array of SpendingSummary objects containing aggregated totals and counts.
     */
    public getCategorySummaryReport(userId: number): SpendingSummary[] {
        const stmt = this.db.prepare(`
            SELECT 
                c.name AS category_name,
                c.type AS type,
                SUM(t.amount) AS total_amount,
                COUNT(t.id) AS transaction_count
            FROM transactions t
            INNER JOIN categories c ON t.category_id = c.id
            WHERE t.user_id = ?
            GROUP BY c.id, c.name, c.type
            ORDER BY total_amount DESC
        `);
        return stmt.all(userId) as SpendingSummary[];
    }

    /**
     * Updates an existing transaction amount using parameterized positional arguments.
     * @param transactionId The primary key ID of the transaction to update.
     * @param newAmount The new monetary value to set.
     * @returns True if the update modified at least one row, false otherwise.
     */
    public updateTransactionAmount(transactionId: number, newAmount: number): boolean {
        const stmt = this.db.prepare(`
            UPDATE transactions
            SET amount = ?
            WHERE id = ?
        `);
        const result = stmt.run(newAmount, transactionId);
        return result.changes > 0;
    }

    /**
     * Removes a transaction record from the database by ID using parameterized query execution.
     * @param transactionId The primary key ID of the transaction to delete.
     * @returns True if a record was deleted, false otherwise.
     */
    public deleteTransaction(transactionId: number): boolean {
        const stmt = this.db.prepare(`
            DELETE FROM transactions
            WHERE id = ?
        `);
        const result = stmt.run(transactionId);
        return result.changes > 0;
    }

    /**
     * Safely closes the database connection instance.
     * @returns void
     */
    public close(): void {
        this.db.close();
    }
}