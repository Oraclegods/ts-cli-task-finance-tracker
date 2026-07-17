/**
 * Utility processing class to safely render structural items inside the terminal console.
 */
export class CliRenderer {
    /**
     * Loops through and outputs high-priority or completed tasks matching evaluation metrics.
     * @param tasks Typed array containing task structures.
     */
    static printTasks(tasks) {
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
     * Iterates over financial arrays to aggregate accounts using accumulation metrics.
     * @param transactions Typed array containing transactional data blocks.
     */
    static printFinancials(transactions) {
        console.log("\n💰 Financial Cash Flow Analytics:");
        if (transactions.length === 0) {
            console.log("  No ledger statements found.");
            return;
        }
        // Functional array calculation metrics
        const netBalance = transactions.reduce((total, current) => total + current.amount, 0);
        transactions.forEach((tx) => {
            const structuralMarker = tx.amount > 0 ? "[🟢 Income]" : "[🔴 Expense]";
            console.log(`  * ${structuralMarker} ${tx.description} (${tx.category}): $${tx.amount}`);
        });
        console.log(`\n💵 Calculated Real-Time Net Balance: $${netBalance}`);
        // Strict conditional check boundaries
        if (netBalance < 0) {
            console.log("  ⚠️ Alert: Deficit warning. Resource expenditures exceed current channels.");
        }
        else {
            console.log("  🚀 Healthy Margin: Financial budget targets are currently secure.");
        }
    }
}
