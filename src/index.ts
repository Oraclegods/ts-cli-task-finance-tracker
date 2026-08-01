import { ITask } from './models.js';
import { StorageManager } from './storage.js';
import { CliRenderer } from './cli.js';
import { DatabaseService } from './DatabaseService.js';

/**
 * Main wrapper execution flow class for managing application loops.
 * Upgraded in Module 2 to utilize SQLite Relational Database persistence.
 */
class MainApplication {
    // Module 1 Legacy Storage (kept for task state or file migration demo)
    private taskStorage = new StorageManager<ITask>('tasks.json');
    
    // Module 2 SQL Relational Database Service
    private dbService = new DatabaseService();

    /**
     * Initializes configuration states asynchronously, loads relational database tables,
     * and displays database analytics.
     */
    public async run(): Promise<void> {
        console.log("=================================================");
        console.log("⚡ TS TASK & FINANCIAL CLI MANAGER (SQL EDITION) ⚡");
        console.log("=================================================");

        // --- MODULE 1 FEATURE: Task Management & Recursion ---
        let tasks = await this.taskStorage.readData();
        if (tasks.length === 0) {
            tasks = [
                { id: 1, title: "Configure standard tsconfig environment", priority: "High", completed: true },
                { id: 2, title: "Construct relational database schema (schema.sql)", priority: "High", completed: true },
                { id: 3, title: "Record 5-minute technical project screen capture", priority: "Medium", completed: false }
            ];
            await this.taskStorage.writeData(tasks);
        }

        // Print tasks using Module 1 CLI Renderer
        CliRenderer.printTasks(tasks);

        // Execute Recursive Search Utility (Module 1 Requirement)
        console.log("\n🔄 Executing Recursive Search Utility:");
        const searchResult = CliRenderer.findTaskRecursively(tasks, "screen capture");
        if (searchResult) {
            console.log(`   🎯 Found task via recursion: "${searchResult.title}" (ID: ${searchResult.id})`);
        } else {
            console.log("   ❌ Task not found via recursion.");
        }

        // --- MODULE 2 FEATURE: Relational Database Operations ---
        console.log("\n=================================================");
        console.log("📦 INITIALIZING SQL RELATIONAL DATABASE (Module 2)");
        console.log("=================================================");

        // 1. Initialize schema and seed data if not present
        this.dbService.initializeDatabase();

        const DEFAULT_USER_ID = 1; // Folusho Sanni

        // 2. Fetch Relational Data with INNER JOIN
        console.log("\n📊 Fetching Transactions via SQL INNER JOIN:");
        const dbTransactions = this.dbService.getAllTransactionsWithDetails(DEFAULT_USER_ID);
        
        // Map database records to fit your existing CliRenderer format!
        const formattedTransactions = dbTransactions.map(t => ({
            id: t.id!,
            description: `${t.description} [${t.category_name}]`,
            amount: t.amount,
            category: t.category_name || 'General'
        }));

        // Render using your existing Module 1 CliRenderer
        CliRenderer.printFinancials(formattedTransactions);

        // 3. Demonstrate SQL Aggregate Report (GROUP BY & SUM)
        console.log("\n📈 SQL Category Aggregation Report (GROUP BY & SUM):");
        const categorySummaries = this.dbService.getCategorySummaryReport(DEFAULT_USER_ID);
        console.table(categorySummaries.map(s => ({
            Category: s.category_name,
            Type: s.type,
            'Total Amount': `$${s.total_amount.toFixed(2)}`,
            'Total Count': s.transaction_count
        })));

        // 4. Demonstrate Parameterized CRUD Operations
        console.log("\n🛠️ Executing Parameterized SQL CRUD Operations:");
        
        // INSERT
        const newTxId = this.dbService.addTransaction(
            DEFAULT_USER_ID, 
            5, // Category ID 5: Education
            40.00, 
            "Academic Course Study Materials"
        );
        console.log(`   [✓] Parameterized INSERT: Created transaction ID #${newTxId}`);

        // UPDATE
        const updated = this.dbService.updateTransactionAmount(newTxId, 45.00);
        if (updated) {
            console.log(`   [✓] Parameterized UPDATE: Updated transaction #${newTxId} amount to $45.00`);
        }

        // DELETE
        const deleted = this.dbService.deleteTransaction(newTxId);
        if (deleted) {
            console.log(`   [✓] Parameterized DELETE: Cleaned up temporary transaction #${newTxId}`);
        }

        console.log("\n✅ Application run loop completed successfully.");
        this.dbService.close();
    }
}

// Instantiate and start core application run loop
const app = new MainApplication();
app.run().catch((err) => console.error("Application failed to run:", err));