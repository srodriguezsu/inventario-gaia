import { openDB } from 'idb';

// Initialize the database
const initDB = async () => {
    return openDB('supplies-db', 1, {
        upgrade(db) {
            if (!db.objectStoreNames.contains('supplies')) {
                db.createObjectStore('supplies', { keyPath: 'id', autoIncrement: true });
            }
        },
    });
};

// Retrieve all supplies from the database
export const getSuppliesFromDB = async () => {
    const db = await initDB();
    return await db.getAll('supplies');
};

// Retrieve a supply by ID
export const getSupplyById = async (id) => {
    const db = await initDB();
    return await db.get('supplies', id);
};

// Delete a supply by ID from the database
export const deleteSupplyFromDB = async (id) => {
    const db = await initDB();
    await db.delete('supplies', id);
};

// Add a new supply to the database
export const addSupplyToDB = async (supply) => {
    const db = await initDB();  // Open or initialize the database
    const tx = db.transaction('supplies', 'readwrite');  // Start a new transaction
    const store = tx.objectStore('supplies');  // Get the object store
    await store.add(supply);  // Add the supply object to the store
    await tx.done;  // Complete the transaction
};

// Update the stock quantity of a supply
export const updateSupplyStock = async (id, newStockQuantity) => {
    const db = await initDB();  // Open or initialize the database
    const tx = db.transaction('supplies', 'readwrite');  // Start a read-write transaction
    const store = tx.objectStore('supplies');  // Access the 'supplies' object store

    // Retrieve the supply by id
    const supply = await store.get(id);

    if (supply) {
        supply.stock_quantity = newStockQuantity;  // Update the stock_quantity
        await store.put(supply);  // Save the updated supply back to the store
        await tx.done;  // Complete the transaction
        console.log('Stock quantity updated');
    } else {
        console.error('Supply not found');
    }
};

// Update an entire supply's details
export const updateSupply = async (id, newSupply) => {
    const db = await initDB();  // Open or initialize the database
    const tx = db.transaction('supplies', 'readwrite');  // Start a read-write transaction
    const store = tx.objectStore('supplies');  // Access the 'supplies' object store

    // Retrieve the supply by id
    const supply = await store.get(id);

    if (supply && newSupply.stock_quantity > 0) {
        // Create a new object with updated values, excluding the id
        const updatedSupply = { ...supply, ...newSupply };  // Merging supply and new values
        await store.put(updatedSupply);  // Save the updated supply back to the store
        await tx.done;  // Complete the transaction
    } else {
        throw new Error('Stock quantity must be greater than zero');
    }
};
