// storeApi.ts
import fs from 'fs';

// Define the file path
const filePath = 'data/newsData.json';
const cachePath = 'data/cache.json'

// Function to read data from the file
const readData = () => {
    try {
        console.log('Reading data from file...');
        if (!fs.existsSync(filePath)) {
            console.log('File does not exist. Returning empty array.');
            return [];
        }
        const jsonData = fs.readFileSync(filePath, 'utf-8');
        console.log('Data read successfully.');
        return JSON.parse(jsonData);
    } catch (error) {
        // Return an empty array instead of throwing an error 
        return []

        // console.error(`Error reading data: ${error.message}`);
        // throw new Error(`Error reading data: ${error.message}`);
    }
};

// Function to write data to the file
const writeData = (newsData: any) => {
    try {
        console.log('Writing data to file...');
        const jsonData = JSON.stringify(newsData, null, 2);
        fs.writeFileSync(filePath, jsonData, 'utf-8');
        console.log('Data written successfully.');
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(`Error writing data: ${error.message}`);
            throw new Error(`Error writing data: ${error.message}`);
        }
    }
};

const filterNew = (newData: any, existingData: any) => {
    console.log(newData)
    const filtered = newData.filter((newItem: any) => {
        return !existingData.some((existingItem: any) => {
            return newItem.url === existingItem.url;
        });
    });

    return filtered;
}

const readCache = () => {
    try {
        console.log('Reading cache from file...');
        if (!fs.existsSync(cachePath)) {
            console.log('File does not exist. Returning empty array.');
            return [];
        }
        const jsonData = fs.readFileSync(cachePath, 'utf-8');
        console.log('Data read successfully.');
        return JSON.parse(jsonData);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(`Error reading data: ${error.message}`);
            throw new Error(`Error reading data: ${error.message}`);
        }
    }
}

const writeCache = (cacheData: any) => {
    try {
        console.log('Writing cache to file...');
        const jsonData = JSON.stringify({
            data: cacheData,
            lastFetch: Date.now()
        }, null, 2);
        fs.writeFileSync(cachePath, jsonData, 'utf-8');
        console.log('Cache written successfully.');
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(`Error writing cache: ${error.message}`);
            throw new Error(`Error writing cache: ${error.message}`);
        }
    }
}

export { readData, writeData, filterNew, readCache, writeCache };

