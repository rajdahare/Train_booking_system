const pool = require('../config/db');

// Book seats
const bookingController = async (req, res) => {
  const { numOfSeats } = req.body;

  if (numOfSeats > 7) {
    return res.status(400).json({ message: 'Cannot book more than 7 seats at a time' });
  }

  try {
    // Fetch available seats ordered by row and seat number
    const { rows: availableSeats } = await pool.query(
      `SELECT * FROM seats WHERE is_booked = false ORDER BY row_number, seat_number`
    );

    if (availableSeats.length < numOfSeats) {
      return res.status(400).json({ message: `Only ${availableSeats.length} seats are available` });
    }

    // Try booking seats in the same row
    for (let row = 1; row <= 12; row++) {
      const rowSeats = availableSeats.filter(seat => seat.row_number === row);
      if (rowSeats.length >= numOfSeats) {
        const seatsToBook = rowSeats.slice(0, numOfSeats);
        await Promise.all(
          seatsToBook.map(seat =>
            pool.query(`UPDATE seats SET is_booked = true WHERE id = $1`, [seat.id])
          )
        );
        return res.status(200).json({ data: seatsToBook });
      }
    }

    // Book seats in nearby rows
    const seatsToBook = availableSeats.slice(0, numOfSeats);
    await Promise.all(
      seatsToBook.map(seat =>
        pool.query(`UPDATE seats SET is_booked = true WHERE id = $1`, [seat.id])
      )
    );

    return res.status(200).json({ data: seatsToBook });
  } catch (error) {
    console.error('Error booking seats:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Reset all seats
const resetSeatsController = async (req, res) => {
  try {
    // Delete existing data
    await pool.query(`TRUNCATE TABLE seats RESTART IDENTITY`);

    const totalRows = 12;
    const seatsPerRow = 7;
    const seats = [];

    for (let row = 1; row <= totalRows; row++) {
      const rowSeats = row === totalRows ? 3 : seatsPerRow;
      for (let seatNumber = 1; seatNumber <= rowSeats; seatNumber++) {
        seats.push({ seat_number: seats.length + 1, row_number: row, is_booked: false });
      }
    }

    const query = `
      INSERT INTO seats (seat_number, row_number, is_booked) VALUES
      ${seats.map((_, i) => `($${i * 3 + 1}, $${i * 3 + 2}, $${i * 3 + 3})`).join(', ')}
    `;
    const values = seats.flatMap(seat => [seat.seat_number, seat.row_number, seat.is_booked]);

    await pool.query(query, values);

    return res.json({ message: 'Seats reset successfully' });
  } catch (error) {
    console.error('Error resetting seats:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get all seats
const getSeats = async (req, res) => {
  try {
    const { rows: seats } = await pool.query(
      `SELECT * FROM seats ORDER BY row_number, seat_number`
    );
    return res.status(200).json({ seats });
  } catch (error) {
    console.error('Error fetching seats:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { bookingController, resetSeatsController, getSeats };
