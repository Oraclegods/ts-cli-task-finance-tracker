import { ITask, ITransaction } from './models.js';

/**
 * Utility processing class to safely render structural items inside the terminal console.
 */
export class CliRenderer {
    /**
     * Loops through and outputs high-priority or completed tasks matching evaluation metrics.
     */
    public static printTasks(tasks: ITask[]): void {
        console.log("\n📋 Current Project Tasks Overview:");
        if (tasks.length === 0) {
            console.log("  No tasks available.");
            return;
        }

        tasks.forEach((task) => {
            const statusIndicator = task.completed ? "✅ Complete" : "⏳ Pending";
            console.log(`  [Priority: ${task.priority}] ${task.title} -> Status: ${statusIndicator} (ID: ${task.id})`);
        });
    }

    /**
     * RECURSION REQUIREMENT: Recursively searches through an array of tasks 
     * to find a match by keyword.
     */
    public static findTaskRecursively(tasks: ITask[], keyword: string, index: number = 0): ITask | null {
        // Base Case 1: Out of bounds (not found)
        if (index >= tasks.length) {
            return null;
        }
        // Base Case 2: Match found
        if (tasks[index].title.toLowerCase().includes(keyword.toLowerCase())) {
            return tasks[index];
        }
        // Recursive Step: Move to the next element
        return CliRenderer.findTaskRecursively(tasks, keyword, index + 1);
    }

    /**
     * Iterates over financial arrays to aggregate accounts using accumulation metrics.
     */
    public static printFinancials(transactions: ITransaction[]): void {
        console.log("\n💰 Financial Cash Flow Analytics:");
        if (transactions.length === 0) {
            console.log("  No ledger statements found.");
            return;
        }

        const netBalance = transactions.reduce((total, current) => total + current.amount, 0);

        transactions.forEach((tx) => {
            const structuralMarker = tx.amount > 0 ? "[🟢 Income]" : "[🔴 Expense]";
            console.log(`  * ${structuralMarker} ${tx.description} (${tx.category}): $${tx.amount}`);
        });

        console.log(`\n💵 Calculated Real-Time Net Balance: $${netBalance}`);
        
        if (netBalance < 0) {
            console.log("  ⚠️ Alert: Deficit warning. Resource expenditures exceed current channels.");
        } else {
            console.log("  🚀 Healthy Margin: Financial budget targets are currently secure.");
        }
    }
}