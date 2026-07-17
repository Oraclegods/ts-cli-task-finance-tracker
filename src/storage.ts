import * as fs from 'node:fs';

/**
 * Generic Storage Manager class to handle reading and writing JSON data arrays.
 * Demonstrates reusability across tasks and financial datasets.
 */
export class StorageManager<T> {
    private filePath: string;

    /**
     * Initializes the storage manager with a specific file destination path.
     * @param filePath Target local JSON file path.
     */
    constructor(filePath: string) {
        this.filePath = filePath;
    }

    /**
     * Reads and parses data from the target local JSON file.
     * @returns An array of explicitly typed elements.
     */
    public readData(): T[] {
        try {
            if (!fs.existsSync(this.filePath)) {
                return [];
            }
            const fileData = fs.readFileSync(this.filePath, 'utf-8');
            return JSON.parse(fileData) as T[];
        } catch (error) {
            console.error(`Error reading data file ${this.filePath}:`, error);
            return [];
        }
    }

    /**
     * Serializes and writes data arrays directly down into the target JSON file.
     * @param data The array of typed items to persist locally.
     */
    public writeData(data: T[]): void {
        try {
            fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2), 'utf-8');
        } catch (error) {
            console.error(`Error writing data file ${this.filePath}:`, error);
        }
    }
}