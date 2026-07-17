/**
 * Interface representing a strict task entity structure.
 */
export interface ITask {
    id: number;
    title: string;
    priority: 'High' | 'Medium' | 'Low';
    completed: boolean;
}

/**
 * Interface representing a strict financial transaction entity structure.
 */
export interface ITransaction {
    id: number;
    description: string;
    amount: number; // Positive for income, negative for expense
    category: string;
}