const pool = require("../db");

// GET all results with event info
const getAllResults = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT 
        r.id,
        r.position,
        r.team_name,
        r.members,
        r.announced,
        e.name       AS event_name,
        e.icon       AS event_icon,
        e.tag        AS event_tag,
        e.color      AS event_color,
        e.category   AS event_category,
        e.event_date,
        e.description
       FROM results r
       JOIN events e ON r.event_id = e.id
       ORDER BY e.event_date, r.position`
    );
    res.json({ success: true, data: result.rows });
  } catch (error) {
    console.error("getAllResults error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// GET results by category (tech / nontech)
const getResultsByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const result = await pool.query(
      `SELECT 
        r.id,
        r.position,
        r.team_name,
        r.members,
        r.announced,
        e.name       AS event_name,
        e.icon       AS event_icon,
        e.tag        AS event_tag,
        e.color      AS event_color,
        e.category   AS event_category,
        e.event_date,
        e.description
       FROM results r
       JOIN events e ON r.event_id = e.id
       WHERE e.category = \$1
       ORDER BY e.event_date, r.position`,
      [category]
    );
    res.json({ success: true, data: result.rows });
  } catch (error) {
    console.error("getResultsByCategory error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// GET results by event id
const getResultsByEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `SELECT 
        r.id,
        r.position,
        r.team_name,
        r.members,
        r.announced,
        e.name       AS event_name,
        e.icon       AS event_icon,
        e.tag        AS event_tag,
        e.color      AS event_color,
        e.event_date,
        e.description
       FROM results r
       JOIN events e ON r.event_id = e.id
       WHERE r.event_id = \$1
       ORDER BY r.position`,
      [id]
    );
    res.json({ success: true, data: result.rows });
  } catch (error) {
    console.error("getResultsByEvent error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  getAllResults,
  getResultsByCategory,
  getResultsByEvent,
};