import * as fs from 'node:fs/promises';
import { existsSync } from 'node:fs';

/**
 * Generic Storage Manager class to handle reading and writing JSON data arrays.
 * Demonstrates reusability and Asynchronous operations via Promises.
 */
export class StorageManager<T> {
    private filePath: string;

    constructor(filePath: string) {
        this.filePath = filePath;
    }

    /**
     * Asynchronously reads and parses data from the target local JSON file.
     */
    public async readData(): Promise<T[]> {
        try {
            if (!existsSync(this.filePath)) {
                return [];
            }
            // Asynchronous, non-blocking file read operation
            const fileData = await fs.readFile(this.filePath, 'utf-8');
            return JSON.parse(fileData) as T[];
        } catch (error) {
            console.error(`Error reading data file ${this.filePath}:`, error);
            return []; // Exception handling fallback
        }
    }

    /**
     * Asynchronously serializes and writes data arrays directly down into the target JSON file.
     */
    public async writeData(data: T[]): Promise<void> {
        try {
            // Asynchronous, non-blocking file write operation
            await fs.writeFile(this.filePath, JSON.stringify(data, null, 2), 'utf-8');
        } catch (error) {
            console.error(`Error writing data file ${this.filePath}:`, error);
        }
    }
}