const pool = require("../db");

// GET all admin panel members
const getAdminPanel = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM team_members 
       WHERE panel = 'admin' 
       ORDER BY order_index`
    );
    res.json({ success: true, data: result.rows });
  } catch (error) {
    console.error("getAdminPanel error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// GET all event heads
const getEventHeads = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM team_members 
       WHERE panel = 'events' 
       ORDER BY order_index`
    );
    res.json({ success: true, data: result.rows });
  } catch (error) {
    console.error("getEventHeads error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// GET all team members
const getAllMembers = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM team_members 
       ORDER BY panel, order_index`
    );
    res.json({ success: true, data: result.rows });
  } catch (error) {
    console.error("getAllMembers error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  getAdminPanel,
  getEventHeads,
  getAllMembers,
};