const db = require('../db');

const getAllSponsors = async (req, res) => {
    try {
        const result = await db.query(
            'SELECT * FROM sponsors ORDER BY order_index ASC'
        );
        res.json(result.rows);
    } catch (err) {
        console.error('Sponsors fetch error:', err);
        res.status(500).json({ error: 'Failed to fetch sponsors' });
    }
};

module.exports = { getAllSponsors };