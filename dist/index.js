import { StorageManager } from './storage.js';
import { CliRenderer } from './cli.js';
/**
 * Main wrapper execution flow class for managing application loops.
 */
class MainApplication {
    taskStorage = new StorageManager('tasks.json');
    financeStorage = new StorageManager('finances.json');
    /**
     * Initializes configuration states asynchronously and maps data modules to output channels.
     */
    async run() {
        console.log("=========================================");
        console.log("⚡ TS TASK & FINANCIAL CLI MANAGER ACTIVE ⚡");
        console.log("=========================================");
        // 1. Fetch or initialize state for tasks (using asynchronous await)
        let tasks = await this.taskStorage.readData();
        if (tasks.length === 0) {
            tasks = [
                { id: 1, title: "Configure standard tsconfig configuration environment", priority: "High", completed: true },
                { id: 2, title: "Construct generic class structure systems", priority: "High", completed: true },
                { id: 3, title: "Record 5-minute technical project screen capture", priority: "Medium", completed: false }
            ];
            await this.taskStorage.writeData(tasks);
        }
        // 2. Fetch or initialize state for ledger accounts (using asynchronous await)
        let transactions = await this.financeStorage.readData();
        if (transactions.length === 0) {
            transactions = [
                { id: 1, description: "Software Consultancy Project Fees", amount: 2400, category: "Revenue" },
                { id: 2, description: "Monthly Cloud Workspace License", amount: -45, category: "Overhead" },
                { id: 3, description: "Broadband Backbone Access", amount: -75, category: "Utilities" }
            ];
            await this.financeStorage.writeData(transactions);
        }
        // 3. Process structural output metrics
        CliRenderer.printTasks(tasks);
        // 4. Demonstrate the recursion requirement
        console.log("\n🔄 Executing Recursive Search Utility:");
        const searchResult = CliRenderer.findTaskRecursively(tasks, "screen capture");
        if (searchResult) {
            console.log(`  🎯 Found task via recursion: "${searchResult.title}" (ID: ${searchResult.id})`);
        }
        else {
            console.log("  ❌ Task not found via recursion.");
        }
        CliRenderer.printFinancials(transactions);
    }
}
// Instantiate and start core application run loop
const app = new MainApplication();
app.run().catch((err) => console.error("Application failed to run:", err));
