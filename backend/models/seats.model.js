const { Pool } = require('pg');

// Configure the PostgreSQL connection
const pool = new Pool({
    user: 'your_username',
    host: 'localhost',
    database: 'your_database',
    password: 'your_password',
    port: 5432, // Ensure this matches your PostgreSQL port
});

// Function to create a new seat
const createSeat = async (seatNumber, rowNumber) => {
    const query = `
        INSERT INTO seats (seat_number, row_number)
        VALUES ($1, $2)
        RETURNING *;
    `;
    const values = [seatNumber, rowNumber];
    try {
        const result = await pool.query(query, values);
        console.log('Seat created:', result.rows[0]);
        return result.rows[0];
    } catch (err) {
        console.error('Error creating seat:', err);
        throw err;
    }
};

// Function to update seat booking status
const updateSeatBooking = async (seatId, isBooked) => {
    const query = `
        UPDATE seats
        SET is_booked = $1
        WHERE id = $2
        RETURNING *;
    `;
    const values = [isBooked, seatId];
    try {
        const result = await pool.query(query, values);
        console.log('Seat updated:', result.rows[0]);
        return result.rows[0];
    } catch (err) {
        console.error('Error updating seat:', err);
        throw err;
    }
};

// Export pool and functions for use elsewhere
module.exports = {
    createSeat,
    updateSeatBooking,
    pool,
};
