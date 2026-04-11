const pool = require("../db");

// GET all events with their heads
const getAllEvents = async (req, res) => {
  try {
    // Sare events lao
    const eventsResult = await pool.query(
      `SELECT * FROM events ORDER BY day, event_time`
    );

    const events = eventsResult.rows;

    // Har event ke liye uske heads lao
    const eventsWithHeads = await Promise.all(
      events.map(async (event) => {
        const headsResult = await pool.query(
          `SELECT id, name, phone, image_url 
           FROM event_heads 
           WHERE event_id = \$1`,
          [event.id]
        );
        return {
          ...event,
          heads: headsResult.rows,
        };
      })
    );

    res.json({ success: true, data: eventsWithHeads });
  } catch (error) {
    console.error("getAllEvents error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// GET only tech events
const getTechEvents = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM events WHERE category = 'tech' ORDER BY day, event_time`
    );

    const eventsWithHeads = await Promise.all(
      result.rows.map(async (event) => {
        const headsResult = await pool.query(
          `SELECT id, name, phone, image_url 
           FROM event_heads WHERE event_id = \$1`,
          [event.id]
        );
        return { ...event, heads: headsResult.rows };
      })
    );

    res.json({ success: true, data: eventsWithHeads });
  } catch (error) {
    console.error("getTechEvents error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// GET only nontech events
const getNonTechEvents = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM events WHERE category = 'nontech' ORDER BY day, event_time`
    );

    const eventsWithHeads = await Promise.all(
      result.rows.map(async (event) => {
        const headsResult = await pool.query(
          `SELECT id, name, phone, image_url 
           FROM event_heads WHERE event_id = \$1`,
          [event.id]
        );
        return { ...event, heads: headsResult.rows };
      })
    );

    res.json({ success: true, data: eventsWithHeads });
  } catch (error) {
    console.error("getNonTechEvents error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// GET single event by id
const getEventById = async (req, res) => {
  try {
    const { id } = req.params;

    const eventResult = await pool.query(
      `SELECT * FROM events WHERE id = \$1`,
      [id]
    );

    if (eventResult.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }

    const headsResult = await pool.query(
      `SELECT id, name, phone, image_url 
       FROM event_heads WHERE event_id = \$1`,
      [id]
    );

    res.json({
      success: true,
      data: {
        ...eventResult.rows[0],
        heads: headsResult.rows,
      },
    });
  } catch (error) {
    console.error("getEventById error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  getAllEvents,
  getTechEvents,
  getNonTechEvents,
  getEventById,
};