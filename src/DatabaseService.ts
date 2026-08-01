import Database from 'better-sqlite3';
import * as fs from 'fs';
import * as path from 'path';

export interface User {
    id?: number;
    name: string;
    email: string;
    created_at?: string;
}

export interface Category {
    id?: number;
    name: string;
    type: 'Income' | 'Expense';
}

export interface Transaction {
    id?: number;
    user_id: number;
    category_id: number;
    amount: number;
    description: string;
    transaction_date?: string;
    category_name?: string; // Populated via JOIN
}

export interface SpendingSummary {
    category_name: string;
    type: string;
    total_amount: number;
    transaction_count: number;
}

export class DatabaseService {
    private db: Database.Database;

    constructor(dbPath: string = 'app_data.db') {
        this.db = new Database(dbPath);
        // Enable Foreign Keys in SQLite
        this.db.pragma('foreign_keys = ON');
    }

    /**
     * Initializes the database by executing schema.sql and seed.sql if tables do not exist
     */
    public initializeDatabase(): void {
        const schemaPath = path.join(process.cwd(), 'schema.sql');
        const seedPath = path.join(process.cwd(), 'seed.sql');

        if (fs.existsSync(schemaPath)) {
            const schemaSql = fs.readFileSync(schemaPath, 'utf8');
            this.db.exec(schemaSql);
        }

        // Check if data is seeded; if not, seed initial records
        const userCount = this.db.prepare('SELECT COUNT(*) as count FROM users').get() as { count: number };
        if (userCount.count === 0 && fs.existsSync(seedPath)) {
            const seedSql = fs.readFileSync(seedPath, 'utf8');
            this.db.exec(seedSql);
        }
    }

    // --- CREATE Operations (Parameterized) ---

    public addTransaction(userId: number, categoryId: number, amount: number, description: string): number {
        const stmt = this.db.prepare(`
            INSERT INTO transactions (user_id, category_id, amount, description)
            VALUES (?, ?, ?, ?)
        `);
        const info = stmt.run(userId, categoryId, amount, description);
        return info.lastInsertRowid as number;
    }

    public addUser(name: string, email: string): number {
        const stmt = this.db.prepare(`
            INSERT INTO users (name, email)
            VALUES (?, ?)
        `);
        const info = stmt.run(name, email);
        return info.lastInsertRowid as number;
    }

    // --- READ / JOIN Operations ---

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

    public getCategories(): Category[] {
        const stmt = this.db.prepare('SELECT * FROM categories ORDER BY type, name');
        return stmt.all() as Category[];
    }

    // --- AGGREGATION & GROUP BY Report ---

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

    // --- UPDATE Operation (Parameterized) ---

    public updateTransactionAmount(transactionId: number, newAmount: number): boolean {
        const stmt = this.db.prepare(`
            UPDATE transactions
            SET amount = ?
            WHERE id = ?
        `);
        const result = stmt.run(newAmount, transactionId);
        return result.changes > 0;
    }

    // --- DELETE Operation (Parameterized) ---

    public deleteTransaction(transactionId: number): boolean {
        const stmt = this.db.prepare(`
            DELETE FROM transactions
            WHERE id = ?
        `);
        const result = stmt.run(transactionId);
        return result.changes > 0;
    }

    /**
     * Closes the database connection cleanly
     */
    public close(): void {
        this.db.close();
    }
}