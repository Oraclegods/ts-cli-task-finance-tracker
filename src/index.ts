import { ITask, ITransaction } from './models.js';
import { StorageManager } from './storage.js';
import { CliRenderer } from './cli.js';

/**
 * Main wrapper execution flow class for managing application loops.
 */
class MainApplication {
    private taskStorage = new StorageManager<ITask>('tasks.json');
    private financeStorage = new StorageManager<ITransaction>('finances.json');

    /**
     * Initializes configuration states and safely maps data modules to output channels.
     */
    public run(): void {
        console.log("=========================================");
        console.log("⚡ TS TASK & FINANCIAL CLI MANAGER ACTIVE ⚡");
        console.log("=========================================");

        // 1. Fetch or initialize state for tasks
        let tasks = this.taskStorage.readData();
        if (tasks.length === 0) {
            tasks = [
                { id: 1, title: "Configure standard tsconfig configuration environment", priority: "High", completed: true },
                { id: 2, title: "Construct generic class structure systems", priority: "High", completed: true },
                { id: 3, title: "Record 5-minute technical project screen capture", priority: "Medium", completed: false }
            ];
            this.taskStorage.writeData(tasks);
        }

        // 2. Fetch or initialize state for ledger accounts
        let transactions = this.financeStorage.readData();
        if (transactions.length === 0) {
            transactions = [
                { id: 1, description: "Software Consultancy Project Fees", amount: 2400, category: "Revenue" },
                { id: 2, description: "Monthly Cloud Workspace License", amount: -45, category: "Overhead" },
                { id: 3, description: "Broadband Backbone Access", amount: -75, category: "Utilities" }
            ];
            this.financeStorage.writeData(transactions);
        }

        // 3. Process structural output metrics
        CliRenderer.printTasks(tasks);
        CliRenderer.printFinancials(transactions);
    }
}

// Instantiate and start core application run loop
const app = new MainApplication();
app.run();